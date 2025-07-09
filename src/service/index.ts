import userServer from "./server/userServer";
import { ServerCredentials } from "@grpc/grpc-js";
import pool from "../db/db";
import redisClient from "../redis/redisClient";

userServer.bindAsync(
  "127.0.0.1:50051",
  ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Server error:", err);
      return;
    }
    console.log(`User server running at http://127.0.0.1:${port}`);
  }
);
