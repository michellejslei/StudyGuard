import io from 'socket.io-client';

export const socket = io('http://localhost:3001');

export function joinRoom(room) {
  socket.emit('joinRoom', room);
}

export function sendMessage(room, message) {
  socket.emit('chatMessage', room, message);
}

export function notifyFriends(room, myName) {
  socket.emit('userDistracted', room, `${myName} is distracted`);
}