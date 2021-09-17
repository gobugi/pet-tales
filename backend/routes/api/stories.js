const express = require('express');
const asyncHandler = require('express-async-handler');

const { Story } = require('../../db/models');

const router = express.Router();



// Get Story
router.get('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const story = await Story.findByPk(id);
  return res.json(story)
}));


router.get('/', asyncHandler(async (req, res) => {
  const stories = await Story.findAll();
  res.json(stories);
}));


// Create Story
router.post('/', asyncHandler(async (req, res) => {
    const { imageUrl, authorId, title, body } = req.body;
    const story = await Story.create({ imageUrl, authorId, title, body });
    return res.json(story);
  }),
);

// Edit a Story
router.put('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { imageUrl, authorId, title, body } = req.body;
  await Story.update({ imageUrl, authorId, title, body })
  const story = await Story.findByPk(id);
  return res.json(story)
}));

//Delete Story
router.delete('/:id', asyncHandler(async (req, res) => {
  const storyId = req.params.id;
  const story = await Story.findByPk(storyId);

  await Story.destroy({ where: { id: story.id } });
  const destroyed = story.id;
  return res.json({ destroyed })
}))

module.exports = router;
