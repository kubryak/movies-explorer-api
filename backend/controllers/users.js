const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ValidationError, CastError } = require('mongoose').Error;
const {
  NotFoundError, BadRequestError, ConflictingRequestError, UnauthorizedError,
} = require('../utils/errors/errors');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUserById = (req, res, next) => {
  const userId = req.params.id ? req.params.id : req.user._id;

  User.findById(userId)
    .orFail(new NotFoundError('Пользователь по указанному id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Переданы некорректные данные при поиске пользователя по id'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { password } = req.body;

  bcrypt.hash(String(password), 10)
    .then((hash) => User.create({ ...req.body, password: hash }))
    .then((user) => {
      const {
        _id, name, email,
      } = user;
      return res.status(201).send({
        _id, name, email,
      });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictingRequestError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Пользователь с указанным id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(new UnauthorizedError('Неверный логин или пароль'))
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonWebToken.sign({
              _id: user._id,
            }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
            res.cookie('jwt', jwt, {
              maxAge: 3600 * 24 * 7,
              httpOnly: true,
              sameSite: true,
            });
            res.send({ jwt });
          } else {
            throw new UnauthorizedError('Неверный логин или пароль');
          }
        })
        .catch(next);
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Осуществлен выход с сайта' });
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  login,
  logout,
};
