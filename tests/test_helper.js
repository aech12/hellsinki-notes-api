mockDb = [
  {
    content: 'first, unimportant',
    important: false
  },
  {
    content: 'second, important',
    important: true
  },
  {
    content: 'third, important',
    important: true
  }
];

usersMock = [
  {
    username: 'firstUser',
    passwordHash: 'pass1',
    name: 'First Fake'
  },
  {
    username: 'secondUser',
    passwordHash: 'pass2',
    name: 'Second Name'
  }
];

module.exports = { mockDb, usersMock };
