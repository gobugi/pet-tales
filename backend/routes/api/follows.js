const express = require('express');
const asyncHandler = require('express-async-handler');

const { User, Follow } = require('../../db/models');

const router = express.Router();


// Get Follows
router.get('/', asyncHandler(async (req, res) => {
  const follows = await Follow.findAll();
  res.json(follows);
}));



// Get a Follow
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const follow = await Follow.findByPk(id);
  res.json(follow);
}));



// Create Follow
router.post('/', asyncHandler(async (req, res) => {
  const newFollow = await Follow.create(req.body);
  return res.json(newFollow)
  }),
);



//Delete Comment
router.delete('/:id', asyncHandler(async (req, res) => {
  const followId = req.params.id;
  const follow = await Follow.findByPk(followId);

  await follow.destroy();
  return res.json({})
}))



module.exports = router;
