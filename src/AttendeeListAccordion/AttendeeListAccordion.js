import React from "react";
import { Link } from "react-router-dom";
import AttendeeListSection from "./AttendeeListSection";
import "./AttendeeListAccordion.css";

export default function AttendeeListAccordion(props) {
  console.log(props.attendees);
  return (
    <div className="AttendeeList-main">
      <AttendeeListSection
        title={props.title}
        pupdates={props.attendees}
        rsvps={props.rsvps}
      >
        {" "}
        {props.attendees.length === 0 ? (
          <p>No attendees yet!</p>
        ) : (
          <ul>
            {props.attendees[0].map((attendee) => (
              <li key={attendee.id}>
                <Link to={`/pups/${attendee.id}`}>{attendee.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </AttendeeListSection>
    </div>
  );
}
