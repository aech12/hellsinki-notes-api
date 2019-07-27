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
    password: 'pass1',
    name: 'First Fake'
  },
  {
    username: 'secondUser',
    password: 'pass2',
    name: 'Second Name'
  }
];

module.exports = { mockDb, usersMock };
