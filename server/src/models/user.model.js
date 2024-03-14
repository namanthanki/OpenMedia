import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            min: 1,
            max: 30,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            min: 6,
            max: 254,
        },
        password: {
            type: String,
            required: true,
            select: false,
            min: 8,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            min: 1,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            min: 1,
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
        isProfileSetup: {
            type: Boolean,
            default: false,
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
        friendships: [
            {
                type: Schema.Types.ObjectId,
                ref: "Friendship",
            },
        ],
        // Todo: Denormalize more data
        friendsCount: {
            type: Number,
            default: 0,
        },
        followersCount: {
            type: Number,
            default: 0,
        },
        followingsCount: {
            type: Number,
            default: 0,
        },
        blockedUsers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        likedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        savedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        likedComments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        sharedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        notifications: [
            {
                type: Schema.Types.ObjectId,
                ref: "Notification",
            },
        ],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Message",
            },
        ],
        conversations: [
            {
                type: Schema.Types.ObjectId,
                ref: "Conversation",
            },
        ],
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
        lastSeen: {
            type: Date,
            default: Date.now,
        },
        refreshToken: {
            type: String,
            default: "",
            select: false,
        },
    },
    { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
