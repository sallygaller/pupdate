import React from "react";
import { Link } from "react-router-dom";
import "./Pupdate.css";

export default function Pupdate(props) {
  const { pups, pupdate } = props;

  return (
    <div className="Pupdate Pupdate-group">
      <div className="Pupdate-item">
        <ul>
          {pups.map((pup) =>
            pupdate.organizer === pup.owner ? (
              <li key={pup.id}>
                <h3>{pup.name}</h3>
                <Link to={`/pups/${pup.id}`}>
                  <button type="button">{pup.name}'s Profile</button>
                </Link>
              </li>
            ) : null
          )}
        </ul>
      </div>
      <div className="Pupdate-item">
        <p>
          Date: {pupdate.date} <br></br>
          Time: {pupdate.time}
        </p>
      </div>
      <div className="Pupdate-item">
        <p>Location: {pupdate.location}</p>
      </div>
      <div className="Pupdate-item">
        <button>RSVP</button>
      </div>
    </div>
  );
}
