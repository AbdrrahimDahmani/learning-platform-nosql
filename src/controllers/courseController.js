// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

// Contrôleurs pour la creation des cours
async function createCourse(req, res) {
  try {
    const courseData = req.body;
    console.log(courseData);
    const newCourse = await mongoService.create("cours", courseData);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
}
// Contrôleurs pour la récupération des cours
async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    console.log(courseId);
    let course = await redisService.getData(courseId);
    if (!course) {
      course = await mongoService.findOneById("cours", courseId);
      if (course) {
        await redisService.cacheData(courseId, course);
      }
    }
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    console.error("Error getting course:", error);
    res.status(500).json({ error: "Failed to get course" });
  }
}
// Contrôleurs pour la récupération des statistiques des cours
async function getCourseStats(req, res) {
  try {
    console.log("hi");
    const stats = await mongoService.findCourseStats("cours");
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error getting course stats:", error);
    res.status(500).json({ error: "Failed to get course stats" });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
  getCourse,
  getCourseStats,
};
