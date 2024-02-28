import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

export const connectDatabase = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};