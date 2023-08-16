import React from 'react';
import { useState, useEffect, createContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameBoard from './components/GameBoard';
import Settings from './components/Settings';
import Letters from './components/PlayerControls'
import texts from './components/Texts'
import Turns from './components/Turns';

export const AppContext = createContext(null)

function App() {
  
  const [players, setPlayers] = useState([]);
  const [Rounds, setRounds] = useState(3);
  const [NumPlayers, setNumPlayers] = useState(2);
  const [startGame, setStartGame] = useState(false); //keep track of new games
  const [randomText, setRandomText] = useState("");
  const [completedRules, setCompletedRules] = useState(false); //for when to display game screen and close settings
  const [chosenLetters, setChosenLetters] = useState([])
  const [letterPressed, setLetterPressed] = useState(false)
  const [roundsOver, setRoundsOver] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [usedLetters, setUsedLetters] = useState([])

  useEffect(() => { //when game start pick a random text
    if (startGame) {
      const randomIndex = Math.floor(Math.random() * texts.length);
      setRandomText(texts[randomIndex].toUpperCase());
      setStartGame(false);
    }
  }, [startGame]);

  return (
    <AppContext.Provider value={{ players, setPlayers, Rounds, setRounds, NumPlayers,
     setNumPlayers, startGame, setStartGame, randomText, setRandomText, completedRules, 
     setCompletedRules, chosenLetters, setChosenLetters, letterPressed, setLetterPressed, 
     gameOver, setGameOver, roundsOver, setRoundsOver, usedLetters, setUsedLetters }}>
      <div className="split top">
        <div className="centered">
          {completedRules ? (
            <>
              <h2 className='big-text up'>Round's puzzle:</h2>
              <GameBoard/>
            </>
          ) : (
            <Settings/>
          )}
        </div>
      </div>
      <div className="split bottom">
        <div className="centered">
          {completedRules && <Turns/>}
          {completedRules && !roundsOver && <Letters/>}
        </div>
      </div>
      </AppContext.Provider>
  );
}

export default App;
