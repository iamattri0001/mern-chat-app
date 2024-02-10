import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, contentType, receiverId } = req.body;
    const senderId = req.user._id;
    if (!content || !contentType || !senderId || !receiverId) {
      return res.status(400).json({ error: "Incomplete message data" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const message = new Message({ senderId, receiverId, content, contentType });

    if (message) {
      conversation.messages.push(message);
    }

    await Promise.all([conversation.save(), message.save()]);

    const receiverSocketId = getSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }

    return res.status(201).json({ message });
  } catch (error) {
    console.error("Error in /api/message/send", error.message);
    return res.status(500).json({ error: "internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    let from = req.query.from;
    let to = req.query.to;

    if (!from) {
      from = 0;
    }

    if (!to) {
      to = 20;
    }

    const userId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, userToChatId] },
    }).populate({
      path: "messages",
      options: {
        sort: { createdAt: -1 }, // Sort messages in descending order based on creation timestamp
        skip: parseInt(from), // Skip messages before the "from" index
        limit: parseInt(to) - parseInt(from) + 1, // Limit the number of messages based on the range
      },
    });

    // Extract and return the messages
    const messages = conversation ? conversation.messages : [];
    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error in /api/message/:id", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id: msgId } = req.body;
    const userId = req.user._id;

    const message = await Message.findById(msgId);
    if (!message) {
      return res.status(400).json({ error: "Message not found" });
    }

    if (message.senderId.toString() != userId.toString()) {
      return res
        .status(400)
        .json({ error: "You don't have permissions to delete this message" });
    }

    const senderId = message.senderId;
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, senderId] },
    });

    conversation.messages = conversation.messages.filter(
      (msg) => msg._id.toString() !== message._id.toString()
    );

    const receiverId = message.receiverId;
    const receiverSocketId = getSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("deleteMessage", message);
    }

    await Promise.all([conversation.save(), Message.findByIdAndDelete(msgId)]);
    return res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    console.error("Error in /api/message/delete", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const editMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: msgId, content } = req.body;

    const message = await Message.findById(msgId);
    if (!message) {
      return res.status(400).json({ error: "Message not found" });
    }

    if (message.senderId.toString() != userId.toString()) {
      return res
        .status(400)
        .json({ error: "You don't have permissions to update this message" });
    }

    message.content = content;
    await message.save();

    const receiverId = message.receiverId.toString();
    const receiverSocketId = getSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("editMessage", message);
    }

    return res.status(200).json(message);
  } catch (error) {
    console.error("Error in /api/message/edit", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const clearMessages = async (req, res) => {
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

    const receiverSocketId = getSocketId(contactId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("clearConversation", id);
    }

    conversation.messages = [];
    await conversation.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in /api/contact/delete", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
