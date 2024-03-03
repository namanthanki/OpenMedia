import mongoose from "mongoose";
import { Schema } from "mongoose";

const settingsSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        theme: {
            type: String,
            enum: ["light", "dark"],
            default: "light",
        },
        notifications: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

export const Settings = mongoose.model("Settings", settingsSchema);
