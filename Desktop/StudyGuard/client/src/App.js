import React, { useState } from 'react';
import io from 'socket.io-client';
import Webcam from './Webcam';


// import * as tmPose from '@teachablemachine/pose'; //added 


const socket = io('http://localhost:3001');

const App = () => {
  const [room, setRoom] = useState('');
  const [myName, setMyName] = useState('');
  // const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  console.log(socket)

  const joinRoom = () => {
    socket.emit('joinRoom', room);
  };

  // const sendMessage = () => {
  //   socket.emit('chatMessage', room, message);
  //   setMessage('');
  // };

  socket.on('message', (msg) => {
    setMessages([...messages, msg]);
  });

  socket.on('distractedListener', (msg) => {
    setMessages([...messages, msg]);
  });

  const notifyFriends = () => {
    socket.emit('userDistracted', room, `${myName} is distracted`)
  };

  return (
    <div>
      <Webcam />
      <h1>Group Study Zone</h1>
      <input type="text" value={myName} onChange={(e) => setMyName(e.target.value)} placeholder="Enter your name" />
      <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Enter room name" />
      <button onClick={joinRoom}>Join Room</button>

  {/* <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter message" />
      <button onClick={sendMessage}>Send Message</button> */}
      <button onClick={notifyFriends}>Notify Friend</button>
      <ul>

      {messages.map((msg, index) => (
        <li key={index}>{msg}</li>
      ))}
    </ul>
  </div>
);
};

export default App;