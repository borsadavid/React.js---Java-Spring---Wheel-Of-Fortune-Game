import React, { useContext, useState } from 'react';
import { AppContext } from '../App';

export default function Answer({ playerIndex, setPlayerIndex }) {
  const { randomText, players, NumPlayers, setRounds, Rounds, setRoundsOver, setGameOver, gameOver, roundsOver } = useContext(AppContext);
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (answer.toLowerCase() === randomText.toLowerCase()) {
      setRoundsOver(true)
      setGameOver(true)
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

  return (
    <form onSubmit={handleSubmit}>
      {gameOver ? (
        <div className='big-text red'>Winner is {players[playerIndex]}</div>
      ) : (
        <>
          { !roundsOver &&
          <div className='mid-text down'>
            Guess the phrase!
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
