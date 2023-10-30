import React from 'react';
import { useState, useEffect, createContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameBoard from './components/GameBoard';
import Settings from './components/Settings';
import Letters from './components/PlayerControls'
import Turns from './components/Turns';
import Score from './components/Score';
import axios from 'axios';
import GameHistory from './components/GameHistory';
import LogInPage from './components/LogInPage';
import RegisterPage from './components/RegisterPage'

export const AppContext = createContext(null)

const API = "http://localhost:8080/api";

function App() {
  
  const [players, setPlayers] = useState([]);
  const [Rounds, setRounds] = useState(3);
  const [NumPlayers, setNumPlayers] = useState(2);
  const [startGame, setStartGame] = useState(false); //keep track of new games
  const [randomText, setRandomText] = useState("");
  const [completedRules, setCompletedRules] = useState(false); //for when to display game screen and close settings
  const [chosenLetters, setChosenLetters] = useState([]) //for correct letters in phrase
  const [letterPressed, setLetterPressed] = useState(false)
  const [roundsOver, setRoundsOver] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [usedLetters, setUsedLetters] = useState([]) //all used letters
  const [playerPoints, setPlayerPoints] = useState([]) //points of each player
  const [playerIndex, setPlayerIndex] = useState(0)
  const [Winner, setWinner] = useState("")
  const [gameId, setGameId] = useState(-1)
  const [JWT, setJWT] = useState("")
  const [register, setRegister] = useState(false)

  useEffect(() => {
    const storedJWT = localStorage.getItem("jwt");
    if (storedJWT) {
      setJWT(storedJWT);
    }
  }, []);

  useEffect(() => { //when game start pick a random text
    if (startGame) {
      
      //fetch the random sentence
      axios.get(API+'/random-sentence', { headers: {"Authorization" : `Bearer ${JWT}`} }) 
      .then(
        response => {
          setRandomText(String(response.data).toUpperCase());
        }
      )
      .catch(
        error => {
          console.error('Error fetching random text: ', error);
        }
      )

      console.log(randomText);

      //add to database the game with it's players in initial state 
      axios.post(API+'/create-game', players, { headers: {"Authorization" : `Bearer ${JWT}`} } ) 
      .then(response => {
        setGameId(response.data) //after game creation in db take it's id
        // Initialize playerPoints with 0 for each player
        const initialPlayerPoints = {};
        players.forEach(player => {
          initialPlayerPoints[player] = 0;
        });
        setPlayerPoints(initialPlayerPoints);
      })
      .catch(error => {
        console.error('Error creating a new game:', error);
      });
    }
  }, [startGame]);

  return (
    <AppContext.Provider value={{ players, setPlayers, Rounds, setRounds, NumPlayers,
                                  setNumPlayers, startGame, setStartGame, randomText, setRandomText, completedRules, 
                                  setCompletedRules, chosenLetters, setChosenLetters, letterPressed, setLetterPressed, 
                                  gameOver, setGameOver, roundsOver, setRoundsOver, usedLetters, setUsedLetters, playerPoints, 
                                  setPlayerPoints, playerIndex, setPlayerIndex, Winner, setWinner, gameId, JWT, setJWT,
                                  register, setRegister }}>

      {JWT !== "" ? (
          <>
           <button className="log-out" onClick={(event) => { event.preventDefault(); localStorage.removeItem("jwt"); setJWT(""); setCompletedRules(false); }}>Log Out</button>
            <div className="split top">
              <div className="centered">
                {completedRules ? (
                  <>
                    <h2 className="big-text up">Round's puzzle:</h2>
                    <GameBoard />
                  </>
                ) : (
                  <Settings />
                )}
              </div>
            </div>
            <div className="split bottom">
              <div className="centered">
                {completedRules && <Turns />}
                {completedRules && !roundsOver && <Letters />}
                {!completedRules && <GameHistory />}
              </div>
            </div>
          </>
        ) : 
        ( <div className='register'>
            { register ? <RegisterPage/> : <LogInPage /> }
          </div>
        )
      }

      { completedRules && JWT== "" && <div className="top-left"><Score/></div>}
      
      </AppContext.Provider>
  );
}

export default App;
