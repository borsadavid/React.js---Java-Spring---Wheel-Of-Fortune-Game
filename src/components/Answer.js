import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import addPointsToPlayer from '../functions/Points';
import CheckWinner from '../functions/Winner';
import bonusPoints from '../functions/BonusPoints';

export default function Answer({ playerIndex, setPlayerIndex }) {
  const { randomText, players, NumPlayers, setRounds, Rounds, setRoundsOver, setGameOver, gameOver,
         roundsOver, setChosenLetters, setPlayerPoints, playerPoints, setWinner, Winner, gameId, chosenLetters, JWT } = useContext(AppContext);
  const [answer, setAnswer] = useState('');
  const [countdown, setCountdown] = useState(players.length * 3)

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (roundsOver ==  true) //begin countdown after rounds ended
    {
      setCountdown(countdown - 1)
    }
    if (countdown == 0) //if nobody guessed, end and pick the most points player
    {
      setGameOver(true)
      CheckWinner(playerPoints, setWinner, gameId, JWT)
      setChosenLetters(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])
    }

    if (answer.toLowerCase() === randomText.toLowerCase()) {
      addPointsToPlayer(players, playerIndex, setPlayerPoints, bonusPoints(answer, chosenLetters)) //person who guesses final answer gets 5 points for each letter not guessed
      setRoundsOver(true)
      setGameOver(true)
      setChosenLetters(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])
    }
    else
    {
      if (playerIndex < NumPlayers - 1)
            {
                setPlayerIndex((prevIndex) => prevIndex + 1);
            }
            else
            {
                setPlayerIndex(0);
                setRounds((prevRounds) => prevRounds - 1);
                if (Rounds === 1)
                {
                    setRoundsOver(true)
                }
            }
    }
  };

  useEffect(() => {
    if (answer.toLowerCase() === randomText.toLowerCase() && gameOver == true) {
      CheckWinner(playerPoints, setWinner, gameId, JWT);
    }
  }, [gameOver]);

  return (
    <form onSubmit={handleSubmit}>
      {gameOver ? (
        <div className='big-text red'>{Winner === 'Draw' ? 'Draw' : `Winner is ${Winner}`}</div>
      ) : (
        <>
          { !roundsOver &&
          <div className='mid-text down'>
            Guess the phrase!
          </div>
          }
          { roundsOver &&
          <div className='mid-text down'>
            Countdown: {countdown}
          </div>
          }
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
          />
          <button type="submit" className='custom-button'>Submit Answer</button>
        </>
      )}
    </form>
  );
}
