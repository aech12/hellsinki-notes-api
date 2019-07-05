const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const DB_USER = process.env.DB_USER,
  DB_PASS = process.env.DB_PASS,
  DB = 'helsinki-app';
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-mxckr.mongodb.net/${DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => console.log('DB connected'))
  .catch(e => console.error(console, 'connection error: ', e));
const db = mongoose.connection;

const notesSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
  date: Date
});
const Note = mongoose.model('Note', notesSchema);

// const firstNote = new Note({
//   content: 'doing it again',
//   date: new Date(),
//   important: true
// });
// firstNote.save().then(r=> function(err, firstNote) {
//   if (err) return console.error(err);
//   mongoose.connection.close();
// });

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
    mongoose.connection.close();
    res.json(notes);
  } catch (e) {
    res.status(404).json({ e: 'Could not find notes: ', e });
  }
});
app.post('/api/notes', async (req, res) => {
  if (!req.body) {
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
    mongoose.connection.close();
    res.status(200).json(newnote);
  } catch (e) {
    res.status(404).json('error: ', e);
  }
  res.json(notes);
});

app.get('/notes/:id', (req, res) => {
  // const id = Number(req.params.id);
  const id = req.params.id;
  Note.findById({ ObjectId: id }).then(r => console.log(r));
  mongoose.connection.close();
  // const note = notes.find(n => n.id === id);
  // if (note) {
  //   res.json(note);
  // } else {
  //   res.status(404).end();
  // }
});
app.put('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const newNotes = notes.map(n =>
    n.id !== id ? n : { ...n, important: !n.important }
  );
  notes = newNotes;
  res.json(notes);
});
app.delete('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const newNotes = notes.filter(n => n.id !== id);
  notes = newNotes;
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
