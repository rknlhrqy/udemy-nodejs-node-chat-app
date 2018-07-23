const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

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

  socket.emit('newMessage', generateMessage('Admin', 'Welcome!'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user just joined'));
 
  socket.on('createMessage', (message) => {
    console.log('create message', message);

    /*
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
    */
    socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
  });

});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
