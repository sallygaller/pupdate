import React from "react";
import { Link } from "react-router-dom";
import "./AttendeeList.css";

export default function AttendeeList(props) {
  const attendees = props.attendees;
  return (
    <div className="AttendeeList">
      <ul
        className={props.showAttendees === false ? "AttendeeList-hidden" : null}
      >
        {attendees.length === 0 ? (
          <li>No attendees yet!</li>
        ) : (
          attendees[0].map((attendee) => {
            return (
              <li key={attendee.id}>
                <Link to={`/pups/${attendee.id}`}>{attendee.name}</Link>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
