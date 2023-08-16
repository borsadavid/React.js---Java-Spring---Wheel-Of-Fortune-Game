import React, {useContext} from 'react'
import {AppContext} from '../App'
import { Card } from 'react-bootstrap';

export default function GameBoard() {
  const {randomText, chosenLetters} = useContext(AppContext)

  return (
    <Card className="card wide">
      <Card.Body>
        <div className="letter-blocks d-flex flex-wrap justify-content-center">
          {randomText.split("").map((letter, index) => {
            const isChosen = chosenLetters.includes(letter);
            if (isChosen) {
              return (
                <span
                  key={index}
                  className="letter-block border border-dark mx-2 mb-2 red"
                  style={{ color: 'red', 
                    fontWeight: 'bold', 
                    width: '28px', 
                    height: '43px',
                    fontSize: '28px'
                  }}
                >
                  {letter}
                </span>
              );
            } else {
              return (
                <span
                  key={index}
                  className="letter-block border border-dark mx-2 mb-2 red"
                  style={{
                    width: letter !== ' ' ? '28px' : '1px', 
                    height: '43px',
                    backgroundColor: 'transparent', 
                  }}
                >
                </span>
              ); 
            }
          })}
        </div>
      </Card.Body>
    </Card>
  );
}

