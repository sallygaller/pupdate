import React from "react";
import Section from "./Section";
import Pupdate from "../Pupdate/Pupdate";
import "./Accordion.css";

export default function Accordion(props) {
  return (
    <div className="main Accordion">
      <Section title={props.title} pupdates={props.pupdates}>
        {" "}
        {props.pupdates.length === 0 ? (
          <p>
            No pupdates here! Why don't you{" "}
            <a href="/new-pupdate">create one?</a>
          </p>
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
