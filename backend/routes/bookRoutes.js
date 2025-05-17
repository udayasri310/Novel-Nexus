const express = require('express');
const Book = require('../models/bookModel');
const router = express.Router();

// Get list of books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get book details by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, description, coverImage, goodreadsLink } = req.body;
    const newBook = new Book({
      title,
      author,
      genre,
      description,
      coverImage,
      goodreadsLink,
    });

    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
