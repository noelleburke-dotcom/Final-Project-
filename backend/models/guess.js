const mongoose = require('mongoose');
const guessSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim: true
    }
},{
    timestamps:true

});
const Guess = mongoose.model('Guess', guessSchema);

module.exports = Guess;
