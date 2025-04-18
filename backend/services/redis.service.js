const redis = require("ioredis");

const redisClient = new redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("connect", () => {
  console.log("Redis connected");
});
module.exports = redisClient;
