import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../services/token-service";
import AttendeeList from "../AttendeeList/AttendeeList";
import { API_ENDPOINT } from "../config";
import "./Pupdate.css";

class Pupdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizerPups: [],
      attendees: [],
      error: null,
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(API_ENDPOINT + `/pups/user/${this.props.pupdate.organizer}`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
      fetch(API_ENDPOINT + `/pupdate-rsvp/${this.props.pupdate.id}`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([responseData1, responseData2]) =>
        this.setState({
          organizerPups: responseData1,
          pupdateRsvps: responseData2,
        })
      )
      .catch((error) => {
        console.error({ error });
      });
  }

  handleAttendees = (e) => {
    let currentRsvps = [];
    for (let i = 0; i < this.state.pupdateRsvps.length; i++) {
      fetch(
        API_ENDPOINT + `/pups/user/${this.state.pupdateRsvps[i].attendee}`,
        {
          headers: {
            authorization: `bearer ${TokenService.getAuthToken()}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(console.log(res.status));
          }
          return res.json();
        })
        .then((responseData) => {
          this.setState({
            attendees: currentRsvps.push(responseData),
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  render() {
    console.log(this.state.organizer);
    return (
      <div className="Pupdate">
        <div className="Pupdate-group">
          <div className="Pupdate-item">
            <p>
              Date: {this.props.pupdate.date} <br></br>
              Time: {this.props.pupdate.starttime}-{this.props.pupdate.endtime}
            </p>
          </div>
          <div className="Pupdate-item">
            <p>Location: {this.props.pupdate.location}</p>
          </div>
          <div className="Pupdate-item">
            <ul>
              {
                this.state.organizerPups.map((organizerPup) => (
                  <li key={organizerPup.id}>{organizerPup.name}</li>
                ))

                /* {this.state.pups.map((pup) => (
              <li key={this.state.pup.id}>
                <p className="Pupdate-p">{this.state.pup.name}</p>
                <Link to={`/pups/${this.state.pup.id}`}>
                  <button className="Pupdate-profile" type="button">
                    {pup.name}'s Play Profile
                  </button>
                </Link>
              </li>
            ))} */
              }
            </ul>
          </div>
          <div className="Pupdate-item">
            <div>
              <button className="Pupdate-rsvp" type="button">
                Change RSVP
              </button>
              <Link to={`/edit/pupdates/${this.state.id}`}>
                <button className="Pupdate-edit">Edit</button>
              </Link>
            </div>
          </div>
          <div className="Pupdate-item">
            <button
              onClick={(e) => this.handleAttendees(e)}
              className="Pupdate-rsvp"
              type="button"
            >
              View attendees
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Pupdate;
