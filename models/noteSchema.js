const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_URL;

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log('DB connected'))
  .catch(e => console.error(console, 'Could not connect to DB: ', e));
mongoose.set('useFindAndModify', false);

const notesSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
  date: Date
});
notesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Note = mongoose.model('Note', notesSchema);

module.exports = Note;
