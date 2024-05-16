import React, { useState, useEffect } from 'react';

const Timer = ({ isActive, onTimeComplete, onTimeUpdate }) => {
  const [totalSeconds, setTotalSeconds] = useState(1500); // 25 minutes

  const formatTime = () => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    let interval = null;
    if (isActive && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds(prev => {
          const newTotalSeconds = prev - 1;
          if (onTimeUpdate) {
            onTimeUpdate(newTotalSeconds);
          }
          return newTotalSeconds;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, totalSeconds, onTimeUpdate]);

  useEffect(() => {
    if (totalSeconds === 0) {
      if (onTimeComplete) {
        onTimeComplete();
      }
    }
  }, [totalSeconds, onTimeComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const increaseTime = () => {
    setTotalSeconds(prev => prev + 300); // Increase by 5 minutes
  };

  const decreaseTime = () => {
    setTotalSeconds(prev => (prev >= 300 ? prev - 300 : prev)); // Decrease by 5 minutes
  };

  return (
    <div className="timer-container flex items-center justify-center">
      <div className="flex flex-row items-center">
        <div id="timer" className="text-white text-7xl">
          {formatTime()}
        </div>
        <div className="timer-buttons flex flex-col ml-4 space-y-2">
          <button className="bg-white hover:bg-rose-400 hover:text-white text-purple-100 font-bold py-1 px-3 rounded" onClick={increaseTime}>+</button>
          <button className="bg-white hover:bg-rose-400 hover:text-white text-purple-100 font-bold py-1 px-3 rounded" onClick={decreaseTime}>-</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
