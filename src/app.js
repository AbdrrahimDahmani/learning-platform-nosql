// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

const express = require("express");
const config = require("./config/env");
const { connectMongo } = require("./config/db");
// const courseRoutes = require("./routes/courseRoutes");
// const studentRoutes = require("./routes/studentRoutes");
const { findOneById } = require("./services/mongoService");
const { cacheData, getData } = require("./services/redisService");

const app = express();

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    // TODO: Configurer les middlewares Express
    // TODO: Monter les routes

    await connectMongo();

    //test
    const course = await findOneById("cours", "101");

    const cachedCourse = await cacheData("101", course);

    // Démarrer le serveur
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on("SIGTERM", async () => {
  // TODO: Implémenter la fermeture propre des connexions
});

startServer();
