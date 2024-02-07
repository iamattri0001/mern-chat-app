import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getActiveConversations } from "../controllers/users.controller.js";

const router = express.Router();

router.get('/', protectRoute, getActiveConversations)

export default router;
