require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));

  const guess = require("./models/guess");



app.post("/api/guess", async (req,res)=>{
try{
   const newGuess= new guess(req.body);
   const savedGuess= await newGuess.save();
   res.status(201).json(savedGuess);
} catch (error){
  res.status(400).json({ message: error.message });
}
});
