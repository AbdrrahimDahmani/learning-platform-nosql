const { connectRedis } = require("../config/db");

let clientPromise; // Hold the promise for Redis client initialization

(async () => {
  clientPromise = connectRedis(); // Assign the promise
})();

// pour assurer que le client est bien initialisé
async function getClient() {
  if (!clientPromise) {
    throw new Error("Redis client not initialized");
  }
  return clientPromise;
}

// Utility functions
async function cacheData(key, data) {
  const client = await getClient();
  const cachedData = await getData(key);

  if (cachedData) {
    console.log("HIT");
    return cachedData;
  } else {
    try {
      console.log("MISS");
      await client.set(key, JSON.stringify(data));
      await client.expire(key, 20);
      return data;
    } catch (err) {
      console.error("error", err);
    }
  }
}

async function getData(key) {
  const client = await getClient();
  try {
    const data = await client.get(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (err) {
    console.error("can't get data", err);
    return null;
  }
}

module.exports = {
  cacheData,
  getData,
};
