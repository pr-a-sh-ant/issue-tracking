import mysql, { PoolOptions } from "mysql2/promise";
import config from "../config/config";

const dbConfig: PoolOptions = {
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

export default pool;
