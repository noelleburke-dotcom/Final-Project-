import React, { useState, useEffect } from 'react'
import './gameJsx.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';
import PokedleGame from './gameLogic.jsx';

function Game() {
    useEffect(() => {
        document.title = "Pokedle!";
     }, []);
  return (
    <div className="game-container">
            <h2>Pokedle</h2>
            <PokedleGame />
        <div className="game-board">
            <div className="labelRow">
                <div className="label">Guess</div>
                <div className="label">Type</div>
                <div className="label">Type 2</div>
                <div className="label">Gen</div>
                <div className="label">BST</div>
                <div className="label">Dex #</div>
            </div>

            <div className="tileRow">
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
            </div>
            <div className="tileRow">
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
            </div>
            <div className="tileRow">
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
            </div>
            <div className="tileRow">
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
            </div>
            <div className="tileRow">
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
            </div>
            <div className="tileRow">
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
            </div>
    </div>
</div>
);
}

export default Game;
