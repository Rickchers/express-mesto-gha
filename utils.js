const errorCodes = require('./constants');

const errorMessage = (err, req, res) => {
  if (err.name === 'CastError') {
    res.status(errorCodes.BAD_REQUEST).send({
      message: 'Переданы некорректные данные',
    });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(errorCodes.BAD_REQUEST).send({
      message: 'Переданы некорректные данные',
    });
    return;
  }
  if (err.name === 'DocumentNotFoundError') {
    res.status(errorCodes.NOT_FOUND).send({
      message: 'Объект не найден',
    });
    return;
  }
  res.status(errorCodes.INTERNAL_SERVER_ERROR).send({
    message: err.message,
  });
};

module.exports = { errorMessage };
