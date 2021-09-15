const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const storiesRouter = require('./stories.js');
const commentsRouter = require('./comments.js');
// const asyncHandler = require('express-async-handler');
// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
// const { User } = require('../../db/models');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/stories', storiesRouter);

router.use('/comments', commentsRouter);


module.exports = router;
