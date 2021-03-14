import React from "react";
import Section from "./Section";
import Pupdate from "../Pupdate/Pupdate";
import "./Accordion.css";

export default function Accordion(props) {
  console.log(props.pupdates);
  return (
    <div className="main">
      <Section title={props.title} pupdates={props.pupdates}>
        {" "}
        {props.pupdates.length === 0 ? (
          <p>No pupdates here! Why don't you create one?</p>
        ) : (
          <ul>
            {props.pupdates.map((pupdate) => (
              <li key={pupdate.id}>
                <Pupdate
                  pupdate={pupdate}
                  userOrganized={props.userOrganized}
                  userAttending={props.userAttending}
                  availablePupdate={props.availablePupdate}
                />
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
}
