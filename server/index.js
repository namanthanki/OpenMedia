/**
 * API server
 * OpenMedia - An open source social media platform
 * Technologies: Node.js, Express.js, PostgreSQL, React.js
 * Author: Naman Thanki
 */

// Importing required modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import { connectDatabase } from "./src/config/db.config.js";

// Environment variables
dotenv.config({
    path: "/.env",
});

// Express app
const app = express();

// Middlewares
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
);
app.use(morgan("common"));
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }),
);
app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// Routes configuration
import apiRouter from "./src/routes/index.route.js";
app.use(apiRouter);

// Server initialization
const port = 3000 || process.env.PORT;
const hostname = process.env.HOSTNAME || "127.0.0.1";

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    connectDatabase();
});
