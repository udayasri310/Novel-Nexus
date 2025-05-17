const express = require('express');
const Discussion = require('../models/discussionModel');
const router = express.Router();

// Get discussions for a book
router.get('/book/:bookId', async (req, res) => {
  try {
    const discussions = await Discussion.find({ bookId: req.params.bookId }).populate('userId', 'username');
    res.status(200).json(discussions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Post a new discussion comment
router.post('/', async (req, res) => {
  try {
    const { bookId, userId, content } = req.body;
    const newDiscussion = new Discussion({
      bookId,
      userId,
      content,
    });

    await newDiscussion.save();
    res.status(201).json(newDiscussion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
