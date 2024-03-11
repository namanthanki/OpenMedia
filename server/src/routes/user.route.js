import express from "express";
const userRouter = express.Router();
import UserController from "../controllers/user.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

userRouter.get("/", verifyAccessToken, UserController.getUser);
userRouter.put("/", verifyAccessToken, UserController.updateUser);
userRouter.delete("/", verifyAccessToken, UserController.deleteUser);
userRouter.put("/setup", verifyAccessToken, UserController.setupProfile);
// userRouter.get("/profile/:username", verifyAccessToken, UserController.getProfile);
userRouter.post("/follow/:id", verifyAccessToken, UserController.follow);
userRouter.post("/unfollow/:id", verifyAccessToken, UserController.unfollow);

export default userRouter;
