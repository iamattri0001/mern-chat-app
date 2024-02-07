import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import { connectToDB } from "./db/connect.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectToDB();
  console.log(`Server started on ${PORT}`);
});
