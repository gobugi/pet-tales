const express = require('express');
const asyncHandler = require('express-async-handler');

const { Story, User, Comment } = require('../../db/models');

const router = express.Router();


// Get Comments
router.get('/', asyncHandler(async (req, res) => {
  const comments = await Comment.findAll();
  res.json(comments);
}));



// Get a Comment
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const comment = await Comment.findByPk(id);
  res.json(comment);
}));



// Create Comment
router.post('/', asyncHandler(async (req, res) => {
  const newComment = await Comment.create(req.body);
  return res.json(newComment)
  }),
);



// Edit Comment
router.put('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { userId, storyId, body } = req.body;

  const commentEdit = await Comment.findByPk(id);
  await commentEdit.update({ userId, storyId, body })
  return res.json(commentEdit);
}));



//Delete Comment
router.delete('/:id', asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const comment = await Comment.findByPk(commentId);

  await comment.destroy();
  return res.json({})
}))



module.exports = router;
