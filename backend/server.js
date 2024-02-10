import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import contactsRoutes from "./routes/contacts.routes.js";

import { connectToDB } from "./db/connect.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import { server, app } from "./socket/socket.js";

const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/contacts", contactsRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
  connectToDB();
  console.log(`Server started on ${PORT}`);
});
