// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

const express = require("express");
const config = require("./config/env");
const { connectMongo } = require("./config/db");
// const courseRoutes = require("./routes/courseRoutes");
// const studentRoutes = require("./routes/studentRoutes");
const { findOneById } = require("./services/mongoService");
const { cacheData, getData } = require("./services/redisService");
const router = require("./routes/courseRoutes");

const app = express();
const route = express.Router();
async function startServer() {
  try {
    // Initialiser les connexions aux bases de données
    await connectMongo();
    // Configurer les middlewares Express
    app.use(express.json());

    // Monter les routes
    app.use("/courses", router);
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
  // la fermeture propre des connexions
  console.log("Closing the server...");
  process.exit(0);
});

startServer();
