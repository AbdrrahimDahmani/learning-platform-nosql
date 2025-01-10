// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

const express = require("express");
const config = require("./config/env");
const {
  connectMongo,
  closeMongoConnection,
  closeRedisConnection,
} = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");
const swaggerUI = require("swagger-ui-express");
const swaggerSpecs = require("./config/swaggerConfig");
const app = express();

async function startServer() {
  try {
    // Initialiser les connexions aux bases de données
    await connectMongo();
    // Configurer les middlewares Express
    app.use(express.json());
    // Monter Swagger documentation
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

    // Monter les routes
    app.use("/courses", courseRoutes);
    // Démarrer le serveur
    app.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port}`);
      console.log(
        `Swagger Docs available at http://localhost:${config.port}/api-docs`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on("SIGTERM", async () => {
  // la fermeture propre des connexions
  try {
    console.log("Closing the server...");
    await closeMongoConnection();
    await closeRedisConnection();
    process.exit(0);
  } catch (err) {
    console.error("Failed to close server:", err);
    process.exit(1);
  }
});

startServer();
