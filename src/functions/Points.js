export default function addPointsToPlayer(players, playerIndex, setPlayerPoints, value) {
  setPlayerPoints((prevPlayerPoints) => {
    const updatedPlayerPoints = { ...prevPlayerPoints };
    const playerName = players[playerIndex];
    updatedPlayerPoints[playerName] = (updatedPlayerPoints[playerName] || 0) + value;
    return updatedPlayerPoints;
  });
}