import React from "react";
import Pupdate from "../Pupdate/Pupdate";
import "./Pupdates.css";

export default function Pupdates(props) {
  const { pups, pupdates } = props;
  return (
    <div className="Pupdates">
      <h2>pupdates</h2>
      <div>
        <label htmlFor="Pupdates-sort">Sort by </label>
        <select>
          <option value="date-desc">Date (Newest to Oldest)</option>
          <option value="date-asc">Date (Oldest to Newest)</option>
          <option value="species">Match</option>
        </select>
      </div>
      <div>
        <ul>
          {pupdates.map((pupdate) => (
            <li key={pupdate.id}>
              <Pupdate pupdate={pupdate} pups={pups} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
