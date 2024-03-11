import express from "express";
import PostController from "../controllers/post.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const postRouter = express.Router();

postRouter.post("/", verifyAccessToken, PostController.create);
postRouter.get("/", verifyAccessToken, PostController.getAll);
postRouter.get("/:id", verifyAccessToken, PostController.getOne);
postRouter.put("/:id", verifyAccessToken, PostController.update);
postRouter.delete("/:id", verifyAccessToken, PostController.delete);

export default postRouter;
