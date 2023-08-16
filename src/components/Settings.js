import React, { useContext, useState } from 'react';
import { AppContext } from '../App';

function PlayerNames( {setNext} ) {
  const {setPlayers, NumPlayers, players, setStartGame, setCompletedRules} = useContext(AppContext)

  const handlePlayerNameChange = (index, event) => {
    const newPlayers = [...players];
    newPlayers[index] = event.target.value;
    setPlayers(newPlayers);
  };

  const renderPlayerForms = () => {
    const playerForms = [];
    for (let i = 0; i < NumPlayers; i++) {
      playerForms.push(
        <div key={i}>
          <label>
            Player {i + 1} Name:
            <input
              type="text"
              value={players[i] || ''}
              onChange={(e) => handlePlayerNameChange(i, e)}
            />
          </label>
        </div>
      );
    }
    return playerForms;
  };

  return (
    <div style={{fontWeight: 'bold'}}>
      <h2>Enter Player Names</h2>
      {renderPlayerForms()}
      <button className='custom-button-up' onClick={() => setNext(false)}>Back</button>
      <button className='custom-button-up' onClick={() => {setStartGame(true); setCompletedRules(true);}}>Start Game</button>
    </div>
  );
}

function GameSettings( {setNext} ) {

  const {setRounds, setNumPlayers} = useContext(AppContext)
  
  return (
    <div>
      <div>
        <label style={{ fontSize: '27px', alignItems: 'center', fontWeight: 'bold' }}>
          Number of Rounds:<br></br>
          <input type="radio" value="3" name="rounds" onChange={() => setRounds(3)} className='custom-radio'/>
          3
          <input type="radio" value="4" name="rounds" onChange={() => setRounds(4)} className='custom-radio'/>
          4
          <input type="radio" value="5" name="rounds" onChange={() => setRounds(5)} className='custom-radio'/>
          5
          <input type="radio" value="6" name="rounds" onChange={() => setRounds(6)} className='custom-radio'/>
          6
        </label>
      </div>
      <div>
        <label style={{ fontSize: '27px', alignItems: 'center', fontWeight: 'bold' }}>
        Number of Players:<br></br>
          <input type="radio" value="2" name="radio" onChange={() => setNumPlayers(2)} className='custom-radio'/>
          2
          <input type="radio" value="3" name="radio" onChange={() => setNumPlayers(3)} className='custom-radio'/>
          3
          <input type="radio" value="4" name="radio" onChange={() => setNumPlayers(4)} className='custom-radio'/>
          4
          <input type="radio" value="5" name="radio" onChange={() => setNumPlayers(5)} className='custom-radio'/>
          5
        </label>
      </div>
      <button className="custom-button-up" onClick={() => setNext(true)}>
        Next
      </button>
    </div>
  );
}

export default function Settings()  {
  const [Next, setNext] = useState(false);
  return (
    <>
      {!Next ? (
        <GameSettings setNext={setNext}/>
      ) : (
        <PlayerNames setNext={setNext}/>
      )}
    </>
  );
}
