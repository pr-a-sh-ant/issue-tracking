import redisClient from "./redisClient";

export async function setToken(
  token: string,
  userId: string,
  expiresIn: number
): Promise<void> {
  const key = `token:${token}`;
  await redisClient.set(key, userId, { EX: expiresIn });
}

export async function removeToken(token: string): Promise<void> {
  const key = `token:${token}`;
  await redisClient.del(key);
}

export async function validateTokenCache(
  token: string
): Promise<string | null> {
  const key = `token:${token}`;
  const userId = await redisClient.get(key);
  return userId.toString() ?? null;
}

export async function storeResetToken(
  token: string,
  userId: string
): Promise<void> {
  const key = `reset:${token}`;
  const ttlSeconds = 15 * 60; // 15 minutes

  await redisClient.set(key, userId, { EX: ttlSeconds });
}

export async function verifyResetToken(token: string): Promise<string | null> {
  const key = `reset:${token}`;
  const userInfo = await redisClient.get(key);
  if (!userInfo) {
    throw new Error("Invalid or expired reset token");
  }
  return userInfo.toString();
}
