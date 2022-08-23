const { Card } = require('../models/card');
const { errorMessage } = require('../../utils');

exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res));
};

exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res));
};

exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res));
};

exports.setLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res));
};

exports.setDislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res));
};
