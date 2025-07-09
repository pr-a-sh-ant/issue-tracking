import { createClient } from "redis";
import config from "../config/config";

const redisClient = createClient({
  username: "default",
  password: config.redisPassword,
  socket: {
    host: "redis-12292.crce176.me-central-1-1.ec2.redns.redis-cloud.com",
    port: 12292,
  },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  try {
    await redisClient.connect();
    console.log("Redis Client connected successfully");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
})();

export default redisClient;
