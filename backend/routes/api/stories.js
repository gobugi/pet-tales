const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { Story, User, Comment } = require('../../db/models');

const router = express.Router();


// Get Stories
router.get('/', asyncHandler(async (req, res) => {
  const stories = await Story.findAll();
  res.json(stories);
}));


// // Get Comments for a Story
// router.get('/:id(\\d+)/comments/', asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   const comments = await Comment.findAll({
//     where: { storyId: +id }
//   });
//   res.json(comments);
// }));


// Get a Story
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const story = await Story.findByPk(id);
  return res.json(story)
}));


// Create a Story
router.post('/', asyncHandler(async function (req, res) {
    const story = await Story.create(req.body);
    return res.json(story)
    // return res.redirect(`/${story.id}`);
  })
);


// Edit a Story
router.put('/:id', asyncHandler(async (req, res) => {
  const storyId = req.params.id;
  const { imageUrl, title, body, authorId } = req.body;

  const storyEdit = await Story.findByPk(storyId);
  await storyEdit.update({ imageUrl, title, body, authorId })
  return res.json(storyEdit);
  }),
);



//Delete a Story
router.delete('/:id', asyncHandler(async (req, res) => {
  const storyId = req.params.id;
  const story = await Story.findByPk(storyId);

  await story.destroy();
  return res.json({})
}))




module.exports = router;
