import mongoose from "mongoose";
import { Schema } from "mongoose";

const postSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            maxLength: 500,
            required: true,
        },
        image: {
            type: String,
            default: "",
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        shares: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        reposts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
    },
    { timestamps: true },
);

export const Post = mongoose.model("Post", postSchema);
