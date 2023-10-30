import { useContext } from "react";
import { AppContext } from '../App';

export default function Score(){
  const {playerPoints} = useContext(AppContext);
  return (
    <>
      <div className="score-view small-text">Score:
        { Object.entries(playerPoints).map(([name, points]) => (
          <div key={name}>
          {name}: {points}
          </div>
        ))
      }
      </div>
    </>
  )
}