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
// userRouter.get("/friends", verifyAccessToken, UserController.getFriends);
// userRouter.get("/followers", verifyAccessToken, UserController.getFollowers);
// userRouter.get("/followings", verifyAccessToken, UserController.getFollowings);
userRouter.post(
    "/send-friend-request/:id",
    verifyAccessToken,
    UserController.sendFriendRequest,
);
userRouter.post(
    "/accept-friend-request/:id",
    verifyAccessToken,
    UserController.acceptFriendRequest,
);
userRouter.post(
    "/reject-friend-request/:id",
    verifyAccessToken,
    UserController.rejectFriendRequest,
);
userRouter.post(
    "/cancel-friend-request/:id",
    verifyAccessToken,
    UserController.cancelFriendRequest,
);
userRouter.post("/unfriend/:id", verifyAccessToken, UserController.unfriend);

export default userRouter;
