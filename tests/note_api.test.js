const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app.js');
const Note = require('../models/noteModel');
const helper = require('./test_helper');

const api = supertest(app);

describe('/api/notes GET', () => {
  test('/get notes returned as json', async () => {
    jest.setTimeout(10000);
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('/get has specific note', async () => {
    const resp = await api.get('/api/notes');
    expect(resp.body.map(note => note.content)).toContain('first, unimportant');
  });
  test('/get notes have id', async () => {
    const resp = await api.get('/api/notes');
    expect(resp.body.map(note => note.id)).toBeDefined();
  });
  test('/get mock notes were saved correctly', async () => {
    let resp = await api.get('/api/notes').expect(200);
    expect(resp.body.length).toBe(helper.mockDb.length);
  });
});

describe('/api/notes POST', () => {
  test('/post note was added to the db', async () => {
    const newNote = await api
      .post('/api/notes')
      .send({ content: 'fourth' })
      .expect(200);
    resp = await api.get('/api/notes').expect(200);
    expect(newNote.body.important).toBe(false);
    expect(resp.body.length).toBe(helper.mockDb.length + 1);
    expect(resp.body.map(note => note.content)).toContain('fourth');
  });
  test('/post empty content wont save', async () => {
    let resp, resp2;
    await Promise.all([
      (resp = await api.get('/api/notes')),
      await api
        .post('/api/notes')
        .send({ important: true })
        .expect(400),
      (resp2 = await api.get('/api/notes'))
    ]);
    expect(resp2.body.length).toBe(resp.body.length);
  });
});

describe('/notes GET', () => {});
describe('/notes PUT', () => {
  test('/put impotance of note changes', async () => {
    const newNote = await api
      .post('/api/notes')
      .send({ content: 'put change', important: true });

    const newNoteChanged = await api.put(`/notes/${newNote.id}`);
    expect(newNoteChanged.body.important).not.toBe(newNote.body.important);
  });
});
describe('/notes DELETE', () => {
  test('/delete note gets deleted', async () => {
    resp = await api.get('/api/notes').expect(200);
    const id = resp.body[0].id;
    expect(id).toBeDefined();

    await api.delete(`/notes/${id}`).expect(204);
    resp2 = await api.get('/api/notes');
    expect(resp2.body.length).toBe(resp.body.length - 1);
  });
});

beforeEach(async () => {
  const newNotes = helper.mockDb.map(note => new Note(note));
  const savedNotesArray = newNotes.map(note => note.save());
  await Promise.all(savedNotesArray);
});
afterEach(async () => {
  await Note.deleteMany({});
});
afterAll(() => {
  mongoose.connection.close();
});
