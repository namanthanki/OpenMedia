import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

class AuthService {
    static async register(firstName, lastName, username, email, password, dateOfBirth, gender) {
        try {
            const userExists = await User.findOne({ email, username });
            if (userExists) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = bcrypt.hash(password, 12);

            if (gender !== "m" || gender !== "f") {
                return new Error("Invalid Gender Input");
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

            await user.save();
            const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: ACCESS_TOKEN_EXPITY,
            });

            return { accessToken, userId: user._id };
        } catch (error) {
            throw new Error({
                message: "Error occurred while creating the user",
                error,
            });
        }
    }

    static async login(email, password) {
        try {
            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return new Error("User not found");
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                return new Error("Invalid credentials");
            }

            const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: ACCESS_TOKEN_EXPITY,
            });

            const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: REFRESH_TOKEN_EXPITY,
            });

            return { accessToken, refreshToken, userId: user._id };
        } catch (error) {
            throw new Error({
                message: "Error occurred while logging in",
                error,
            });
        }
    }
}

export default AuthService;
