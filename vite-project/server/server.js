const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    // allowedHeaders: ['my-custom-header'],
    // credentials: true
  }
});

const PORT = process.env.PORT || 3001;

// Allow CORS for all origins
// app.use(cors({
//   origin: '*'
// }));

// WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('chatMessage', (room, message) => {
    io.to(room).emit('message', message);
  });

  socket.on('userDistracted', (room, message) => {
    io.to(room).emit('distractedListener', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});