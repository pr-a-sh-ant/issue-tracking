import redisClient from "./redisClient";

export async function setOTP(
  OTP: number,
  userDetail: string,
  expiresIn: number
): Promise<void> {
  const key = `otp:${userDetail}`;
  await redisClient.set(key, OTP.toString(), { EX: expiresIn });
}

export async function removeOTP(userId: string): Promise<void> {
  const key = `otp:${userId}`;
  await redisClient.del(key);
}

export async function validateOTPCache(
  userDetail: string
): Promise<number | null> {
  try {
    const key = `otp:${userDetail}`;
    const otp = await redisClient.get(key);
    const otpStr = typeof otp === "string" ? otp : otp?.toString();
    return otp ? parseInt(otpStr, 10) : null;
  } catch (error: any) {
    throw new Error("Error validating OTP cache: " + error.message);
  }
}
