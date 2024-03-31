import ChatService from "../services/chat.service.js";

class ChatController {
    static async create(req, res) {
        const senderId = req.user.id;
        const { receiverId, message } = req.body;
        try {
            const data = {
                sender: senderId,
                receiver: receiverId,
                message,
            };
            const chat = await ChatService.create(data);

            if (!chat) {
                return res.status(400).json({
                    message: "Error occurred while creating message",
                });
            }

            return res.status(201).json({
                chat,
                message: "Chat created successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while creating chat",
                error: error.message,
            });
        }
    }

    static async getMessages(req, res) {
        const senderId = req.user.id;
        const receiverId = req.params.id;
        try {
            const messages = await ChatService.getMessages(
                senderId,
                receiverId,
            );

            if (!messages) {
                return res.status(404).json({
                    message: "Messages not found",
                });
            }

            return res.status(200).json({
                messages,
                message: "Messages retrieved successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while retrieving messages",
                error: error.message,
            });
        }
    }

    static async getConversations(req, res) {
        const userId = req.user.id;
        try {
            const conversations = await ChatService.getConversations(userId);

            if (!conversations) {
                return res.status(404).json({
                    message: "Conversations not found",
                });
            }

            return res.status(200).json({
                conversations,
                message: "Conversations retrieved successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while retrieving conversations",
                error: error.message,
            });
        }
    }
}

export default ChatController;
