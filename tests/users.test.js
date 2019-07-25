const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app.js');
const User = require('../models/userModel');
const helper = require('./test_helper');
const api = supertest(app);

describe('/api/users GET', () => {
  test('users match mockDb', async () => {
    jest.setTimeout(7000);
    const arr = await User.find({});
    console.log('arr', arr);
    expect(arr.length).toBe(helper.usersMock.length);
  });
});
describe('/api/users POST', () => {
  test('create a new user', async () => {
    await api.post('/api/users').send({
      username: 'postTest',
      password: 'postingT199',
      name: 'Testing Post'
    });
    const usersDb = await User.find({});
    expect(usersDb.map(user => user.username)).toContain('postTest');
  });
  test('user with invalid characters should not save', async () => {
    await api.post('/api/users').send({
      username: 'do nt"save!',
      password: 'dont',
      name: 'Not Saved'
    });
    const usersDb = await User.find({});
    expect(usersDb.map(user => user.username)).not.toContain('do nt"save!');
  });
});

beforeEach(async () => {
  const mockUsers = helper.usersMock.map(user => new User(user));
  const savedUsers = mockUsers.map(user => user.save());
  await Promise.all(savedUsers);
});
afterEach(async () => {
  await User.deleteMany({});
});
afterAll(() => {
  mongoose.connection.close();
});
