import express from "express";
import PostController from "../controllers/post.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import { postUpload } from "../middlewares/multer.middleware.js";

const postRouter = express.Router();

postRouter.post("/", verifyAccessToken, postUpload, PostController.create);
postRouter.get("/", verifyAccessToken, PostController.getAll);
postRouter.get("/profile/:id", verifyAccessToken, PostController.getProfilePosts);
postRouter.get("/feed", verifyAccessToken, PostController.getFeedPosts);
postRouter.get("/:id", verifyAccessToken, PostController.getOne);
postRouter.put("/:id", verifyAccessToken, PostController.update);
postRouter.delete("/:id", verifyAccessToken, PostController.delete);
postRouter.post("/:id/like", verifyAccessToken, PostController.like);
postRouter.post("/:id/unlike", verifyAccessToken, PostController.unlike);
postRouter.post("/:id/comment", verifyAccessToken, PostController.comment);

export default postRouter;
