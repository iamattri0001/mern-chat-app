import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { getSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const getActiveConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({ participants: userId })
      .sort({ updatedAt: -1 })
      .populate("participants");

    const userIdToString = userId.toString();

    const users = [];
    conversations.forEach(({ participants }) => {
      if (participants[0]._id.toString() !== userIdToString) {
        users.push(participants[0]);
      }
      if (participants[1]._id.toString() !== userIdToString) {
        users.push(participants[1]);
      }
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in fetching users with conversations:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await User.findOne({ username }).select("-password");
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in /api/contacts/get", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addContact = async (req, res) => {
  try {
    const { _id: id, username: ownUserame } = req.user;
    const { username } = req.body;

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (username === ownUserame) {
      return res.status(400).json({ error: "Can't add yourself as contact " });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [id, user._id] },
    });

    if (conversation) {
      return res.status(400).json({ error: "Already in contacts" });
    }

    const receiverSocketId = getSocketId(user._id);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("addContact", user);
    }

    await Conversation.create({ participants: [id, user._id] });
    return res.status(200).json({ added: true, user });
  } catch (error) {
    console.error("Error in /api/contacts/add", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const id = req.user._id.toString();
    const contactId = req.body.id;
    if (!contactId) {
      return res.status(400).json({ error: "Contact not sepecified" });
    }
    const conversation = await Conversation.findOne({
      participants: { $all: [id, contactId] },
    });

    const messageIds = conversation.messages.map((message) => message._id);

    await Promise.all(
      messageIds.map(async (messageId) => {
        await Message.findByIdAndDelete(messageId);
      })
    );

    await Conversation.findByIdAndDelete(conversation._id);

    const receiverSocketId = getSocketId(contactId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("deleteContact", id);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in /api/message/clear", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
