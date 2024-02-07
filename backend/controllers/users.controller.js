import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const getActiveConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find conversations where the specified user is a participant
    const conversations = await Conversation.find({
      participants: userId,
    }).select("participants -_id"); // Select only the participants field and exclude the _id field

    const userIdToString = userId.toString();
    const getUniqueIds = () => {
      const ids = new Set();

      conversations.forEach((convo) => {
        console.log(convo.participants);
        ids.add(convo.participants[0].toString());
        ids.add(convo.participants[1].toString());
      });

      ids.delete(userIdToString);
      return Array.from(ids);
    };

    const userIds = getUniqueIds();
    const users = await User.find({ _id: { $in: userIds } });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in fetching users with conversations:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
