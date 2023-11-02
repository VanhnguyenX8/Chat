import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { Server } from "socket.io";
import { initSocketIO } from './controllers/socket.js';
// dotenv.config({ path: './environment/.env.development' });


const app = express();


app.use(express.json());
app.use(cors({
  // origin: ["http://localhost:3000", "http://192.168.1.7:8080", "http://10.20.220.16:10.20.0.1", "http://192.168.43.23", "http://127.0.0.1:5500"],
  origin: true,
  methods: ["POST", "GET"],
  credentials: true
}));
const server = http.createServer(app);
const io = new Server(server,
  {
    cors: {
      origin: true,
      credentials: true,
    },
    allowEIO3: true,
  }
  );
  // khai bao connect
initSocketIO(io);
app.use(cookieParser());

app.use(authRoutes);

server.listen(8080, () => {
  console.log("running on 8080");
});

// import express from 'express';
// import http from 'http';
// import { Server } from "socket.io";
// import cors from 'cors';


// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: true,
//     credentials: true,
//   },
//   allowEIO3: true,
// });

// app.use(express.json());
// const corsOptions = {
//   origin: '*',
//   methods: ["POST", "GET"],
//   credentials: true,
// };
// app.use(cors(corsOptions));
// let count = 0; // Số đếm ban đầu

// // Xử lý kết nối của socket.io
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Gửi số đếm ban đầu cho người dùng khi họ kết nối
//   socket.emit('count', count);

//   // Xử lý sự kiện tăng số đếm
//   socket.on('increaseCount', () => {
//     count++; // Tăng số đếm
//     io.emit('count', count); // Gửi số đếm mới cho tất cả người dùng
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// server.listen(8080, () => {
//   console.log('Server is running on port 8080');
// });
