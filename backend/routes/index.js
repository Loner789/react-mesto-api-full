const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');
const { auth } = require('../middlewares/auth');
const { login, logout, createUser } = require('../controllers/users');
const { loginValidation, userValidation } = require('../middlewares/validation');

router.post('/signin', loginValidation, login);
router.post('/signup', userValidation, createUser);
router.post('/logout', logout);

router.use(auth);
router.use(userRouter);
router.use(cardRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
