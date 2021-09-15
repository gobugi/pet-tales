const express = require('express');
const asyncHandler = require('express-async-handler');

const { Comment } = require('../../db/models');

const router = express.Router();


// Create Comment
router.post('/', asyncHandler(async (req, res) => {
    const { userId, storyId, body } = req.body;
    const comment = await Comment.create({ userId, storyId, body });
    return res.json({ comment });
  }),
);

// Edit Comment
router.put('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { userId, storyId, body } = req.body;
  await Comment.update({ userId, storyId, body })
  const comment = await Comment.findByPk(id);
  return res.json(comment)
}));

//Delete Comment
router.delete('/:id', asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const comment = await Comment.findByPk(commentId);
  if (!comment) return res.status(404).json({});

  await Comment.destroy({ where: { id: comment.id } });
  const destroyed = comment.id;
  return res.json({ destroyed })
}))

module.exports = router;
