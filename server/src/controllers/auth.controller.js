import AuthService from "../services/auth.service.js";
import vine, { errors } from "@vinejs/vine";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

class AuthController {
    static async register(req, res) {
        const data = req.body;
        try {
            const validator = vine.compile(registerSchema);
            const output = await validator.validate(data);

            const { firstName, lastName, username, email, password, dateOfBirth, gender } = output;

            const user = await AuthService.register(
                firstName,
                lastName,
                username,
                email,
                password,
                dateOfBirth,
                gender,
            );

            if (user) {
                return res.status(201).json({ user, message: "User created successfully" });
            } else {
                return res.status(500).json({ message: "Error occurred while creating the user" });
            }
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return res.status(400).json({ message: error.messages });
            }

            res.status(500).json({
                message: "Error occurred while creating the user",
                error: error.message,
            });
        }
    }

    static async login(req, res) {
        const data = req.body;
        try {
            const validator = vine.compile(loginSchema);
            const output = await validator.validate(data);

            const { email, password } = output;

            const user = await AuthService.login(email, password);

            if (user instanceof Error) {
                return res.status(400).json({ message: user.message });
            }

            if (user === null || user === undefined) {
                return res.status(500).json({ message: "Error occurred while logging in" });
            }

            const cookieOptions = {
                httpOnly: true,
                secure: true,
            };

            res.status(200)
                .cookie("accessToken", user.accessToken, cookieOptions)
                .cookie("refreshToken", user.refreshToken, cookieOptions)
                .json({ user, message: "User logged in successfully" });
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return res.status(400).json({ message: error.messages });
            }

            res.status(500).json({
                message: "Error occurred while logging in",
                error: error.message,
            });
        }
    }

    static async logout(req, res) {
        try {
            await User.findByIdAndUpdate(
                req.user._id,
                {
                    $set: { refreshToken: "" },
                },
                { new: true },
            );

            const cookieOptions = {
                httpOnly: true,
                secure: true,
            };

            res.status(200)
                .clearCookie("accessToken", cookieOptions)
                .clearCookie("refreshToken", cookieOptions)
                .json({ message: "User logged out successfully" });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while logging out",
                error: error.message,
            });
        }
    }

    static async refreshToken(req, res) {
        try {
            const incomingRefreshToken =
                req.cookies?.incomingRefreshToken.split(" ")[1] || req.header("Authorization")?.split(" ")[1];
            if (!incomingRefreshToken) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

            const user = await User.findById(decoded?.sub).select("-password -refreshToken");

            if (!user) {
                return res.status(404).json({ message: "Invalid Refresh Token" });
            }

            if (user?.refreshToken !== refreshToken) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const payload = {
                sub: user._id,
                name: user.fullName,
                iat: Date.now(),
            };

            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            });

            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
            });

            user.refreshToken = refreshToken;
            await user.save({ validateBeforeSave: false });

            const cookieOptions = {
                httpOnly: true,
                secure: true,
            };

            res.status(200)
                .cookie("accessToken", accessToken, cookieOptions)
                .cookie("refreshToken", refreshToken, cookieOptions)
                .json({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    message: "Access Token refreshed successfully",
                });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while refreshing the Access Token",
                error: error.message,
            });
        }
    }
}

export default AuthController;
