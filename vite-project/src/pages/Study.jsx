import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Footer from '../components/Footer';
import Timer from '../components/Timer';

const socket = io('https://cdn.socket.io/4.0.0/socket.io.min.js');

const JoinRoom = () => {
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);

  const joinRoom = () => {
      socket.emit('joinRoom', { name, roomName });
  };

  const notifyFriends = () => {
      socket.emit('userDistracted', { name, roomName });
  };

  useEffect(() => {
    socket.on('distractedListener', msg => {
      setMessages(prev => [...prev, msg]);
    });

    // Clean up on component unmount
    return () => {
      socket.off('distractedListener');
    };
  }, []);

  return (
    <div className="fixed top-28 left-20 bg-white bg-opacity-30 p-8 rounded-lg z-30 flex flex-col gap-1.5 w-auto max-w-xs">
      <h2 className="text-white text-2xl text-center mb-2.5">join a study room</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="your name" 
            className="p-2.5 border border-gray-300 rounded text-sm font-sans"/>
      <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="room name"
            className="p-2.5 border border-gray-300 rounded text-sm font-sans"/>
      <div className="flex flex-col space-y-2 py-3">
          <button className="text-white bg-rose-400 hover:bg-orange-500 rounded py-1 px-3"
                  onClick={joinRoom}>Join Room</button>
          <button className="text-base text-white bg-rose-400 hover:bg-orange-500 rounded py-1 px-3"
                  onClick={notifyFriends}>Notify Friends</button>
      </div>
      {messages.map((msg, index) => <div key={index} className="text-white mt-5 text-sm overflow-y-auto max-h-48">{msg}</div>)}
    </div>

  );
};

const Study = () => {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef(null);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

const init = () => {
  // initialization logic 
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  // Start the timer
  setIsActive(true);
  
  // Clear previous drawings and start fresh
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(10, 10, 100, 100);  
};

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 300;
    canvas.height = 200;
  }, []);

  return (
    <div className="bg-wave-pattern h-screen bg-cover bg-center flex flex-col z-0 w-full relative">
      <JoinRoom />
      <div className="text-center w-full">
          <h1 className="text-white text-5xl py-8">stay focused and study!!</h1>
          <button 
            className="bg-white px-4 py-2 text-xl text-purple-100 rounded-lg transition duration-300 ease-in-out hover:bg-rose-400 hover:text-white mx-auto"
            onClick={init}>
              start focus
          </button>
          <canvas ref={canvasRef}></canvas>
          <Timer isActive={isActive} onTimeComplete={() => console.log("Timer complete!")}/>
          <button className="bg-white my-4 px-4 py-2 text-xl text-purple-100 rounded-lg transition duration-300 ease-in-out hover:bg-rose-400 hover:text-white mx-auto" onClick={toggleTimer}>
            {isActive ? '❚❚' : '▶'}
          </button>
        </div>
        <Footer />
    </div>
  )
}

export default Study;
