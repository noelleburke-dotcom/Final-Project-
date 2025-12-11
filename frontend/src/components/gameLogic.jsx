import React, { useState } from 'react';


export async function getRandomPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
  const data = await res.json();
  const allPokemon= data.results;
  
  const filtered= allPokemon.filter(p => {
  const name = p.name.toLowerCase();
  if(name.includes('mega') || name.includes('gmax') )
    return false;
  if (name.includes('alolan')|| name.includes('galarian'))
    return true;
  if (name.includes('-'))
    return false;
  return true;})
  const randomIndex = Math.floor(Math.random() * filtered.length);
  const selected = filtered[randomIndex];
  const fullRes=await fetch(selected.url);
  const fullData=await fullRes.json();

  return {
    name: fullData.name,
    dex: fullData.id,
    type1: fullData.types[0]?.type?.name || '',
    type2: fullData.types[1]?.type?.name || '',
    bst: fullData.stats.reduce((sum, stat) => sum + stat.base_stat, 0)
  };
}

function PokedleGame({onSubmit, gameOver}) {
  const [Guess, setGuess] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if(onSubmit) onSubmit(Guess.trim());
      console.log('submitted', Guess);
      setGuess('');
    }
  };

  return (
    <div className='input-container'>
    <input
      type="text"
      value={Guess}
      onChange={(e) => setGuess(e.target.value)}
      onKeyDown={handleKeyPress}
      placeholder="Guess a Pokemon"
      disabled={gameOver}
    />
    </div>
  );
}

export default PokedleGame;
