import React from "react";
import Playstyle from "../Utils/Helpers";
import "./Pup.css";

export default function Pup(props) {
  const pup = props.pups.find(
    ({ id }) => parseInt(id) === parseInt(props.match.params.pupId)
  );
  const playstyle = pup.playstyle;
  return (
    <div className="Pup">
      <h1>Hi, I'm {pup.name}!</h1>
      <p>
        Size: {pup.size}
        <br></br>
        Age: {pup.age}
      </p>
      <ul>
        {playstyle.map((p) => (
          <li>{Playstyle(p)}</li>
        ))}
      </ul>
      <button>Back</button>
    </div>
  );
}
