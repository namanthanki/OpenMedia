import mongoose from "mongoose";
import { Schema } from "mongoose";

const friendshipSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        status: {
            type: Number,
            enum: [0, 1, 2],
        },
    },
    { timestamps: true },
);

export const Friendship = mongoose.model("Friendship", friendshipSchema);
