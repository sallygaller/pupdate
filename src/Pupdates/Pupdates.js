import React from "react";
import { Link } from "react-router-dom";
import Pupdate from "../Pupdate/Pupdate";
import "./Pupdates.css";

export default function Pupdates(props) {
  const { pups, pupdates } = props;
  return (
    <div className="Pupdates">
      <section>
        <h2>My pupdates</h2>
        <div>
          <ul>
            {pupdates.map((pupdate) =>
              pupdate.organizer === 1 ? (
                <li key={pupdate.id}>
                  <Pupdate pupdate={pupdate} pups={pups} />
                </li>
              ) : null
            )}
          </ul>
        </div>
      </section>
      <section>
        <h2 id="available">Available pupdates</h2>
        <div>
          <label htmlFor="Pupdates-sort">Sort by </label>
          <select>
            <option value="date-desc">Date (Newest to Oldest)</option>
            <option value="date-asc">Date (Oldest to Newest)</option>
          </select>
        </div>
        <div>
          <ul>
            {pupdates.map((pupdate) =>
              pupdate.organizer !== 1 ? (
                <li key={pupdate.id}>
                  <Pupdate pupdate={pupdate} pups={pups} />
                </li>
              ) : null
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
