const socket = io();


socket.on('connect', () => {
  const params = jQuery.deparam(window.location.search);
  socket.emit('join', params, (error) => {
    if (error) {
      alert(error);
      //Go back to login page
      //window.location.href = '/';
      window.location.assign('/');
    } else {
      console.log('Go to chat page');
    }
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('updateUserList', (users) => {
  const ol = jQuery('<ol></ol>');
  users.forEach((user) => {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

const scrollToBottom = () => {
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');

  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= clientHeight) {
    messages.scrollTop(scrollHeight);
  }
};

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
  scrollToBottom();
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
  scrollToBottom();
});

jQuery('#message-form').on('submit', (event) => {
  event.preventDefault();

  const messageTextBox = jQuery('[name=message');
  socket.emit('createMessage', {
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