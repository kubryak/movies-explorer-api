const router = require('express').Router();
const { getMovies, createMovie } = require('../controllers/movies')

router.get('/', getMovies);

router.post('/', createMovie);

module.exports = router;