import React, {useContext} from 'react'
import {AppContext} from '../App'
import addPointsToPlayer from '../functions/Points';

export default function Letters() {
    
    const {setChosenLetters, randomText, setLetterPressed, usedLetters, setUsedLetters, players, playerIndex, playerPoints, setPlayerPoints} = useContext(AppContext)
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
    const CheckLetter = (letter) => {

      setUsedLetters(prevUsedLetters => [...prevUsedLetters, letter])
      
      if (randomText.includes(letter))
        { 
          addPointsToPlayer(players, playerIndex, setPlayerPoints, 10);
          setChosenLetters(prevChosenLetters => [...prevChosenLetters, letter]);
        }
      else
        console.log(false);
    }
  
    return (
      <>
        <div className='mid-text down'>Or Guess Next Letter</div>
        {alphabet.split('').map((letter) => (
          <button
            key={letter}
            className={`custom-button mr-2 mb-2 ${usedLetters.includes(letter) ? 'chosen-letter' : ''}`}
            onClick={() => {
              CheckLetter(letter);
              setLetterPressed(true);
            }}
          >
            {letter}
          </button>
        ))}
        <br />
      </>
    );    
  }