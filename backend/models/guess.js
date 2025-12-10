const mongoose = require('mongoose');

const GuessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type1: { type: String},
  type2: { type: String},
  dex: { type: Number },
  bst: { type: Number },
  gen: { type: Number }
}, {
  timestamps: true
});

const Guess = mongoose.model('Guess', GuessSchema);

module.exports = Guess;
