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
              <Link to={`/pups/${pup.id}`}>
                <h3>{pup.name}</h3>
                <img
                  className="MyPups-img"
                  alt={pup.name}
                  src={pupImage(pup.id)}
                />
              </Link>
              <br></br>
              <Link to={`/edit/pups/${pup.id}`}>
                <button className="MyPups-profile">Edit Play Profile</button>
              </Link>
              <button className="MyPups-delete-profile" type="button">
                Delete Play Profile
              </button>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}
