import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        bio: {
            type: String,
            trim: true,
            maxLength: 250,
            default: "",
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            trim: true,
            default: "",
        },
        coverPicture: {
            type: String,
            trim: true,
            default: "",
        },
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        followings: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        blockedUsers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
