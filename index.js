const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { PORT } = require('./utils/config');
const errorHandler = require('./utils/middleware.js');
const router = express.Router();
const notesRouter = require('./controllers/notesRouter.js');

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

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
