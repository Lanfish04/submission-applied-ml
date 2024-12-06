const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exception/InputError');

async function predictClassification(model, image) {
  try{
  const tensor = tf.node
    .decodeJpeg(image) 
    .resizeNearestNeighbor([224, 224])  
    .expandDims()
    .toFloat(); 


  const prediction = model.predict(tensor);
  const probality = await prediction.data(); 

  const confidenceTrust = Math.max(...probality) * 100; 
  const classes = ['Non-cancer', 'Cancer'];
  const label = confidenceTrust <= 50 ? classes[0] : classes[1]; 

  let suggestions;
  if (label === 'Cancer') {
    suggestions = 'Segera periksa ke dokter!';
  }
  
  if (label === 'Non-cancer') {
    suggestions = 'Penyakit kanker tidak terdeteksi.';
  } 

  return { label, confidence: confidenceTrust, suggestions };
} catch (error) {
    throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`)
  }
}
module.exports = predictClassification;
