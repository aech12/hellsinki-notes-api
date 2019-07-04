const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

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

app.get('/api/notes', (req, res) => {
  res.json(notes);
});
app.post('/api/notes', (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'content missing' });
  }
  const { content, important, id } = req.body;
  const note = {
    content,
    id,
    important: important || false,
    date: new Date()
  };
  notes = [...notes, note];
  res.json(notes);
});

app.get('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find(n => n.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
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
  s;
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
