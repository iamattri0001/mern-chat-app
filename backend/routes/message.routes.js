import express from "express";
import {
  clearMessages,
  deleteMessage,
  editMessage,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/send", protectRoute, sendMessage);
router.post("/delete", protectRoute, deleteMessage);
router.post("/edit", protectRoute, editMessage);
router.get("/:id", protectRoute, getMessages);
router.post("/clear", protectRoute, clearMessages);

export default router;
