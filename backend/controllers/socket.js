import db from '../config/dbConfig.js';

export function initSocketIO(io) {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (roomName) => {
      socket.join(roomName);
      console.log(`User joined room: ${roomName}`);
    });

    socket.on('sendMessage', (message) => {
      const sql = 'INSERT INTO chat_messages (sender, receiver, text) VALUES (?, ?, ?)';
      const values = [message.sender, message.receiver, message.text];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error saving message: ' + err.message);
        } else {
          const roomName = `room${message.sender}${message.receiver}`;
          io.to(roomName).emit('newMessage', message);
        }
      });
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
}
