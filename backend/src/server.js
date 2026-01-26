import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import aiRoutes from "./routes/ai.route.js";
import { connectDb } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";
import { connectRedis } from "./config/redis.js";
dotenv.config();
const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();
app.set("trust proxy", 1);
app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/ai", aiRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}
const startServer = async () => {
  try {
    await connectDb();       
    await connectRedis();    
    
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
};
startServer();