const mongoose = require('mongoose');

const url = process.env.DB_URL;

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log('DB connected'))
  .catch(e => console.error(console, 'Could not connect to DB: ', e));
mongoose.set('useFindAndModify', false);

const notesSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  important: {
    type: Boolean,
    required: true
  },
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
