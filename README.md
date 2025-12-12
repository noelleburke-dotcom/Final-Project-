# Final-Project-
A new and improved Pokedle!

This game is for all Pokemon fans! Test your knowledge guessing the pokemon. The old version I have played only went to gen 1. This version goes all the way to gen 9.

URLS here

Backend API with CRUD operations
Responsive UI 
Data stored in MongoDB
Uses PokeAPI

To play the game the code calls a function that generates a random pokemon from the PokeAPI. The function has a list of excluded Pokemon so that only unique Pokemon are included.

SCREENSHOTS here

File Structure
Final Project 
    /backend
        /models
            /guess
        /nodes
        .env
        .gitignore
        package-lock.json
        package.json
        server.js
    /frontend
        /node_modules
        /public
        /src
            /assets
            /components
                /game.jsx
                /gameJsx.css
                /gameLogic.jsx
            App.jsx
            index.css
            index.html
            main.jsx
            .env
            .gitignore
            enlist.config.js
        package-lock.json
        package.json
        README.md

The front end submits the guess. The guess is formatted and compared to the current Pokemon. The guess is also stored in MongoDB with a Mongoose model. Once the guess is compared the tiles are styled accordingly.

git clone 
cd Final-Project-

cd frontend 
npm install
npm run dev

cd backend
npm install
npm start

backend runs on http://localhost:3000
frontend runs on http://localhost:5173

Post 
const mongoose = require('mongoose');

const GuessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type1: { type: String},
  type2: { type: String},
  dex: { type: Number },
  bst: { type: Number },
  gen: { type: Number },
  sessionId: {type: String}
}, {
  timestamps: true
});

const Guess = mongoose.model('Guess', GuessSchema);

module.exports = Guess;

Deployed from
Frontend
Netlify

Backend
Render

Video Link 


Reflection
The hardest part was the logic behind the Pokemon generator. Figuring out how to exclude the specific kinds of Pokemon was difficult. After asking my Professor she said there are built in math functions. Once the logic of which Pokemon to include was done it was a bit easier to put the function together.
I am really proud of how far I have come since the 3rd lab. I reused lots of code from that project for this final project.
Maybe thinking of a more impressive project is what I would do differntly. This Pokedle doesn't have much in means of backend implementation. All the backend does is store guesses from previous games. If I had more time I would add a way to track previous games. I had planned to store stats from previous games but I ran out of time.

I used ChatGPT for this project. I had millions of questions and I was unable to go to office hours. I tried to not have ai make my project for me. I wanted to show what I can do. I used ai for debugging and errors I had. Game logic was a huge problem for me so I had ChatGPT explain and help with it. I wanted explainations for issues I had as well. Here are the links to the conversations
https://chatgpt.com/share/693b5dd9-b190-8008-a10a-7be0f3072e01
https://chatgpt.com/share/693b5dff-9310-8008-b328-115191962d56
https://chatgpt.com/share/693b5e26-d990-8008-8a88-13df4acfe48c
https://chatgpt.com/share/693c7477-f998-8008-8542-ea3b1e0d5bd4