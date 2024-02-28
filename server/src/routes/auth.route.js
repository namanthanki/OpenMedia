import express from "express";
const authRouter = express.Router();

authRouter.get("/register", (req, res) => {
    res.send("API server");
});

export default authRouter;
