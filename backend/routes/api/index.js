const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const storiesRouter = require('./stories.js');
const commentsRouter = require('./comments.js');
// const asyncHandler = require('express-async-handler');
// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
// const { User } = require('../../db/models');
// const express = require('express');
const { sequelize } = require('../../db/models');
const { Story } = require('../../db/models');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/stories', storiesRouter);

router.use('/comments', commentsRouter);



router.get('/', async(req, res, next) => {

  const stories = await Story.findAll({
    order: sequelize.random(),
    limit: 4
  });

  res.render('index', {
    title: "Pet-Tales",
    stories
  });
});

module.exports = router;
