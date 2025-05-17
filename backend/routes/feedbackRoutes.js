// const express = require('express');
// const router = express.Router();
// const Feedback = require('../models/Feedback');
// const { verifyToken } = require('../middleware/auth'); // Use centralized verifyToken middleware

// // POST endpoint to submit feedback
// router.post('/feedback', verifyToken, async (req, res) => {
//   try {
//     const { rating, opinion, bookTitle } = req.body;
//     if (!rating || !opinion || !bookTitle) {
//       return res.status(400).send({ message: 'All fields are required!' });
//     }

//     const feedback = new Feedback({
//       rating,
//       opinion,
//       bookTitle,
//       userId: req.user.userId, // Use userId from decoded token
//     });

//     await feedback.save();
//     res.status(200).send({ message: 'Feedback submitted successfully' });
//   } catch (error) {
//     console.error('Error submitting feedback:', error);
//     res.status(500).send({ message: 'Error submitting feedback' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const authenticateToken = require('../middleware/auth');

// POST Feedback
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { rating, opinion } = req.body;
    if (!rating || !opinion) {
      return res.status(400).send({ message: 'Rating and opinion are required!' });
    }

    const feedback = new Feedback({
      rating,
      opinion,
      userId: req.userId, // Use the userId from the token
    });

    await feedback.save();
    res.status(200).send({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).send({ message: 'Error submitting feedback' });
  }
});

module.exports = router;
