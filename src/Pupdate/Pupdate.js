import React from "react";
import { Link } from "react-router-dom";
import "./Pupdate.css";

export default function Pupdate(props) {
  const { pups, pupdate } = props;

  return (
    <div className="Pupdate Pupdate-group">
      <div className="Pupdate-item">
        <p>
          Date: {pupdate.date} <br></br>
          Time: {pupdate.startTime}-{pupdate.endTime}
        </p>
      </div>
      <div className="Pupdate-item">
        <p>Location: {pupdate.location}</p>
      </div>
      <div className="Pupdate-item">
        <ul>
          {pups.map((pup) =>
            pupdate.organizer === pup.owner ? (
              <li key={pup.id}>
                <p className="Pupdate-p">{pup.name}</p>
                <Link to={`/pups/${pup.id}`}>
                  <button className="Pupdate-profile" type="button">
                    {pup.name}'s Play Profile
                  </button>
                </Link>
              </li>
            ) : null
          )}
        </ul>
      </div>
      <div className="Pupdate-item">
        <button className="Pupdate-rsvp" type="button">
          RSVP
        </button>
      </div>
    </div>
  );
}
