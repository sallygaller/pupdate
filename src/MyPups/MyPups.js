import React from "react";
import { Link } from "react-router-dom";
import { pupImage } from "../Utils/Helpers";
import "./MyPups.css";

export default function MyPups(props) {
  const pups = props.pups;
  return (
    <div className="MyPups">
      <h2>My Pups</h2>
      <Link to={`/addpup`}>
        <button className="MyPups-add" type="button">
          Add a Pup!
        </button>
      </Link>
      <ul>
        {pups.map((pup) =>
          pup.id === 1 ? (
            <li key={pup.id}>
              <h3>{pup.name}</h3>
              <img
                className="MyPups-img"
                alt={pup.name}
                src={pupImage(pup.id)}
              />
              <br></br>
              <Link to={`/pups/${pup.id}`}>
                <button className="MyPups-profile" type="button">
                  {pup.name}'s Play Profile
                </button>
              </Link>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}
