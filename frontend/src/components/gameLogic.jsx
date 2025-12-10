import React, { useState } from 'react';

let currentRow = 0;
let gameOver = false;

function PokedleGame({onSubmit}) {
  const [guess, setGuess] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if(onSubmit) onSubmit(guess.trim());
      console.log('submitted', guess);
      setGuess('');
    }
  };

  return (
    <div className='input-container'>
    <input
      type="text"
      value={guess}
      onChange={(e) => setGuess(e.target.value)}
      onKeyDown={handleKeyPress}
      placeholder="Guess a Pokemon"
    />
    </div>
  );
}

export default PokedleGame;
