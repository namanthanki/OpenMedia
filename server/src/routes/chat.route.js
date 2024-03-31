import express from "express";
import ChatController from "../controllers/chat.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const chatRouter = express.Router();

chatRouter.get("/", verifyAccessToken, ChatController.getConversations);
chatRouter.get("/:id", verifyAccessToken, ChatController.getMessages);
chatRouter.post("/", verifyAccessToken, ChatController.create);

export default chatRouter;
