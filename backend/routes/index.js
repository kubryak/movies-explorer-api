const router = require('express').Router();
const userRoutes = require('./users');
const movieRouter = require('./movies');

router.use('/users', userRoutes);
router.use('/movies', movieRouter);

module.exports = router;