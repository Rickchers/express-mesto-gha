const express = require('express');

const { celebrate, Joi } = require('celebrate');

const cardControllers = require('../controller/card');

const cardRoutes = express.Router();

cardRoutes.get('/', cardControllers.getCards);

cardRoutes.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required(),
  }),
}), cardControllers.createCard);

cardRoutes.delete('/:id', celebrate({
  // валидируем параметры id
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), cardControllers.deleteCard);

cardRoutes.put('/:id/likes', celebrate({
  // валидируем параметры id
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), cardControllers.setLikeCard);

cardRoutes.delete('/:id/likes', celebrate({
  // валидируем параметры id
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), cardControllers.setDislikeCard);

module.exports = {
  cardRoutes,
};
