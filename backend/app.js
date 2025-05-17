require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
// const discussionRoutes = require('./routes/discussionRoutes');
// const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// CORS setup
app.use(
  cors({
    origin: ['http://127.0.0.1:8081', 'http://192.168.43.57:8081', 'http://192.168.1.108:8081'], // Allow multiple frontend origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specified HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow Authorization header
    credentials: true, // Include credentials if needed
  })
);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
    console.log(`Connected to database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit the process with a failure code
  }
};

// Register Routes
app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes);
// app.use('/api/books', bookRoutes);
// app.use('/api/discussions', discussionRoutes);

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
connectDB();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
