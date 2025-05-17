// const mongoose = require('mongoose');

// // Define the schema for feedback
// const feedbackSchema = new mongoose.Schema({
//   rating: { type: Number, required: true },
//   opinion: { type: String, required: true },
//   bookTitle: { type: String, required: true },
//   user: { type: String, required: true }, // Store the user's email or ID
// }, {
//   timestamps: true, // Optional, if you want to store the time of submission
// });

// // Create a model for the Feedback schema
// const Feedback = mongoose.model('Feedback', feedbackSchema);

// module.exports = Feedback;

const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  opinion: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
