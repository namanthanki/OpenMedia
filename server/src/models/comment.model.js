import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        authorName: {
            type: String,
            required: true,
        },
        authorProfilePicture: {
            type: String,
            required: true,
        },
        authorUsername: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            maxLength: 500,
            required: true,
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        replies: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
    },
    { timestamps: true },
);

export const Comment = mongoose.model("Comment", commentSchema);
