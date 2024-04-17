import mongoose from "mongoose";
const { Schema } = mongoose;

const conversationSchema = new Schema(
    {
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        lastMessage: {
            message: {
                type: String,
            },
            sender: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        },
    },
    { timestamps: true },
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
