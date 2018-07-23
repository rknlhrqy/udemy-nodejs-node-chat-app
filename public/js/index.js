const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('emailFromClient', {
    to: 'jen@example.com',
    text: 'How are you doing?'
  });

});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newEmailEvent', (email) => {
  console.log('New email comes from server', email);
})