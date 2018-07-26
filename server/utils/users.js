
class Users {
  constructor() {
    this.Users = [];
  }

  addUser (id, name, room) {
    const user = {id, name, room};
    this.Users.push(user);
    return user;
  }

  removeUser (id) {
    /*
    const index = this.Users.findIndex(user => user.id === id);
    if (index !== -1) {
      return this.Users.splice(index, 1);
    } else {
      return null;
    }
    */
    const user = this.Users.find(user => user.id === id);
    this.Users = this.Users.filter(user => user.id !== id);
    return user;
  }

  getUser (id) {
    return this.Users.find(user => user.id === id);
  }

  // Return an array of user names.
  getUserList (room) {
    const users = this.Users.filter(user => user.room === room);
    return users.map(user => user.name);
  }
}

module.exports = {
  Users
};