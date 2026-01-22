import { redis } from "../config/redis.js";

export const authLimiter = ({
  windowMs,
  maxAttempts,
  keyPrefix,
  keyGenerator,
}) => {
  return async (req, res, next) => {
    console.log("🔥 AUTH RATE LIMITER HIT");

    try {
      const key = `${keyPrefix}:${keyGenerator(req)}`;

      const attempts = await redis.incr(key);

      if (attempts === 1) {
        await redis.expire(key, Math.ceil(windowMs / 1000));
      }

      console.log({ key, attempts });

      if (attempts > maxAttempts) {
        return res.status(429).json({
          message: "Too many attempts. Please try again later.",
        });
      }

      next();
    } catch (error) {
      console.error("Rate limiter error:", error);
      next(); // fail open
    }
  };
};
