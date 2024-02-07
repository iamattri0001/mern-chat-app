import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, contentType } = req.body;
    const senderId = req.user._id;
    const { id: receiverId } = req.params;
    console.log(content, contentType, senderId, receiverId);
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
    const { msgId } = req.params;
    const { userId } = req.user._id;

    const message = await Message.findById(msgId);
    if (!message) {
      return res.status(400).json({ error: "Couldn't delete the message" });
    }

    if (message.senderId !== userId) {
      return res
        .status(400)
        .json({ error: "You don't have permissions to delete this message" });
    }

    const senderId = message.senderId;
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, senderId] },
    });

    conversation.messages = conversation.messages.filter(
      (msg) => msg !== message._id
    );
    console.log(conversation);
  } catch (error) {}
};
