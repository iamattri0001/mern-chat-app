import express from "express";
import dotenv from "dotenv";


import authRoutes from "./routes/auth.routes.js";
import { connectToDB } from "./db/connect.js";

const app = express();

dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectToDB();
  console.log(`Server started on ${PORT}`);
});
