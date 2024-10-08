// backend/index.js

import express from 'express'; 
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './route/userRoute.js';
import messageRoute from './route/messageRoute.js';
import databaseConnection from './utils/database.js';
import { app, server } from "./socket/socket.js";
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',  // Fixed typo here
    credentials: true
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Serve static files for frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Start server
server.listen(PORT, () => {
    databaseConnection();
    console.log(`Server listening on port ${PORT}`);
});
