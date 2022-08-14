const { User } = require('../models/user');

const ERROR_CODE = 400;

exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

exports.getUserbyId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_CODE).send({
        message: 'Запрашиваемый пользователь не найден',
      });
    }
    console.error(`ОШИБКА ${err.name}`);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE).send({
        message: 'Получены неверные данные',
      });
    }
    console.error(`ОШИБКА ${err.name}`);
  }
};

exports.updateUser = async (req, res) => {
  const { name, about } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, { name, about });
  res.send(user);
};

exports.updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, { avatar });
  res.send(user);
};
