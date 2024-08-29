// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const dotenv = require('dotenv');
const questionsRouter = require('./routes/Questions');

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/questions', questionsRouter);

// Root Route
app.get('/', (req, res) => {
  res.send('MERN Server is running');
});

// Connect to MongoDB and Start Server
mongoose
  .connect('mongodb+srv://vikas:vikas965@usercluster.1vweadr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:5000`)
    );
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
