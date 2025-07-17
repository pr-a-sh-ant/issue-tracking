import config from "../config/config";
import jwt from "jsonwebtoken";

export const generateToken = (
  detail: { userId: number; role: string } | { userInfo: string },
  expiration: number
): string => {
  const secretKey = config.jwtSecret;

  return jwt.sign(detail, secretKey, {
    expiresIn: expiration,
  });
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
