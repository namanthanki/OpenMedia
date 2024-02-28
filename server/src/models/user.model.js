import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        coverPicture: {
            type: String,
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
    },
    { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
