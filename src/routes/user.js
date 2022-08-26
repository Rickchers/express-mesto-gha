const express = require('express');
const { celebrate, Joi } = require('celebrate');

const userControllers = require('../controller/user');

const userRoutes = express.Router();

userRoutes.get('/', userControllers.getUsers);
userRoutes.get('/me', userControllers.getUserProfile);

userRoutes.get('/:id', celebrate({
  // валидируем параметры id
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), userControllers.getUserbyId);

userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), userControllers.updateUser);

userRoutes.patch('/me/avatar', celebrate({
  // валидируем параметры тела запроса
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), userControllers.updateUserAvatar);

module.exports = {
  userRoutes,
};
