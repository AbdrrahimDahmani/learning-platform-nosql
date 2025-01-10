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
async function create(collectionName, course) {
  try {
    const db = getDbObject();
    let collection = db.collection(collectionName);
    await collection.insertOne(course);
  } catch (error) {
    console.error("Error : ", error);
  }
}
async function findCourseStats(collectionName, courseName) {
  try {
    const db = getDbObject();
    let collection = db.collection(collectionName);
    let course = await collection.findOne({ name: courseName });
    courseStats = {
      Duration: course.duration,
      StudentsEnroled: course.studentsEnroled,
    };
    courseStats;
  } catch (error) {
    console.error("Error : ", error);
  }
}

// Export des services
module.exports = {
  findOneById,
  create,
  findCourseStats,
};
