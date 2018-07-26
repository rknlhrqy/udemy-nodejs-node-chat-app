const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected to server');
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });

  //socket.emit('newMessage', generateMessage('Admin', 'Welcome!'));
  //socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user just joined'));

  socket.on('join', (params, callback) =>  {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name or Room Name is not qualified');
    } else {
      socket.join(params.room);

      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);
      io.to(params.room).emit('updateUserList', users.getUserList(params.room));

      socket.emit('newMessage', generateMessage('Admin', 'Welcome!'));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} just joined`));
      callback();
    }
  });

  socket.on('createMessage', (message, callback) => {
    console.log('create message', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    //socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    callback({
      ack: true,
      response: 'You message is received by server'
    });
  });

  socket.on('createLocationMessage', (message) => {
    io.emit('newLocationMessage',
      generateLocationMessage('Admin',
        message.latitude, message.longitude));
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
