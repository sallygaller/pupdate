import React from "react";
import { Link } from "react-router-dom";
import { playstyles, pupImage } from "../Utils/Helpers";
import "./Pup.css";

export default function Pup(props) {
  const pup = props.pups.find(
    ({ id }) => parseInt(id) === parseInt(props.match.params.pupId)
  );
  const playstyle = pup.playstyle;
  return (
    <div className="Pup">
      <h1>Hi, I'm {pup.name}!</h1>
      <img className="Pup-img" alt={pup.name} src={pupImage(pup.id)} />
      <p>
        Size: {pup.size}
        <br></br>
        Age: {pup.age}
      </p>
      <ul>
        {playstyle.map((p) => (
          <li>{playstyles(p)}</li>
        ))}
      </ul>
      <button>Back</button>
      {pup.id === 1 ? (
        <Link to={`/edit/pups/${pup.id}`}>
          <button>Edit</button>
        </Link>
      ) : null}
    </div>
  );
}
