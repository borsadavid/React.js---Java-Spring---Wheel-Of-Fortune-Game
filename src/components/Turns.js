import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../App'
import Answer from './Answer';

export default function Turns(p) {
    const {players, Rounds, NumPlayers, setRounds, letterPressed, setLetterPressed, roundsOver, setRoundsOver, gameOver, playerIndex, setPlayerIndex} = useContext(AppContext);
    

    const handleNextTurn = () => {
        if (Rounds>0)
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
    }

    useEffect(() => {
        if (letterPressed) {
          handleNextTurn();
          setLetterPressed(false);
        }
      }, [letterPressed]);

      return (
        <>
        {roundsOver && !gameOver && <div className='big-text down'>All rounds ended, it's time to guess!</div>}
        {players.length > 0 && !gameOver && <div className='big-text seagreen'>{players[playerIndex]} goes!</div>}
        {players.length > 0 && <Answer playerIndex={playerIndex} setPlayerIndex={setPlayerIndex}/>}
        </>
      );
      
      
}
