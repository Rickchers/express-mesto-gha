const express = require('express');
const userControllers = require('../controller/user');

const userRoutes = express.Router();

userRoutes.get('/', userControllers.getUsers);
userRoutes.get('/:id', userControllers.getUserbyId);
userRoutes.post('/', userControllers.createUser);
userRoutes.patch('/me', userControllers.updateUser);
userRoutes.patch('/me/avatar', userControllers.updateUserAvatar);

module.exports = {
  userRoutes,
};
