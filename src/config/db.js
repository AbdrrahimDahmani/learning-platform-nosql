// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse :
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse :

const { MongoClient } = require("mongodb");
const redis = require("redis");
const config = require("./env");

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    mongoClient = new MongoClient(config.mongodb.uri, {});
    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);

    console.log("Connected to Mongodb");
  } catch (error) {
    console.error(error);
  }
}

async function connectRedis() {
  try {
    redisClient = redis.createClient({
      url: config.redis.uri,
    });

    redisClient.on("error", (err) => {
      console.error("Redis connection error:", err);
    });

    redisClient.on("connect", () => {
      console.log("Connected to Redis");
    });

    await redisClient.connect();
    return redisClient;
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
}
// Pour assurer que l'objet db est bien initialisé
function getDbObject() {
  if (!db) {
    throw new Error("Database not initialized yet.");
  }
  return db;
}
// Fermeture des connexions
async function closeMongoConnection() {
  await mongoClient.close();
}
// Fermeture des connexions
async function closeRedisConnection() {
  await redisClient.quit();
}
// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
  getDbObject,
  closeMongoConnection,
  closeRedisConnection,
};
