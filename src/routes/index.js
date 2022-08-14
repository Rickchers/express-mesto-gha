const express = require('express');
const { userRoutes } = require('./user');
const { cardRoutes } = require('./card');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

module.exports = { routes };
