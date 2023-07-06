const { celebrate, Joi } = require('celebrate');
const { regexImageLink } = require('../utils/constants');

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(regexImageLink),
    trailerLink: Joi.string().regex(regexImageLink),
    thumbnail: Joi.string().regex(regexImageLink),
    movieId: Joi.number().required(),
    nameRu: Joi.string().required(),
    nameEn: Joi.string().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().length(24),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const validateLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports = {
  validateCreateMovie,
  validateMovieId,
  validateUserInfo,
  validateLoginUser,
  validateCreateUser,
};
