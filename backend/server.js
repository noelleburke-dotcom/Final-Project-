require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));

const Guess = require("./models/guess");

app.post("/api/guess", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Pokemon name is required" });


    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const pokeData = response.data;


    const type1 = pokeData.types[0]?.type?.name || "";
    const type2 = pokeData.types[1]?.type?.name || "";
    const dex = pokeData.id;
    const bst = pokeData.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
    const gen = pokeData;


    console.log("Data to save:", { name: pokeData.name, type1, type2, dex, bst, gen });

 
    const newGuess = new Guess({ name: pokeData.name, type1, type2, dex, bst, gen });
    const savedGuess = await newGuess.save();

    res.status(201).json(savedGuess);
  } catch (error) {
    console.error("Error saving guess:", error.message);
    res.status(400).json({ message: error.message });
  }

});

app.get("/api/guesses/:sessionId", async (req,res) =>{
  try{
  const{sessionId}= req.params;
  const guesses=await Guess.find({sessionId}).sort({createdAt:1});
    res.json(guesses);
  } catch(error){
    res.status(500).json({message:"error retrieving guess",error})
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
