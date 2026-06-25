import {Server} from 'socket.io';
import http from 'http';

import express from 'express';

const app = express();
const server = http.createServer(app);

const io =new Server(server,{origin: '*',methods: ['GET','POST']});

const usersSocketMap={};

const getSocketIdByUserId = (userId) => {
  return usersSocketMap[userId];
}


io.on('connection', (socket) => {

    const userId = socket.handshake.query.userId;
  console.log('A user connected with userId:', userId);

  if(userId) usersSocketMap[userId] = socket.id;
  io.emit('onlineUsers', Object.keys(usersSocketMap));

  io.on('disconnection', () => {
    console.log('A user disconnected with userId:', userId);
    if(userId) delete usersSocketMap[userId];
    io.emit('onlineUsers', Object.keys(usersSocketMap));
  })
}
);

export {io,app, usersSocketMap, server,getSocketIdByUserId};
