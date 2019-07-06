const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const Note = require('./models/noteSchema');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./build'));

let notes = [
  { content: 'first', id: 1, important: false },
  { content: 'second', id: 2, important: true },
  { content: 'third', id: 3, important: true }
];

app.get('/', (req, res) => {
  res.json('hi');
});

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find({}).map(note => {
      return note;
    });
    // mongoose.connection.close();
    res.json(notes);
  } catch (e) {
    res.status(404).json({ e: 'Could not find notes: ', e });
  }
});
app.post('/api/notes', async (req, res) => {
  if (!req.body.content) {
    res.status(400).json({ error: 'content missing' });
  }
  const { content, important, id } = req.body;
  const note = new Note({
    content,
    id,
    important: important || false,
    date: new Date()
  });
  try {
    const newnote = await note.save();
    // mongoose.connection.close();
    res.status(200).json(newnote);
  } catch (e) {
    res.status(404).json(e);
  }
});

app.get('/notes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    res.json(note);
  } catch (e) {
    res.json(`Could not find: ${e}`);
  }
});
app.put('/notes/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const note = await Note.findByIdAndUpdate(id);
    note.important = !note.important;
    const newnote = await Note.findByIdAndUpdate(id, note);
    res.json(newnote);
  } catch (e) {
    res.json(e);
  }

  // const {content, important} = req.body
  // const note = {
  //   content,
  //   important
  // }
  // try {
  //   const newnote = await Note.findByIdAndUpdate(id, note, {new: true});
  //   res.json(newnote);
  // } catch (e) {
  //   res.status(404).json(`Could not update: ${e}`);
  // }
});
app.delete('/notes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const delNote = await Note.findByIdAndRemove(id);
    res
      .status(402)
      .json(`Note "${delNote.content}" from ${delNote}" has been deleted.`);
  } catch (e) {
    res.json(`Could not find note: ${e}`);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
