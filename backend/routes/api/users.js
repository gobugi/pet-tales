const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Story } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);


//Get a user

router.get('/:id(\\d+)', asyncHandler(async(req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id)
  res.json(user)
}));

// Get Users

router.get('/', asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.json(users);
}));


// Get Stories for a User
router.get('/:id(\\d+)/stories/', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const stories = await Story.findAll({
    where: { authorId: +id }
  });
  res.json(stories);
}));



module.exports = router;
