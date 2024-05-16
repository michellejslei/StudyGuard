import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client';
import Footer from '../components/Footer';
import Timer from '../components/Timer';

const socket = io('https://cdn.socket.io/4.0.0/socket.io.min.js');

const JoinRoom = () => {
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);

  const joinRoom = () => {
      socket.emit('joinRoom', roomName);
  };

  const notifyFriends = () => {
      socket.emit('userDistracted', roomName, `${name} is distracted`);
  };

  socket.on('distractedListener', msg => {
      setMessages(prev => [...prev, msg]);
  });

  return (
      <div className="join-room-container">
          <h2>join a study room</h2>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="your name"/>
          <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="room name"/>
          <button onClick={joinRoom}>Join Room</button>
          <button onClick={notifyFriends}>Notify Friends</button>
          <div>
              {messages.map((msg, index) => <div key={index}>{msg}</div>)}
          </div>
      </div>
  );
};

const Study = () => {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef(null);

  const toggleTimer = () => {
    setIsActive(!isActive);  // Toggle the timer active state
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
        canvas.width = 300;  // Set canvas width
        canvas.height = 200; // Set canvas height
    }, []);

  return (
    <div className="bg-wave-pattern h-screen bg-cover bg-center flex flex-col z-0 w-full relative">
      <div className="text-center w-full">
          <h1 className="text-white text-5xl py-8">stay focused and study!!</h1>
          <button 
            className="bg-white px-4 py-2 text-xl text-purple-100 rounded-lg transition duration-300 ease-in-out hover:bg-rose-400 hover:text-white mx-auto"
            onClick={init}>
              start focus
          </button>
          <canvas ref={canvasRef}></canvas>
          <Timer isActive={isActive} onTimeComplete={() => console.log("Timer complete!")}/>
          <button className="bg-white hover:bg-rose-400 hover:text-white text-purple-100 font-bold py-1 px-3 rounded my-4" onClick={toggleTimer}>
              {isActive ? '❚❚' : '▶'}
          </button>
        </div>
        <Footer />
    </div>
  )
}

export default Study