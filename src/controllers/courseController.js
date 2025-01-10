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
    const newCourse = await mongoService.createCourse(courseData);
    await redisService.cacheCourse(newCourse._id, newCourse);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: "Failed to create course" });
  }
}
// Contrôleurs pour la récupération des cours
async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    let course = await redisService.getCachedCourse(courseId);
    if (!course) {
      course = await mongoService.getCourseById(courseId);
      if (course) {
        await redisService.cacheCourse(courseId, course);
      }
    }
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get course" });
  }
}
// Contrôleurs pour la récupération des statistiques des cours
async function getCourseStats(req, res) {
  try {
    const stats = await mongoService.getCourseStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to get course stats" });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
  getCourse,
  getCourseStats,
};
