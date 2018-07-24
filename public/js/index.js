const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  /*
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  jQuery('#messages').append(li);
  */

  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', (message) => {
  /*
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">User location</a>');
  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
  */

  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url  
  });
  jQuery('#messages').append(html);
})

jQuery('#message-form').on('submit', (event) => {
  event.preventDefault();

  const messageTextBox = jQuery('[name=message');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, () => {
    messageTextBox.val('');
  });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by the browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location ...');
  navigator.geolocation.getCurrentPosition((Position) => {
    locationButton.removeAttr('disabled').text('Send location') ;
    socket.emit('createLocationMessage', {
      latitude: Position.coords.latitude,
      longitude: Position.coords.longitude,
      timestamp: Position.timestamp
    });
  }, (error) => {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
})