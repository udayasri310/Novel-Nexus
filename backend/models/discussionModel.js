const mongoose = require('mongoose');

// Discussion Schema
const discussionSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  datePosted: { type: Date, default: Date.now },
}, { timestamps: true });

// Create Discussion Model
const Discussion = mongoose.model('Discussion', discussionSchema);
module.exports = Discussion;
