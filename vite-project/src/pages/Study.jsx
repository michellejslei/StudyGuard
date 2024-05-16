import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';

import io from 'socket.io-client';

import Footer from '../components/Footer';
import Timer from '../components/Timer';

const socket = io('http://localhost:3001');

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
  const [webcamActive, setWebcamActive] = useState(false);
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const init = () => {
    // initialization logic 
    setIsActive(true);
    setWebcamActive(true);

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

  useEffect(() => {
    const modelURL = 'https://teachablemachine.withgoogle.com/models/MMDGiD6CS/model.json';
    const metadataURL = 'https://teachablemachine.withgoogle.com/models/MMDGiD6CS/metadata.json';

    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel(modelURL);
      setModel(loadedModel);
      console.log("Model loaded.");
    };

    loadModel();
  }, []);

  const detect = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4 && model) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make a prediction through the model on our video frame.
      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [640, 480]);
      const casted = resized.cast('int32');
      const expanded = casted.expandDims(0);
      const obj = await model.predict(expanded);
      console.log(obj);
      
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    }
  };

  useEffect(() => {
    if (webcamActive) {
      const interval = setInterval(detect, 100);
      return () => clearInterval(interval);
    }
  }, [webcamActive, model]);

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
          <div className="flex flex-col items-center justify-center">
          <Webcam 
            ref={webcamRef} 
            className="z-10"
            style={{ 
              width: '400px', 
              height: '400px',
              transform: 'scaleX(-1)'
            }} 
          />
          <canvas 
            ref={canvasRef} 
            style={{
              width: '320px',
              height: '240px',
              position: 'absolute', 
              transform: 'scaleX(-1)' 
            }}
          />
        </div>
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
