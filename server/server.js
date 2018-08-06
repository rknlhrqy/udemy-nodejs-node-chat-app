const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const { Rooms } = require('./utils/rooms');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();
const rooms = new Rooms();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  debugger;
  console.log('New user connected');

  socket.emit('updateRoomList', rooms.getRoomList());

  socket.on('disconnect', () => {
    let lastUserInRoom = false;
    console.log('Client disconnected to server');

    // Check whether the user is the last on in his chat room.
    if (users.isLastUserInRoom(socket.id)) {
      lastUserInRoom = true;
    }
    const user = users.removeUser(socket.id);
    if (user && !lastUserInRoom) {
      // If the user is not the last one in his chat room,
      // just remove him from the chat room.
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    } else if (user && lastUserInRoom) {
      // If the user is the last one in his chat room,
      // remove the chat room.
      rooms.removeRoom(user.room);
      io.emit('updateRoomList', rooms.getRoomList());
    }
  });

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name or Room Name is not qualified');
    } else if (!users.findUser(params.name)) {
      // This user does not already exists.
      socket.join(params.room);

      rooms.addRoom(params.name, params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);
      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      io.emit('updateRoomList', rooms.getRoomList());

      socket.emit('newMessage', generateMessage('Admin', 'Welcome!'));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} just joined`));
      callback();
    } else {
      // This user already exists!
      callback('User already exists!');
    }
  });

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback({
      ack: true,
      response: 'You message is received by server',
    });
  });

  socket.on('createLocationMessage', (message) => {
    const user = users.getUser(socket.id);
    if (user && message.latitude !== null && message.longitude !== null) {
      io.to(user.room).emit('newLocationMessage',
        generateLocationMessage(user.name,
          message.latitude, message.longitude));
    }
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
