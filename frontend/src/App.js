import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Chat from './Chat';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/chat/:senderId" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;

// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const App = () => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const socket = io('http://localhost:8080');

//     socket.on('count', (newCount) => {
//       setCount(newCount);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const increaseCount = () => {
//     const socket = io('http://localhost:8080');
//     socket.emit('increaseCount');
//   };

//   return (
//     <div>
//       <h1>Ứng dụng Đếm</h1>
//       <p>Số đếm: {count}</p>
//       <button onClick={increaseCount}>Tăng</button>
//     </div>
//   );
// };

// export default App;
