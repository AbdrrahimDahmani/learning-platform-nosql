// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :

const { connectRedis } = require("../config/db");

// connexion a redis
let client;
(async () => {
  client = await connectRedis();
})();
// Fonctions utilitaires pour Redis
async function cacheData(key, data) {
  return new Promise(async (resolve, reject) => {
    let res = await getData(key);
    if (res) {
      console.log("HIT");
      resolve(JSON.parse(res));
    } else {
      console.log("MISS");
      await client.set(key, JSON.stringify(data));
      await client.expire(key, 20);
      resolve(JSON.parse(data));
    }
  });
}

async function getData(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(reply));
      }
    });
  });
}

module.exports = {
  cacheData,
  getData,
};
