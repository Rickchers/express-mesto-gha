const { User } = require('../models/user');

exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

exports.getUserbyId = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
};

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.send(user);
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
