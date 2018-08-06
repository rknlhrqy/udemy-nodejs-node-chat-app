const expect = require('expect');
const { Users } = require('./users');

describe('Users class test', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.Users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course',
    }, {
      id: '2',
      name: 'Jack',
      room: 'React Course',
    }, {
      id: '3',
      name: 'Jean',
      room: 'Gardening Course',
    }, {
      id: '4',
      name: 'Smith',
      room: 'Node Course',
    }, {
      id: '5',
      name: 'Joey',
      room: 'Node Course',
    }];
  });

  it('should add new user', () => {
    const user = {
      id: '123',
      name: 'Andrew',
      room: 'The Office Fans',
    };

    users.addUser(user.id, user.name, user.room);
    expect(users.Users.pop()).toEqual(user);
  });

  it('should return names in chat room "Node Course"', () => {
    const userNameInNodeCourseRoom = users.getUserList('Node Course');
    expect(userNameInNodeCourseRoom).toContainEqual(users.Users[0].name);
    expect(userNameInNodeCourseRoom).toContainEqual(users.Users[3].name);
    expect(userNameInNodeCourseRoom).toContainEqual(users.Users[4].name);
    expect(userNameInNodeCourseRoom.length).toBe(3);
  });

  it('should remove one user', () => {
    const { length } = users.Users;
    users.removeUser('1');
    expect(users.Users.length).toBe(length - 1);
    expect(users.getUser('1')).toBeUndefined();
  });

  it('should not remove a user', () => {
    const userNum = users.Users.length;
    users.removeUser('-1');
    expect(users.Users.length).toBe(userNum);
  });

  it('should find the user', () => {
    const user = users.getUser('1');
    expect(users.Users).toContainEqual(user);
  });

  it('should not find the user', () => {
    const user = users.getUser('-1');
    expect(user).toBeUndefined();
  });
});
