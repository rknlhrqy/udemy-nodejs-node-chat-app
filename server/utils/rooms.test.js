const expect = require('expect');
const { Rooms } = require('./rooms');

describe('Rooms class test', () => {
  let rooms;

  beforeEach(() => {
    rooms = new Rooms();
    rooms.Rooms = [{
      roomName: 'LOTR',
      createrName: 'Andrew',
    }, {
      roomName: 'lotr',
      createrName: 'Jean',
    }, {
      roomName: 'X',
      createrName: 'Joy',
    }];
  });

  it('should add new chat room', () => {
    const newRoom = {
      roomName: 'Tea Party',
      createrName: 'Smith',
    };
    rooms.addRoom(newRoom.createrName, newRoom.roomName);
    expect(rooms.Rooms.pop()).toEqual(newRoom);
  });

  it('should remove one chat room', () => {
    const roomCount = rooms.Rooms.length;
    const roomRemoved = rooms.removeRoom(rooms.Rooms[0].roomName);
    expect(rooms.Rooms.length).toBe(roomCount - 1);
    expect(rooms.findRoom(roomRemoved.roomName)).toBeFalsy();
  });

  it('should not remove a chat room', () => {
    const roomCount = rooms.Rooms.length;
    const roomRemoved = rooms.removeRoom(rooms.Rooms[0].roomName.concat('1'));
    expect(rooms.Rooms.length).toBe(roomCount);
    expect(roomRemoved).toBeUndefined();
  });

  it('should find the chat room', () => {
    const roomToFind = rooms.getRoom(rooms.Rooms[0].roomName);
    expect(rooms.Rooms).toContainEqual(roomToFind);
  });

  it('should not find the chat room', () => {
    const roomToFind = rooms.findRoom(rooms.Rooms[0].roomName.concat('1'));
    expect(roomToFind).toBeFalsy();
  });
});
