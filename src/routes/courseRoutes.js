// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse :
// Question : Comment organiser les routes de manière cohérente ?
// Réponse:

const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API for managing courses
 */

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Name of the course
 *               name:
 *                 type: string
 *                 description: Name of the course
 *               description:
 *                 type: string
 *                 description: Description of the course
 *               instructor:
 *                 type: string
 *                 description: Name
 *               duration:
 *                 type: integer
 *                 description: duration
 *               category:
 *                 type: string
 *                 description: category
 *               studentsEnrolled:
 *                 type: integer
 *                 description: number of students
 *             required:
 *               - name
 *               - description
 *               - instructor
 *     responses:
 *       201:
 *         description: The course was successfully created
 *       400:
 *         description: Invalid input
 */
router.post("/", courseController.createCourse);
/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The course ID
 *                 name:
 *                   type: string
 *                   description: Name of the course
 *                 description:
 *                   type: string
 *                   description: Description of the course
 *                 instructor:
 *                   type: string
 *                   description: Instructor's name
 *       404:
 *         description: Course not found
 */
router.get("/:id", courseController.getCourse);
/**
 * @swagger
 * /courses/stats:
 *   get:
 *     summary: Get course statistics
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Course statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Duration of the course:
 *                   type: integer
 *                 Enroled Students:
 *                   type: integer
 */
router.get("/stats", courseController.getCourseStats);

module.exports = router;
