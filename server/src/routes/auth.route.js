import express from "express";
const authRouter = express.Router();
import AuthController from "../controllers/auth.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/logout", verifyAccessToken, AuthController.logout);
authRouter.post("/refresh-token", AuthController.refreshToken);

export default authRouter;
