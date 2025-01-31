// models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  userChoice: String,
  cmpChoice: String,
  result: String,
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
