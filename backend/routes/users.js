const router = require('express').Router();
const { getUserById, updateUser } = require('../controllers/users');
const { validateUserInfo } = require('../middlewares/celebrate');

router.get('/me', getUserById);
router.patch('/me', validateUserInfo, updateUser);

module.exports = router;
