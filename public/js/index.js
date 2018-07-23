const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('New message', message);

  const li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
})

socket.on('newLocationMessage', (message) => {
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">User location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', (event) => {
  event.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, () => {
    console.log('Button clicked.');
  });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by the browser');
  }
  navigator.geolocation.getCurrentPosition((Position) => {
    console.log(Position);
    socket.emit('createLocationMessage', {
      latitude: Position.coords.latitude,
      longitude: Position.coords.longitude,
      timestamp: Position.timestamp
    });
  }, (error) => {
    alert('Unable to fetch location');
  });
})