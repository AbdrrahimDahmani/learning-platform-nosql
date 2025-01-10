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
    throw error;
  }
}
// creation d'un cours
async function create(collectionName, course) {
  try {
    const db = getDbObject();
    let collection = db.collection(collectionName);
    return await collection.insertOne(course);
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
}

// Fonction pour trouver les statistiques d'un cours
async function findCourseStats(collectionName) {
  try {
    const db = getDbObject();
    const collection = db.collection(collectionName);

    //  calculation du statistics total en utilisant l'aggregation
    const stats = await collection
      .aggregate([
        {
          $group: {
            _id: null, // Group all
            totalCourses: { $sum: 1 }, //  total des cours
            totalDuration: { $sum: "$duration" }, // Somme des durations
            totalStudentsEnrolled: { $sum: "$studentsEnrolled" }, // Somme des etudiants inscrits
          },
        },
      ])
      .toArray();

    if (stats.length === 0) {
      throw new Error("No courses found");
    }

    // Format the results
    const courseStats = {
      totalCourses: stats[0].totalCourses,
      totalDuration: stats[0].totalDuration,
      totalStudentsEnrolled: stats[0].totalStudentsEnrolled,
    };

    return courseStats;
  } catch (error) {
    console.error("Error retrieving course stats:", error);
    throw error;
  }
}

// Export des services
module.exports = {
  findOneById,
  create,
  findCourseStats,
};
