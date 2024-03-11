import mongoose from "mongoose";
import { Schema } from "mongoose";

const friendshipSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true },
);

export const Friendship = mongoose.model("Friendship", friendshipSchema);
