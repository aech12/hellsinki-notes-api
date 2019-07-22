const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app.js');
const Note = require('../models/noteModel');
const helper = require('./test_helper');

const api = supertest(app);

describe('/api/notes', () => {
  test('/get notes returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('/get has specific note', async () => {
    const resp = await api.get('/api/notes');
    expect(resp.body.map(note => note.content)).toContain(
      'first mock note, unimportant'
    );
  });
});

describe('/note', () => {
  test('/post adds note', async () => {
    let resp = await api.get('/api/notes');
    expect(resp.body.length).toBe(helper.mockDb.length);
    await api
      .post('/api/notes')
      .send({ content: 'third', important: true })
      .expect(200);
    resp = await api.get('/api/notes');
    expect(resp.body.length).toBe(helper.mockDb.length + 1);
    expect(resp.body.map(note => note.content)).toContain('third');
  });
  test('/post empty content wont save', async () => {
    let resp = await api.get('/api/notes');
    await api
      .post('/api/notes')
      .send({ important: true })
      .expect(400);
    const resp2 = await api.get('/api/notes');
    expect(resp2.body.length).toBe(resp.body.length);
  });
});

beforeEach(async () => {
  await Note.deleteMany({});

  const newNotes = helper.mockDb.map(note => new Note(note));
  const savedNotes = newNotes.map(note => note.save());
  await Promise.all(savedNotes);
});
afterAll(() => {
  // app.close();
  mongoose.connection.close();
});
