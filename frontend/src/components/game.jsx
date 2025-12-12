import React, { useState, useEffect } from 'react'
import './gameJsx.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';
import PokedleGame from './gameLogic.jsx';
import { getRandomPokemon } from './gameLogic';

    function getGen(dexNumber) {
    if (!dexNumber ||typeof dexNumber !== "number") return 1;
    if (dexNumber >= 1 && dexNumber <= 151)
        return 1;
    if (dexNumber >= 152 && dexNumber <= 251)
        return 2;
    if (dexNumber >= 252 && dexNumber <= 386)
        return 3;
    if (dexNumber >= 387 && dexNumber <= 493)
        return 4;
    if (dexNumber >= 494 && dexNumber <= 649)
        return 5;
    if (dexNumber >= 650 && dexNumber <= 721)
        return 6;
    if (dexNumber >= 722 && dexNumber <= 809)
        return 7;
    if (dexNumber >= 810 && dexNumber <= 898)
        return 8;
    if (dexNumber >= 899)
        return 9;
}
const numberHint = (guessValue, actualValue) => {
    const guessNum = Number(guessValue);
    const actualNum= Number(actualValue);
    if (guessNum === actualNum) return { color: 'green', arrow: '' };
    return { color: 'yellow', arrow: guessNum < actualNum ? '↑' : '↓' };
};
const textHint = (guessValue, actualValue) => {
    if (guessValue === actualValue) return { color: 'green' };
    return { color: 'red' };
};

function Game({ sessionId }) {
    const [Guesses, setGuesses] = useState([]);
    const [gameOver,setGameOver]= useState(false);
    const [currentPokemon, setCurrentPokemon] = useState(null);
    const fetchRandomPokemon = async () => {
        try {
            const randomPokemon = await getRandomPokemon();
             randomPokemon.gen = getGen(randomPokemon.dex);
            setCurrentPokemon(randomPokemon);
            console.log(randomPokemon);
        } catch (err) {
            console.error('Error fetching random Pokémon:', err);
        }
    };
    const reset= async() =>{
        const newPokemon=await getRandomPokemon();
        newPokemon.gen = getGen(newPokemon.dexNumber);
        setGuesses([]);
        setGameOver(false);
        setCurrentPokemon(newPokemon);
        console.log(newPokemon);
    };

    useEffect(() => {
        document.title = "Pokedle!";

        fetchRandomPokemon();

        const fetchGuesses = async () => {
            if (!sessionId) return;
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/guesses/${sessionId}`);
                const data = await res.json();
                setGuesses(data);
            } catch (err) {
                console.error("error fetching guesses", err)
            }
        };

        fetchGuesses();
    }, [sessionId]);

    const handleGuessSubmit = async (pokemonName) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/guess`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: pokemonName, sessionId }),
            });

            if (!res.ok) throw new Error('Pokemon not found');

            const data = await res.json();
            data.gen = getGen(data.dex);
            if (currentPokemon && data.name.toLowerCase() === currentPokemon.name.toLowerCase()) {
                setGameOver(true);
            }   
            setGuesses([...Guesses, data]);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="game-container">
            <h2>Pokedle</h2>
            <PokedleGame onSubmit={handleGuessSubmit} gameOver={gameOver} />

            <div className="game-board">
                <button className="playAgain" onClick={reset}> Play Again </button>
               {gameOver && <div className="win"> Congrats! You got it!</div>}
                <div className="labelRow">
                    <div className="label">Guess</div>
                    <div className="label">Type</div>
                    <div className="label">Type 2</div>
                    <div className="label">Gen</div>
                    <div className="label">BST</div>
                    <div className="label">Dex #</div>
                </div>
                {currentPokemon && Guesses.map((GuessItem, index) => (
                    <div className="tileRow" key={index}>
                        <div className={`tile tile-name ${textHint(GuessItem.name, currentPokemon.name).color}`}>
                            {GuessItem.name}
                        </div>
                        <div className={`tile tile-type1 ${textHint(GuessItem.type1, currentPokemon.type1).color}`}>
                            {GuessItem.type1}
                        </div>
                        <div className={`tile tile-type2 ${textHint(GuessItem.type2, currentPokemon.type2).color}`}>
                            {GuessItem.type2}
                        </div>
                        <div className={`tile tile-gen ${numberHint(GuessItem.gen, currentPokemon.gen).color}`}>
                            {GuessItem.gen} {numberHint(GuessItem.gen, currentPokemon.gen).arrow}
                        </div>
                        <div className={`tile tile-bst ${numberHint(GuessItem.bst, currentPokemon.bst).color}`}>
                            {GuessItem.bst} {numberHint(GuessItem.bst, currentPokemon.bst).arrow}
                        </div>
                        <div className={`tile tile-dex ${numberHint(GuessItem.dex, currentPokemon.dex).color}`}>
                            {GuessItem.dex} {numberHint(GuessItem.dex, currentPokemon.dex).arrow}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Game;
