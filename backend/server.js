import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import contactsRoutes from "./routes/contacts.routes.js";

import { connectToDB } from "./db/connect.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/contacts", contactsRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectToDB();
  console.log(`Server started on ${PORT}`);
});
