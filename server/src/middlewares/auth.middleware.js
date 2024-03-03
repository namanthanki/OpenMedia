import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyAccessToken = async (req, res, next) => {
    const accessToken = req.cookies?.accessToken.split(" ")[1] || req.header("Authorization")?.split(" ")[1];
    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded?.sub).select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({ message: "Invalid Access Token" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized" });
    }
};
