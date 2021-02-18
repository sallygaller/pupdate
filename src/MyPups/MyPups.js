import React from "react";
import { Link } from "react-router-dom";
import "./MyPups.css";

export default function MyPups(props) {
  const pups = props.pups;
  return (
    <div className="MyPups">
      <h2>My Pups</h2>
      <ul>
        {pups.map((pup) =>
          pup.id === 1 ? (
            <li key={pup.id}>
              <h3>{pup.name}</h3>
              <Link to={`/pups/${pup.id}`}>
                <button type="button">{pup.name}'s Profile</button>
              </Link>
            </li>
          ) : null
        )}
      </ul>
      <Link to={`/addpup`}>
        <button type="button">Add a Pup!</button>
      </Link>
    </div>
  );
}
