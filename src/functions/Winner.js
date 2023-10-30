import axios from "axios";

export default function CheckWinner(playerPoints, setWinner, gameId, JWT) {
  var maxScore = -1
  var name = ""
  for (const player in playerPoints) {
    if (playerPoints[player] > maxScore) {
      maxScore = playerPoints[player];
      name = player;
    }
    else if (playerPoints[player] == maxScore){
      name = "Draw"
    }
  }
  setWinner(String(name))
  
  axios.patch("http://localhost:8080/api/update-score/" + gameId, playerPoints, { headers: {"Authorization" : `Bearer ${JWT}`} })
  .then(response => {
    console.log('Game updated successfully', response);
  })
  .catch(error => {
    console.error('Error updating game', error);
  });
}