import axios from "axios";
import { useState, useEffect } from "react";
import { AppContext } from "../App";
import { useContext } from "react";

export default function GameHistory(){
  const [prevGames, setPrevGames] = useState([]);
  const {JWT} = useContext(AppContext)

  useEffect(() => {
    if (JWT != "") {
      axios.get('http://localhost:8080/api/game',
                { headers: {"Authorization" : `Bearer ${JWT}`} }
              )
        .then(response => {
          setPrevGames(response.data);
        })
        .catch(error => {
          console.error('Error fetching previous games', error);
        });
    }
  }, [JWT]);

  return (
    <>
      <div>
        <div className="big-text grid">Previous Games</div>
          {prevGames.map((game, index) => {
            // Parse the created_at date string into a Date object
            const createdAtDate = new Date(game.createdAt);
            // Format the date to display only date and hour
            const formattedCreatedAt = `${createdAtDate.toLocaleDateString()}`;
  
            return (
              <div className="games" key={index}>
                <p className="mid-text">Game {index + 1}</p>
                <p className="small-text seagreen">Created at: {formattedCreatedAt}</p>
                <p className="small-text seagreen">Winner: {game.winner}</p>
                  {game.players.map((player, playerIndex) => (
                    <div className="small-text" key={playerIndex}>
                      {player.name} - Score: {player.score}
                      <br/>
                    </div>
                  ))}
              </div>
            );
          })}
      </div>
    </>
  );
  


}
