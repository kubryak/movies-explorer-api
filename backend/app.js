require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const { DB_URL } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({
  origin:
    [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://qqbrk.nomoredomains.work',
      'https://qqbrk.nomoredomains.work',
    ],
  credentials: true,
}));

mongoose.connect(DB_URL);

app.use(express.json());

// app.use(limiter);

app.use(cookieParser());

app.use(helmet());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`);
});
