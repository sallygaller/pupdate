import React from "react";
import { Link } from "react-router-dom";
import "./AttendeeListAccordion.css";
import { API_ENDPOINT } from "../config";
import TokenService from "../services/token-service";

class AttendeeListSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      class: "AttendeeList-section",
      attendees: [],
    };
  }

  handleClick = () => {
    if (this.state.open) {
      this.setState({
        open: false,
        class: "AttendeeList-section",
      });
    } else {
      this.setState({
        open: true,
        class: "AttendeeList-section open",
      });
      Promise.all(
        this.props.rsvps.map((pupdateRsvp) =>
          fetch(API_ENDPOINT + `/pups/user/${pupdateRsvp.attendee}`, {
            headers: {
              authorization: `bearer ${TokenService.getAuthToken()}`,
            },
          })
        )
      )
        .then((responses) => {
          return Promise.all(
            responses.map((response) => {
              return response.json();
            })
          );
        })
        .then((data) => {
          this.setState({
            attendees: data,
          });
        })
        .catch((error) => {
          console.error({ error });
        });
    }
  };

  handleAttendees = () => {
    if (this.state.showAttendees === false) {
    } else {
      this.setState({
        showAttendees: false,
      });
    }
  };

  render() {
    return (
      <div className={this.state.class}>
        <button>toggle</button>
        <div className="AttendeeList-sectionhead" onClick={this.handleClick}>
          <h3>{this.props.title}</h3>
        </div>
        <div
          className={
            this.state.open ? "AttendeeList-animated" : "AttendeeList-hidden"
          }
        >
          <div className="AttendeeList-article">
            <ul>
              {this.state.attendees.length === 0 ? (
                <li>No attendees yet!</li>
              ) : (
                this.state.attendees[0].map((attendee) => {
                  return (
                    <li key={attendee.id}>
                      <Link to={`/pups/${attendee.id}`}>{attendee.name}</Link>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default AttendeeListSection;
