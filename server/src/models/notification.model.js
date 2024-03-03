import mongoose from "mongoose";
import { Schema } from "mongoose";

const notificationSchema = new Schema(
    {
        recipient: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    },
    { timestamps: true },
);

export const Notification = mongoose.model("Notification", notificationSchema);
