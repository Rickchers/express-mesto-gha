const express = require('express');
const mongoose = require('mongoose');

const userControllers = require('./src/controller/user');
const auth = require('./src/middlewares/auth');

const { routes } = require('./src/routes/index');

const { PORT = 3000 } = process.env;

const app = express();

// подключаемся к серверу mongo
async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('Connected to db');

  await app.listen(PORT);
  console.log(`Server listen on port ${PORT}`);
}

main();

app.use(express.json());

app.post('/signin', userControllers.login);
app.post('/signup', userControllers.createUser);

// логирование методов запроса
app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)} ${JSON.stringify(req.user)}`);
  next();
});

app.use(auth);

app.use(routes);
