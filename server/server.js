const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected to server');
  });

  socket.emit('newEmailEvent', {
    from: 'mike@example.com',
    text: 'How is it going',
    createAt: 123
  });

  socket.on('emailFromClient', (email) => {
    console.log('Email received from client', email);
  });

});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
