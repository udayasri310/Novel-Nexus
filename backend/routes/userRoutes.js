// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// // Register route
// router.post('/register', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(201).json({ message: 'User registered successfully',
//       token,
//       user: {
//         id: newUser._id,
//         email: newUser.email,
//       },
//      });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).json({ message: 'Something went wrong during registration' });
//   }
// });

// // Login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(404).send({ message: 'User not found!' });
//   }

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) {
//     return res.status(400).send({ message: 'Password mismatch' });
//   }

//   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.status(200).send({
//     message: 'Login successful',
//     token,
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//     },
//   });
// });

// router.get('/verify-token', (req, res) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).send({ message: 'Token missing' });

//   jwt.verify(token, process.env.JWT_SECRET, (err) => {
//     if (err) return res.status(403).send({ message: 'Token invalid or expired' });
//     res.status(200).send({ message: 'Token valid' });
//   });
// });

// module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Something went wrong during registration' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Login attempt: ${email}`); // Debugging

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found!' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send({ message: 'Password mismatch' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    console.log(`Login successful for ${email}, token generated`); // Debugging

    res.status(200).send({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'Something went wrong during login' });
  }
});

// Token verification route
router.get('/verify-token', (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract Bearer token
  if (!token) return res.status(401).json({ message: 'Token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token invalid or expired' });
    res.status(200).json({ message: 'Token valid', userId: decoded.userId });
  });
});


module.exports = router;
