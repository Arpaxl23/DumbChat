const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const User=require("../Models/user.Model");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    },
});

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
const userSocketMap = {};
io.on('connection', async (socket) => {
   
    const userId = socket.handshake.query.userId;
    const user=await User.findOne({_id:userId})
    console.log(`${user.username}`);
    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        console.log(`User ${user.username} is mapped to socket ${socket.id}`);
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

module.exports = { app, io, server, getReceiverSocketId };

