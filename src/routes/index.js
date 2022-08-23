const express = require('express');
const { userRoutes } = require('./user');
const { cardRoutes } = require('./card');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

routes.use('*', (req, res) => {
  res.status(404).send({ message: 'Ресурс по указанному адресу не найден' });
});

module.exports = { routes };
