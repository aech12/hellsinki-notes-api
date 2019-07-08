const Note = require('../models/noteModel');

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({}).map(note => {
      return note;
    });
    // mongoose.connection.close();
    res.json(notes);
  } catch (e) {
    res.status(404).json({ e: `Could not find notes: ${e}` });
  }
};

const postNotes = async (req, res, next) => {
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
  console.log(note);
  try {
    const newnote = await note.save();
    // console.log('newnote', newnote);
    // mongoose.connection.close();
    res.status(200).json(newnote);
  } catch (e) {
    next(e);
  }
};

const getNote = async (req, res, next) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    res.json(note);
  } catch (e) {
    next(e);
    // res.json(`Could not find: ${e}`);
  }
};

const putNote = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await Note.findById(id);
    console.log('note: ', note);
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
};

const delNote = async (req, res) => {
  const id = req.params.id;
  try {
    const delNote = await Note.findByIdAndRemove(id);
    res.status(402).json(`Deleted note "${delNote.content}" from ${delNote}".`);
  } catch (e) {
    res.json(`Could not find note: ${e}`);
  }
};

module.exports = { getNotes, postNotes, getNote, putNote, delNote };
