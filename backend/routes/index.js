const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const userRoutes = require('./users');
const movieRouter = require('./movies');
const { login, createUser, logout } = require('../controllers/users');
const { NotFoundError } = require('../utils/errors/errors');
const { validateLoginUser, validateCreateUser } = require('../middlewares/celebrate');

router.use('/signin', validateLoginUser, login);
router.use('/signup', validateCreateUser, createUser);
router.use('/signout', logout);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
