/* global io */
const socket = io();

socket.on('updateRoomList', (rooms) => {
  const datalist = jQuery('<datalist></datalist>');
  rooms.forEach((room) => {
    datalist.append(jQuery('<option></option>').text(room.roomName));
  });
  jQuery('#room-list').html(datalist);
});
