const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const regex = /^http(s)?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },

  about: {
    type: String,
    // required: true,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: String,
    // required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => regex.test(value),
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

exports.User = mongoose.model('user', userSchema);
