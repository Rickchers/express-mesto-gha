const { Card } = require('../models/card');

exports.getCards = async (req, res) => {
  const cards = await Card.find({});
  res.send(cards);
};

exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const card = await Card.create({ name, link, owner: req.user._id });
  res.send(card);
};

exports.deleteCard = async (req, res) => {
  const card = await Card.findByIdAndRemove(req.params.id);
  res.send(card);
};

exports.setLikeCard = async (req, res) => {
  const card = await Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  );
  res.send(card);
};

exports.setDislikeCard = async (req, res) => {
  const card = await Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  );
  res.send(card);
};
