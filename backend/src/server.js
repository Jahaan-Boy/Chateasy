import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDb } from "./lib/db.js";
import path from 'path';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";
import aiRoutes from './routes/ai.route.js'
dotenv.config();
const PORT = process.env.PORT || 4000;
const __dirname=path.resolve();

app.set("trust proxy", 1);
app.use(express.json({limit:'20mb'}));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? true // allow same-origin
        : ENV.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use('/api/messages',messageRoutes);
app.use("/api/ai", aiRoutes);

if(process.env.NODE_ENV=='production'){
  app.use(express.static(path.join(__dirname,'../frontend/dist')));

  app.use((req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}

server.listen(PORT, () => {
  console.log("Server running on port:", PORT);
  connectDb();
});
