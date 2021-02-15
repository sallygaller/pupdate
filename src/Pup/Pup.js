import React from "react";
import Playstyle from "../Utils/Helpers";
import "./Pup.css";

export default function Pup(props) {
  console.log(props);
  console.log(props.pups);
  const pup = props.pups.find(
    ({ id }) => parseInt(id) === parseInt(props.match.params.pupId)
  );
  console.log(pup);
  const playstyle = pup.playstyle;
  return (
    <div className="Pup">
      <h1>Hi, I'm {pup.name}!</h1>
      <p>
        Size: {pup.size}
        <br></br>
        Age: {pup.age}
        <ul>
          {playstyle.map((play) => (
            <li>{Playstyle(play)}</li>
          ))}
        </ul>
      </p>
    </div>
  );
}
