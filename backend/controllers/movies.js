const Movie = require('../models/movie');

const getMovies = (req, res) => {
  Movie.find({})
    .then((movie) => res.status(200).send(movie))
    .catch((err) => res
      .status(500)
      .send({
        message: 'Internal Server Error',
        err: err.message,
      }));
};

const createMovie = (req, res) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при создании фильма',
          });
      } else {
        res
          .status(500)
          .send({
            message: 'Internal Server Error',
          });
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
};
