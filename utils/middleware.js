const errorHandler = (e, req, res, next) => {
  if (e.name === 'CastError' && e.kind == 'ObjectId') {
    return res.status(400).send({ error: `malformatted id, ${e.message}` });
  } else if (e.name === 'ValidationError') {
    return res.status(400).json({ error: e.message });
  }
  console.error('Error caught by errorHandle: ', e);
  next(e);
};

module.exports = errorHandler;