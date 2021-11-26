const express = require('express');
const asyncHandler = require('express-async-handler');

const { Story, User, Like } = require('../../db/models');

const router = express.Router();


// Get Likes
router.get('/', asyncHandler(async (req, res) => {
  const likes = await Like.findAll();
  res.json(likes);
}));



// Get a Like
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const like = await Like.findByPk(id);
  res.json(like);
}));



// Create Like
router.post('/', asyncHandler(async (req, res) => {
  const newLike = await Like.create(req.body);
  return res.json(newLike)
  }),
);




//Delete Like
router.delete('/:id', asyncHandler(async (req, res) => {
  const likeId = req.params.id;
  const like = await Like.findByPk(likeId);

  await like.destroy();
  return res.json({})
}))



module.exports = router;
