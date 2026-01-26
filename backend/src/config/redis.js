import { createClient } from "redis";

let redis;

export const connectRedis = async () => {
  try {
    if (!process.env.REDIS_URL) {
      console.warn("⚠️ REDIS_URL not set, skipping Redis");
      return null;
    }

    redis = createClient({
      url: process.env.REDIS_URL,
    });

    redis.on("error", (err) => {
      console.error("❌ Redis error:", err);
    });

    await redis.connect();
    console.log("✅ Redis connected");

    return redis;
  } catch (err) {
    console.error("❌ Redis connection failed:", err);
    return null; // VERY IMPORTANT → don't crash app
  }
};

export { redis };
