const mongoose = require('mongoose');

// Book Schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  coverImage: { type: String },  // URL to the cover image
  goodreadsLink: { type: String }, // Link to the book's Goodreads page
}, { timestamps: true });

// Create Book Model
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
