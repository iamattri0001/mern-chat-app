import express from "express";
import { deleteMessage, getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);
router.post("/delete/:msgId", protectRoute, deleteMessage);
router.get("/:id/", protectRoute, getMessages);

export default router;
