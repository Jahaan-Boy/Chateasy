import express from 'express';
import { login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';
import { authLimiter } from '../middlewares/authRateLimiter.middleware.js';
const router= express.Router();
router.post('/signup', authLimiter({
    windowMs: 15 * 60 * 1000,
    maxAttempts: 5,
    keyPrefix: "signup",
    keyGenerator: (req) =>
      `${req.body.email || "unknown"}:${req.ip}`,
  }),signup)

router.post('/login',authLimiter({
    windowMs: 60 * 60 * 1000,
    maxAttempts: 3,
    keyPrefix: "login",
    keyGenerator: (req) => req.ip,
  }),login)

router.post('/logout',logout)

router.put('/update-profile',protectRoute,updateProfile)

router.get('/check',protectRoute,(req,res)=>{res.status(200).json(req.user)});
export default router;
