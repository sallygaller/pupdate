import React from "react";
import { Link } from "react-router-dom";
import "./AttendeeList.css";

export default function AttendeeList(props) {
  if (props.showAttendees === false) {
    console.log("false");
  }
  const attendees = props.attendees;
  console.log(attendees);
  return (
    <ul
      className={props.showAttendees === false ? "AttendeeList-hidden" : null}
    >
      {attendees.map((attendee) => {
        console.log(attendee);
        return (
          <li key={attendee.id}>
            {attendee.name}
            <Link to={`/pups/${attendee.id}`}>
              <button className="Pupdate-play-profile" type="button">
                View Play Profile
              </button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
