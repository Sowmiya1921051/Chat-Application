const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.json());

let users = [];

app.post('/login', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  users.push(username);
  return res.json({ success: true, username });
});

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('sendMessage', (messageData) => {
    console.log('Message received:', messageData);
    io.emit('receiveMessage', {
      ...messageData,
      timestamp: new Date().toLocaleTimeString(),
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => console.log('Server listening on port 3000'));
