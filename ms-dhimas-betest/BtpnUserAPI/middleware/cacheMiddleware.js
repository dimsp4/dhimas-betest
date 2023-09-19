const redis = require("redis");
const client = redis.createClient(6379);

(async () => {
  client.on("error", (err) => {
    console.log("Redis Client Error", err);
  });

  client.on("ready", () => console.log("Redis is ready"));

  await client.connect();

  await client.ping();
})();

const getCacheMiddleware = (key) => {
  return async (req, res, next) => {
    try {
      const cachedData = await client.get(key);
      if (cachedData !== null) {
        return res.status(200).json(JSON.parse(cachedData));
      } else {
        next();
      }
    } catch (error) {
      next();
    }
  };
};

const getByIdCacheMiddleware = (key) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const cachedData = await client.get(key);
      if (cachedData !== null) {
        const jsonData = JSON.parse(cachedData).find(data => data._id === id)
        return res.status(200).json(jsonData);
      } else {
        next();
      }
    } catch (error) {
      next();
    }
  };
};

module.exports = {
  getCacheMiddleware,
  getByIdCacheMiddleware,
  client,
};
