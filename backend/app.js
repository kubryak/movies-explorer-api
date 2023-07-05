const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use((req, res, next) => {
  req.user = {
    _id: '64a5c0416335d5e37537bb56',
  };

  next();
});

app.use(express.json());

app.use(router);

app.listen(3000, () => {
  console.log('Слушаю порт 3000');
});