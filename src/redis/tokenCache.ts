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
