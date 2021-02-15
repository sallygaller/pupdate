import React from "react";
import { Link } from "react-router-dom";
import Pup from "../Pup/Pup";
import "./Pupdate.css";

export default function Pupdate(props) {
  const { pups, pupdate } = props;

  return (
    <div className="Pupdate">
      <h3>{pupdate.location}</h3>
      <p>
        Date: {pupdate.date} <br></br>
        Time: {pupdate.time}
      </p>
      <ul>
        {pups.map((pup) =>
          pupdate.organizer === pup.owner ? (
            <li key={pup.id}>
              {pup.name}
              <Link to={`/pups/${pup.id}`}>
                <button type="button">{pup.name}'s Profile</button>
              </Link>
            </li>
          ) : null
        )}
      </ul>
      <button>RSVP</button>
    </div>
  );
}
