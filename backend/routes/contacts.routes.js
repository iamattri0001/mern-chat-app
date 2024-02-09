import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  addContact,
  getActiveConversations,
  getUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", protectRoute, getActiveConversations);
router.get("/get", protectRoute, getUser);
router.post('/add', protectRoute, addContact)

export default router;
