import React from "react";
import { Link } from "react-router-dom";
import { playstyles, pupImage } from "../Utils/Helpers";
import "./Pup.css";

export default function Pup(props) {
  const pup = props.pups.find(
    ({ id }) => parseInt(id) === parseInt(props.match.params.pupId)
  );
  const playstyle = pup.playstyle;

  //componentDidMount - get pup by id

  return (
    <div className="Pup">
      <h1>Hi, I'm {pup.name}!</h1>
      <img className="Pup-img" alt={pup.name} src={pupImage(pup.id)} />
      <p>
        Breed: {pup.breed.charAt(0).toUpperCase() + pup.breed.slice(1)}{" "}
        {pup.mix === "true" ? "Mix" : null}
        <br></br>
        Size: {pup.size}
        <br></br>
        Age: {pup.age}
      </p>
      <ul>
        {playstyle.map((p) => (
          <li key={p.id}>{playstyles(p.style)}</li>
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
