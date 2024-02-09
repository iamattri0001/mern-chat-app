import express from "express";
import {
  checkUsernameAvailability,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/available", checkUsernameAvailability);

export default router;
