const predictClassification = require("../services/predict");
const crypto = require('crypto');
const storeData = require('../services/storeData');

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;
   
    const { confidenceScore, label, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
   
    const data = {
      "id": id,
      "result": label,
      "suggestion": suggestion,
      "createdAt": createdAt
    }
    
    await storeData(id, data);
  
    const response = h.response({
      status: 'success',
      message: confidenceScore > 99 ? 'Model is predicted successfully' : 'Model is predicted successfully',
      data
    })
    response.code(201);
    return response;
  }
 
  async function postPredictHistoriesHandler(request, h) {
    try {
        const db = new Firestore({
            projectId: 'submissionmlgc-fadhlanhafidz',
            keyFilename: 'credintials.json',
        });

        const predictCollection = db.collection('prediction');
        const getAllData = await predictCollection.get();

        if (getAllData.empty) {
            return h.response({
                status: 'success',
                data: [],
            }).code(200);
        }

        const histories = getAllData.docs.map((doc) => {
            const historyData = doc.data();

            const suggestion =
                historyData.result === 'Non-cancer'
                    ? 'Anda sehat!'
                    : historyData.suggestion;

            return {
                id: doc.id,
                history: {
                    result: historyData.result,
                    createdAt: historyData.createdAt,
                    suggestion: suggestion,
                    id: doc.id
                },
            };
        });

        return h.response({
            status: 'success',
            data: histories,
        }).code(200);
    } catch (error) {
        console.error('Error fetching prediction histories:', error);

        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan saat mengambil data prediksi.',
        }).code(500);
    }
}
  module.exports = { postPredictHandler, postPredictHistoriesHandler};
