// Question: Pourquoi créer des services séparés ?
// Réponse:

const { getDbObject } = require("../config/db");

// Fonctions utilitaires pour MongoDB
async function findOneById(collectionName, id) {
  try {
    const db = getDbObject();
    let collection = db.collection(collectionName);
    const first = await collection.findOne({ id: id });
    return first;
  } catch (error) {
    console.error("Error : ", error);
  }
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
};
