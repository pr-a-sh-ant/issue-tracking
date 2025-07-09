import config from "../config/config";
import jwt from "jsonwebtoken";

export const generateToken = (
  userId: number,
  role: string,
  expiration: number
): string => {
  const payload = { userId, role };
  const secretKey = config.jwtSecret;

  return jwt.sign(payload, secretKey, {
    expiresIn: expiration,
  });
};
