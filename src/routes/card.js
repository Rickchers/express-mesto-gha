const express = require('express');

const validator = require('validator');

const { celebrate, Joi } = require('celebrate');

const cardControllers = require('../controller/card');

const cardRoutes = express.Router();

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation error');
};

cardRoutes.get('/', cardControllers.getCards);

cardRoutes.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required().custom(method),
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
