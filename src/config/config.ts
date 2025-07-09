import { configDotenv } from "dotenv";

configDotenv();

const config = {
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "issue_tracking",
    port: Number(process.env.DB_PORT) || 3306,
  },
  jwtSecret: process.env.JWT_SECRET,
  redisPassword: process.env.REDIS_PASSWORD,
};

export default config;
export type Config = typeof config;
