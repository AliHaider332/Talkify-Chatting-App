import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
export const app = express();
export const httpServer = http.createServer(app);
dotenv.config();
export const io = new Server(httpServer, {
  cors: {
    origin:process.env.CLIENT_ROUTE,
  },
});

const onlineUserMap = {};

io.on('connection', (socket) => {
  const { userID } = socket.handshake.query;

  // store userId -> socketId
  onlineUserMap[userID] = socket.id;

  // emit array of online userIds
  io.emit('onlineUser', Object.keys(onlineUserMap));

  // console.log("Online users:", onlineUserMap);

  socket.on('disconnect', () => {
    delete onlineUserMap[userID];

    // emit array again (NOT object)
    io.emit('onlineUser', Object.keys(onlineUserMap));
  });
});

export const getSocketId = (receiverID) => {
  return onlineUserMap[receiverID];
};
