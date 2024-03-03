import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

class AuthService {
    static async register(firstName, lastName, username, email, password, dateOfBirth, gender) {
        try {
            const userExists = await User.findOne({ email, username });
            if (userExists) {
                throw new Error("User already exists");
            }

            const hashedPassword = bcrypt.hashSync(password, 12);

            if (gender !== "m" && gender !== "f") {
                throw new Error("Invalid Gender Input");
            }

            const user = await User.create({
                firstName,
                lastName,
                username,
                email,
                password: hashedPassword,
                dateOfBirth,
                gender,
            });

            const payload = {
                sub: user._id,
                name: user.fullName,
                iat: Date.now(),
            };

            await user.save();

            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            });

            return { accessToken, userId: user._id };
        } catch (error) {
            throw new Error(error);
        }
    }

    static async login(email, password) {
        try {
            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                throw new Error("User not found");
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                throw new Error("Invalid credentials");
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

            return {
                accessToken: `Bearer ${accessToken}`,
                refreshToken: `Bearer ${refreshToken}`,
                userId: user._id,
            };
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default AuthService;
