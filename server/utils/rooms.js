class Rooms {
  constructor() {
    this.Rooms = [];
  }

  addRoom(createrName, roomName) {
    const room = { roomName, createrName };
    if (!this.findRoom(roomName)) {
      // If this room does not exist
      this.Rooms.push(room);
      return room;
    }
    // If this room already exists
    return this.getRoom(roomName);
  }

  findRoom(roomName) {
    return this.Rooms.find(room => room.roomName === roomName) !== undefined;
  }

  getRoom(roomName) {
    return this.Rooms.find(room => room.roomName === roomName);
  }

  removeRoom(roomName) {
    const room = this.Rooms.find(each => each.roomName === roomName);
    this.Rooms = this.Rooms.filter(each => each.roomName !== roomName);
    return room;
  }

  getRoomList() {
    return this.Rooms;
  }
}

module.exports = {
  Rooms,
};
