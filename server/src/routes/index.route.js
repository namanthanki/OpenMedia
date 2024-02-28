import express from "express";
import authRouter from "./auth.route.js";
const apiRouter = express.Router();

const baseUrl = "/api/v1";

apiRouter.get(`${baseUrl}/`, (req, res) => {
    res.status(200).json({
        success: true,
        message: "ok",
    });
});

apiRouter.use(`${baseUrl}/auth`, authRouter);

export default apiRouter;
