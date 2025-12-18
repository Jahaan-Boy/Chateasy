import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDb } from "./lib/db.js";
import path from 'path';
import cookieParser from 'cookie-parser'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use('/api/messages',messageRoutes);

if(process.env.NODE_ENV=='production'){
  app.use(express.static(path.join(__dirname,'../frontend/dist')));

  app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
}

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
  connectDb();
});
