const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('./constants');

const errorMessage = (err, req, res) => {
  if (err.name === 'CastError') {
    res.status(BAD_REQUEST).send({
      message: 'Переданы некорректные данные',
    });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(BAD_REQUEST).send({
      message: 'Переданы некорректные данные',
    });
    return;
  }
  if (err.name === 'DocumentNotFoundError') {
    res.status(NOT_FOUND).send({
      message: 'Объект не найден',
    });
    return;
  }
  res.status(INTERNAL_SERVER_ERROR).send({
    message: err.message,
  });
};

module.exports = { errorMessage };
