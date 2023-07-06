const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies')
const { validateMovieId, validateCreateMovie } = require('../middlewares/celebrate');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:_id', validateMovieId, deleteMovie);

module.exports = router;
