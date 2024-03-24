import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes => minutes - 1);
          } else {
            clearInterval(interval);
            setIsActive(false);
          }
        } else {
          setSeconds(seconds => seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };


  const handleIncreaseTime = () => {
    setMinutes(minutes => minutes + 5);
  };

  const handleDecreaseTime = () => {
    if (minutes > 5) {
      setMinutes(minutes => minutes - 5);
    } else {
      setMinutes(0);
      setSeconds(0);
    }
  };

  return (
    <div className="countdown-timer">
      <div className="timer-container"> {/* New container */}
        <div className="timer">
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className="button-container">
          <button className="vertical-button" onClick={handleIncreaseTime}>+</button>
          <button className="vertical-button" onClick={handleDecreaseTime}>-</button>
        </div>
      </div>
      <button onClick={handleStartPause}>{isActive ? '❚❚' : '▶'}</button>
    </div>
  );
};


export default Timer;
