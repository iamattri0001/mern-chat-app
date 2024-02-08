import express from "express";
import {
  checkUsernameAvailability,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",protectRoute, logout);
router.get("/available", checkUsernameAvailability);

export default router;
