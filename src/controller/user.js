const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const NotFoundError = require('../errors/not-found-err');
const ConflictRequest = require('../errors/conflicting-request');
const Badrequest = require('../errors/badrequest');
const Unauthorized = require('../errors/unauthorized');

const { User } = require('../models/user');

exports.getUsers = (req, res, next) => {
  User
    .find({})
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователи не найдены');
      }
      res.send({ data: user });
    })
    .catch(next);
};

exports.getUserbyId = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Нет пользователя с таким id');
      }
    })
    .catch(next);
};

exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};

exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.send(newUser);
    })
    .catch((err) => {
      if (err.code === 11000) {
        throw new ConflictRequest('Неправильные почта или пароль');
      }
    })
    .catch(next);
};

exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new Badrequest('Переданы некорректные данные');
      }
    })
    .catch(next);
};

exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new Badrequest('Переданы некорректные данные');
      }
    })
    .catch(next);
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      // ошибка аутентификации
      throw new Unauthorized('Неправильные почта или пароль');
    })
    .catch(next);
};
