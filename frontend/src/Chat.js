import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
const Chat = () => {
  const { senderId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = io("http://localhost:8080");
  const idUser = Cookies.get('idUser');
  const roomName = `room${idUser}${senderId}`;
  console.log(roomName);
  useEffect(() => {
    // Tham gia phòng chat
    socket.emit('joinRoom', roomName);

    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, idUser, senderId, roomName]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = {
        id: Date.now(),
        sender: idUser,
        receiver: senderId,
        text: newMessage,
      };

      socket.emit('sendMessage', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
    }
  };

  return (
    <div>
    <div className="chat-window">
      <div className="message-list">
        {messages.map((message) => (
          <div key={message.id}>
            <div className={`message ${message.sender === idUser ? 'sent' : 'received'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Gửi</button>
      </div>
    </div>
  </div>
  );
};

export default Chat;


