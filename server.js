const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios'); // Import axios for making HTTP requests to the frontend
const Game = require('./models/Game');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Define the frontend deployed URL as an environment variable
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173/';

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Stone Paper Scissors API');
});

// Route to save game result
app.post('/api/game', async (req, res) => {
  console.log(res, req)
  try {
    const { userChoice, cmpChoice, result } = req.body;
    const game = new Game({ userChoice, cmpChoice, result });
    await game.save();
    
    // Make a POST request to the frontend with the game result
    await axios.get(`${FRONTEND_URL}/api/game`, { userChoice, cmpChoice, result });

    res.status(201).json({ success: true, message: 'Game result saved successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'An error occurred while saving the game result' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
