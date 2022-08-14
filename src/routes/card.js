const express = require('express');
const cardControllers = require('../controller/card');

const cardRoutes = express.Router();

cardRoutes.get('/', cardControllers.getCards);
cardRoutes.post('/', cardControllers.createCard);
cardRoutes.delete('/:id', cardControllers.deleteCard);
cardRoutes.put('/:id/likes', cardControllers.setLikeCard);
cardRoutes.delete('/:id/likes', cardControllers.setDislikeCard);

module.exports = {
  cardRoutes,
};
