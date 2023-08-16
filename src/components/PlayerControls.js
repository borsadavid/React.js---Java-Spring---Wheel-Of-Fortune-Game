import React, {useContext} from 'react'
import {AppContext} from '../App'

export default function Letters() {
    
    const {setChosenLetters, randomText, setLetterPressed, usedLetters, setUsedLetters} = useContext(AppContext)
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
    const CheckLetter = (letter) => {

      setUsedLetters(prevUsedLetters => [...prevUsedLetters, letter])
      
      if (randomText.includes(letter))
        {
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