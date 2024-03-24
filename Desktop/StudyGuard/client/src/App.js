// // import React, { useState } from 'react';
// // import io from 'socket.io-client';
// // import Webcam from './Webcam';


// // const socket = io('http://localhost:3001');

// // const App = () => {
// //   const [room, setRoom] = useState('');
// //   const [myName, setMyName] = useState('');
// //   // const [message, setMessage] = useState('');
// //   const [messages, setMessages] = useState([]);
  
// //   console.log(socket)

// //   const joinRoom = () => {
// //     socket.emit('joinRoom', room);
// //   };

// //   // const sendMessage = () => {
// //   //   socket.emit('chatMessage', room, message);
// //   //   setMessage('');
// //   // };

// //   socket.on('message', (msg) => {
// //     setMessages([...messages, msg]);
// //   });

// //   socket.on('distractedListener', (msg) => {
// //     setMessages([...messages, msg]);
// //   });

// //   const notifyFriends = () => {
// //     socket.emit('userDistracted', room, `${myName} is distracted`)
// //   };

// //   return (
// //     <div>
// //       <Webcam />
// //       <h1>Group Study Zone</h1>
// //       <input type="text" value={myName} onChange={(e) => setMyName(e.target.value)} placeholder="Enter your name" />
// //       <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Enter room name" />
// //       <button onClick={joinRoom}>Join Room</button>

// //   {/* <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter message" />
// //       <button onClick={sendMessage}>Send Message</button> */}
// //       <button onClick={notifyFriends}>Notify Friend</button>
// //       <ul>

// //       {messages.map((msg, index) => (
// //         <li key={index}>{msg}</li>
// //       ))}
// //     </ul>
// //   </div>
// // );
// // };

// // export default App;


// // import React, { useState } from 'react';
// // import io from 'socket.io-client';
// // import Webcam from './Webcam';

// // const socket = io('http://localhost:3001');

// // const App = () => {
// //   const [room, setRoom] = useState('');
// //   const [myName, setMyName] = useState('');
// //   const [messages, setMessages] = useState([]);

// //   console.log(socket)

// //   const joinRoom = () => {
// //     socket.emit('joinRoom', room);
// //   };

// //   socket.on('message', (msg) => {
// //     setMessages([...messages, msg]);
// //   });

// //   socket.on('distractedListener', (msg) => {
// //     setMessages([...messages, msg]);
// //   });

// //   return (
// //     <div>
// //       <Webcam socket={socket} room={room} />
// //       <h1>Group Study Zone</h1>
// //       <input type="text" value={myName} onChange={(e) => setMyName(e.target.value)} placeholder="Enter your name" />
// //       <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Enter room name" />
// //       <button onClick={joinRoom}>Join Room</button>
// //       <ul>
// //         {messages.map((msg, index) => (
// //           <li key={index}>{msg}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default App;

// import React, { useState, useEffect } from 'react'; // Import useEffect
// import io from 'socket.io-client';
// import Webcam from './Webcam';

// const socket = io('http://localhost:3001');

// const App = () => {
//   const [room, setRoom] = useState('');
//   const [myName, setMyName] = useState('');
//   const [messages, setMessages] = useState([]);

//   // Listen for join room and other messages
//   const joinRoom = () => {
//     socket.emit('joinRoom', room);
//   };

//   socket.on('distractedListener', (msg) => {
//     setMessages([...messages, msg]);
//   });


//   // useEffect(() => {
//   //   const handleNewMessage = (msg) => {
//   //     setMessages((prevMessages) => [...prevMessages, msg]);
//   //   };

//   //   // socket.on('message', handleNewMessage);
//   //   // socket.on('distractedListener', handleNewMessage);
//   //   socket.on('UserDistracted', handleNewMessage);

//   //   // Cleanup to avoid memory leaks and multiple listeners being attached
//   //   return () => {
//   //     socket.off('message', handleNewMessage);
//   //     socket.off('distractedListener', handleNewMessage);
//   //   };
//   // }, [socket]);

//   // // useEffect for handling 'userDistracted' events
//   // useEffect(() => {
//   //   const handleDistracted = (message) => {
//   //     console.log('message received');
//   //     setMessages((prevMessages) => [...prevMessages, message]);
//   //   };

//   //   socket.on('userDistracted', handleDistracted);
//   //   socket.on('distractedListener', handleDistracted);

//   //   // Cleanup to avoid memory leaks and multiple listeners being attached
//   //   return () => {
//   //     socket.off('userDistracted', handleDistracted);
//   //   };
//   // }, [socket]);

//   return (
//     <div>
//       <Webcam socket={socket} room={room} />
//       <h1>Group Study Zone</h1>
//       <input type="text" value={myName} onChange={(e) => setMyName(e.target.value)} placeholder="Enter your name" />
//       <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Enter room name" />
//       <button onClick={joinRoom}>Join Room</button>
//       <ul>
//         {messages.map((msg, index) => (
//           <li key={index}>{msg}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import io from 'socket.io-client';
import Webcam from './Webcam';

const socket = io('http://localhost:3001');

const App = () => {
  const [room, setRoom] = useState('');
  const [myName, setMyName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  console.log(socket)

  const joinRoom = () => {
    socket.emit('joinRoom', room);
  };

  const sendMessage = () => {
    socket.emit('chatMessage', room, message);
    setMessage('');
  };

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
      <h1>Group Study Zone</h1>
      <Webcam socket={socket} room={room} />
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