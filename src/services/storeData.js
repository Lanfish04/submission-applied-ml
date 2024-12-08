async function storeData(id, data) {
  try {
    const db = new Firestore({
      projectId: 'submissionmlgc-fadhlanhafidz',
      keyFilename: 'credintials.json',
    });

    
    const predictCollection = db.collection('predictions');
    await predictCollection.doc(id).set(data);


    console.log(`Data successfully stored: ${id}`);
  } catch (error) {
    console.error('Error storing data to Firestore:', error.message);
    throw error;
  }
}

module.exports = storeData;
