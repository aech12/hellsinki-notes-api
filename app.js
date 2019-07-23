const { PORT, DB_URL } = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const router = express.Router();
const notesRouter = require('./controllers/notesRouter.js');
// const usersRouter = require('./controllers/usersRouter.js');
const {
  errorHandler,
  unknownEndpoint,
  reqLogger
} = require('./utils/middleware.js');
const mongoose = require('mongoose');
const { info: logInfo, error: logError } = require('./utils/logger');

logInfo('Connecting to DB: ', DB_URL);
mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(() => logInfo('DB connected'))
  .catch(e => logError(console, 'Could not connect to DB: ', e));
mongoose.set('useFindAndModify', false);

app.use(cors());
app.use(express.static('./build'));
app.use(bodyParser.json());
app.use(reqLogger);
app.use('/', router);

router.route('/').get((req, res) => {
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

// router
//   .route('/api/users')
//   .get(usersRouter.getUsers)
//   .post(usersRouter.postUser);

app.use(unknownEndpoint);
app.use(errorHandler);

// dont app.listen(PORT) here or supertest gets error msg
// app.listen(PORT, () => {
//   // logInfo('listen:', PORT);
//   // logInfo('asifhaisof');

//   console.log('listen:', PORT);
// });
module.exports = app;
