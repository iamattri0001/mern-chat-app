import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; //{userId, socketId}

export const getSocketId = (id) => {
  return userSocketMap[id];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  userSocketMap[userId] = socket.id;
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
  });
});

export { io, app, server };
