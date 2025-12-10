import React, { useState, useEffect } from 'react'
import './gameJsx.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';
import PokedleGame from './gameLogic.jsx';

function Game() {
    const[Guesses,setGuesses]= useState([]);
    useEffect(() => {
        document.title = "Pokedle!";
     }, []);
    const handleGuessSubmit = async (pokemonName) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/guess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: pokemonName }),
      });

      if (!res.ok) throw new Error('Pokemon not found');

      const data = await res.json();
      setGuesses([...Guesses, data]);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="game-container">
            <h2>Pokedle</h2>
            <PokedleGame onSubmit={handleGuessSubmit} />

        <div className="game-board">
            <div className="labelRow">
                <div className="label">Guess</div>
                <div className="label">Type</div>
                <div className="label">Type 2</div>
                <div className="label">Gen</div>
                <div className="label">BST</div>
                <div className="label">Dex #</div>
            </div>
            {Guesses.map((GuessItem, index) => (
             <div className="tileRow" key={index}>
            <div className="tile">{GuessItem.name}</div>
            <div className="tile">{GuessItem.type1}</div>
            <div className="tile">{GuessItem.type2}</div>
            <div className="tile">{GuessItem.gen}</div>
            <div className="tile">{GuessItem.bst}</div>
            <div className="tile">{GuessItem.dex}</div>
        </div>
    ))}
    </div>
</div>
);
}

export default Game;
