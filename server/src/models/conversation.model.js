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
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Message",
            },
        ],
    },
    { timestamps: true },
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
