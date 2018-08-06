
class Users {
  constructor() {
    this.Users = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.Users.push(user);
    return user;
  }

  removeUser(id) {
    /*
    const index = this.Users.findIndex(user => user.id === id);
    if (index !== -1) {
      return this.Users.splice(index, 1);
    } else {
      return null;
    }
    */
    const user = this.Users.find(each => each.id === id);
    this.Users = this.Users.filter(each => each.id !== id);
    return user;
  }

  getUser(id) {
    return this.Users.find(user => user.id === id);
  }

  // Find the user from the list.
  findUser(name) {
    return this.Users.find(user => user.name === name) !== undefined;
  }

  // Return an array of user names.
  getUserList(room) {
    const users = this.Users.filter(user => user.room === room);
    return users.map(user => user.name);
  }

  // Return whether the user is the last one in his chat room.
  isLastUserInRoom(id) {
    const user = this.getUser(id);
    if (user) {
      const userListInRoom = this.Users.filter(each => each.room === user.room);
      return userListInRoom.length === 1;
    }
    return false;
  }
}

module.exports = {
  Users,
};
