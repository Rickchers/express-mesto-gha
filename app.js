const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
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

const PUBLIC_FOLDER = path.join(__dirname, 'public');

app.use(express.static(PUBLIC_FOLDER));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

app.use((req, res, next) => {
  req.user = {
    _id: '62f8f8921c88e1d945c4f58d',
  };

  next();
});

app.use(routes);
