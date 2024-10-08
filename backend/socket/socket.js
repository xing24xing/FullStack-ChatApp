import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['https://fullstack-chatapp-fdxo.onrender.com'], // Include your production URL
        methods: ['GET', 'POST'],
        credentials: true // Allow credentials (cookies, authorization headers, etc.)
    },
});

// User socket mapping
const userSocketMap = {}; // {userId -> socketId}

// Get receiver socket ID
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

// Socket.IO connection handling
io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

// Export the server and app
export { app, io, server };
