import config from "../config/config";
import jwt from "jsonwebtoken";
import { setToken } from "../redis/tokenCache";

export const generateToken = (detail: {
  userId: number;
  role: string;
}): { accessToken: string; refreshToken: string } => {
  const secretKey = config.jwtSecret;

  const accessToken = jwt.sign(detail, secretKey, {
    expiresIn: "15m", // 15 minutes
  });

  const refreshToken = jwt.sign({}, secretKey, {
    expiresIn: "3d", // 3 days
  });
  // Store the refresh token in Redis with an expiration time
  setToken(refreshToken, detail?.userId.toString(), 3 * 24 * 60 * 60); // 3 days in seconds
  return {
    accessToken,
    refreshToken,
  };
};

export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return reject(new Error("Invalid token"));
      }
      resolve(decoded);
    });
  });
};
