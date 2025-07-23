import redisClient from "./redisClient";
import AppError from "../utils/appError";

export async function setOTP(
  OTP: number,
  userDetail: string,
  expiresIn: number
): Promise<void> {
  const key = `otp:${userDetail}`;
  const triesKey = `otp:tries:${userDetail}`;
  await redisClient
    .multi()
    .set(key, OTP.toString(), { EX: expiresIn })
    .set(triesKey, 0, { EX: expiresIn })
    .exec();
}

export async function removeOTP(userId: string): Promise<void> {
  const key = `otp:${userId}`;
  const triesKey = `otp:tries:${userId}`;
  await redisClient.del(key);
  await redisClient.del(triesKey);
}

export async function validateOTPCache(userDetail: string) {
  try {
    const key = `otp:${userDetail}`;
    const otp = await redisClient.get(key);
    const triesKey = `otp:tries:${userDetail}`;
    const tries = await redisClient.get(triesKey);
    const otpStr = typeof otp === "string" ? otp : otp?.toString();
    return {
      otp: otp ? parseInt(otpStr, 10) : null,
      tries,
    };
  } catch (error: any) {
    throw new AppError("Failed to validate OTP cache", 500, "CACHE_ERROR");
  }
}

export async function incrementTries(userDetail: string): Promise<void> {
  const triesKey = `otp:tries:${userDetail}`;
  await redisClient.incr(triesKey);
}
