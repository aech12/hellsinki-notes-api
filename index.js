const { PORT, DB_URL } = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const router = express.Router();
const notesRouter = require('./controllers/notesRouter.js');
const {
  errorHandler,
  unknownEndpoint,
  reqLogger
} = require('./utils/middleware.js');
const mongoose = require('mongoose');

mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(() => console.log('DB connected'))
  .catch(e => console.error(console, 'Could not connect to DB: ', e));
mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./build'));
app.use('/', router);

app.get('/', (req, res) => {
  res.json('hi');
});

router
  .route('/api/notes')
  .get(notesRouter.getNotes)
  .post(notesRouter.postNotes);

router
  .route('/notes/:id')
  .get(notesRouter.getNote)
  .put(notesRouter.putNote)
  .delete(notesRouter.delNote);

app.use(errorHandler);
app.use(unknownEndpoint);
// app.use(reqLogger)

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
