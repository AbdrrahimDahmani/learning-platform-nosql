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
 *                 description: ID of the course
 *               name:
 *                 type: string
 *                 description: Name of the course
 *               description:
 *                 type: string
 *                 description: Description of the course
 *               instructor:
 *                 type: string
 *                 description: Instructor's name
 *               duration:
 *                 type: integer
 *                 description: Duration in hours
 *               category:
 *                 type: string
 *                 description: Course category
 *               studentsEnrolled:
 *                 type: integer
 *                 description: Number of students enrolled
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
 * /courses/stats:
 *   get:
 *     summary: Get aggregated course statistics
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Aggregated statistics of all courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCourses:
 *                   type: integer
 *                   description: Total number of courses
 *                   example: 5
 *                 totalDuration:
 *                   type: integer
 *                   description: Total duration of all courses in hours
 *                   example: 50
 *                 totalStudentsEnrolled:
 *                   type: integer
 *                   description: Total number of students enrolled across all courses
 *                   example: 600
 *       500:
 *         description: Server error
 */
router.get("/stats", courseController.getCourseStats);

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

module.exports = router;
