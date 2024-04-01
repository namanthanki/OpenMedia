import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

class ChatService {
    static async create(data) {
        try {
            let conversation = await Conversation.findOne({
                members: { $all: [data.sender, data.receiver] },
            });

            if (!conversation) {
                conversation = new Conversation({
                    members: [data.sender, data.receiver],
                    lastMessage: {
                        content: data.message,
                        sender: data.sender,
                    },
                });

                await conversation.save();
            }

            const message = new Message({
                conversationId: conversation._id,
                sender: data.sender,
                message: data.message,
            });

            await Promise.all([
                message.save(),
                conversation.updateOne({
                    lastMessage: {
                        message: data.message,
                        sender: data.sender,
                    },
                }),
            ]);

            return message;
        } catch (error) {
            throw error;
        }
    }

    static async getMessages(senderId, receiverId) {
        try {
            const conversation = await Conversation.findOne({
                members: { $all: [senderId, receiverId] },
            });

            if (!conversation) {
                return null;
            }

            const messages = await Message.find({
                conversationId: conversation._id,
            }).sort({ createdAt: 1 });

            return messages;
        } catch (error) {
            throw error;
        }
    }

    static async getConversations(userId) {
        try {
            const conversations = await Conversation.find({
                members: { $in: [userId.toString()] },
            }).populate("members");

            return conversations;
        } catch (error) {
            throw error;
        }
    }

    static async searchUsers(userId, query) {
        try {
            const users = await User.find({
                $and: [
                    { _id: { $ne: userId } },
                    {
                        $or: [
                            { username: { $regex: query, $options: "i" } },
                            { email: { $regex: query, $options: "i" } },
                        ],
                    },
                ],
            });

            return users;
        } catch (error) {
            throw error;
        }
    }
}

export default ChatService;
