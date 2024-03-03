import express from "express";
const authRouter = express.Router();
import AuthController from "../controllers/auth.controller.js";

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

export default authRouter;
