import React from "react";
import { Link } from "react-router-dom";
import AttendeeList from "../AttendeeList/AttendeeList";
import PropTypes from "prop-types";
import moment from "moment";
import { API_ENDPOINT } from "../config";
import TokenService from "../services/token-service";
import "./PupdateProfile.css";

class PupdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pupdate: [],
      attendees: "",
      organizerPups: [],
      showAttendees: false,
      rsvp: "",
      userPupdate: false,
      userAttending: false,
      error: null,
    };
  }

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    // history: PropTypes.shape({
    //   push: PropTypes.func,
    // }).isRequired,
  };

  componentDidMount() {
    const { pupdateId } = this.props.match.params;
    Promise.all([
      // get details about pupdate
      fetch(API_ENDPOINT + `/pupdates/${pupdateId}`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
      // get rsvps for pupdate
      fetch(API_ENDPOINT + `/pupdate-rsvp/${pupdateId}`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
      // get user organized pupdates
      fetch(API_ENDPOINT + `/pupdates/user`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
      // get user rsvps
      fetch(API_ENDPOINT + `/pupdate-rsvp/user`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
    ])
      .then(([res1, res2, res3, res4]) =>
        Promise.all([res1.json(), res2.json(), res3.json(), res4.json()])
      )
      .then(([responseData1, responseData2, responseData3, responseData4]) => {
        // set pupdate to state
        this.setState({
          pupdate: responseData1,
          rsvps: responseData2,
        });
        // check if user is attending this pupdate
        responseData4.map((pupdateRsvps) => {
          if (pupdateRsvps.pupdate === responseData1.id) {
            this.setState({
              userAttending: true,
              rsvp: pupdateRsvps.id,
            });
          }
        });
        // check if user is organizing this pupdate
        responseData3.map((pupdate) => {
          if (pupdate.id === responseData1.id) {
            this.setState({
              userPupdate: true,
            });
          }
        });
        return responseData1;
      })
      .then((responseData1) =>
        fetch(API_ENDPOINT + `/pups/user/${responseData1.id}`, {
          headers: {
            authorization: `bearer ${TokenService.getAuthToken()}`,
          },
        })
      )
      .then((res) => res.json())
      .then((responseData) =>
        this.setState({
          organizerPups: responseData,
        })
      )
      .catch((error) => {
        console.error({ error });
      });
  }

  handleAttendees = () => {
    if (this.state.showAttendees === false) {
      Promise.all(
        this.state.rsvps.map((pupdateRsvp) =>
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
            showAttendees: true,
          });
        })
        .catch((error) => {
          console.error({ error });
        });
    } else {
      this.setState({
        showAttendees: false,
      });
    }
  };

  handleRsvpNo = (e) => {
    fetch(API_ENDPOINT + `/pupdate-rsvp/user/${this.state.rsvp}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));
        return res;
      })
      .then((data) => {
        this.props.history.push("/pupdates");
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  handleRsvpYes = (e) => {
    fetch(API_ENDPOINT + `/pupdate-rsvp/${this.state.pupdate.id}`, {
      method: "POST",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res.json();
      })
      .then((data) => {
        this.props.history.push("/pupdates");
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  handleDeleteRequest = () => {
    fetch(API_ENDPOINT + `/pupdates/${this.state.pupdate.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));
        return res;
      })
      .then((data) => {
        this.props.history.push("/pupdates");
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    return (
      <div className="PupdateProfile">
        <section>
          <h2>Pupdate on {moment(this.state.pupdate.date).format("LL")}</h2>
          <div>
            <p>
              Time:{" "}
              {moment(this.state.pupdate.starttime, "h:mm A").format("h:mm A")}{" "}
              - {moment(this.state.pupdate.endtime, "h:mm A").format("h:mm A")}{" "}
              <br></br>
              Location: {this.state.pupdate.location}
            </p>
          </div>
          {this.state.userPupdate === true ? null : (
            <div>
              <h3>Organized by:</h3>
              <ul>
                {this.state.organizerPups.map((organizerPup) => (
                  <li key={organizerPup.id}>
                    <Link to={`/pups/${organizerPup.id}`}>
                      {organizerPup.name}
                    </Link>
                    <br></br>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <button onClick={this.handleAttendees}>
              {this.state.showAttendees === true ? (
                <p className="PupdateProfile-attendee">Hide Attendee List</p>
              ) : (
                <p className="PupdateProfile-attendee">View Attendee List</p>
              )}
            </button>
            <AttendeeList
              showAttendees={this.state.showAttendees}
              attendees={this.state.attendees}
            />
          </div>
          <br></br>
          {this.state.userPupdate === true ? (
            <div>
              <Link to={`/edit/pupdates/${this.state.pupdate.id}`}>
                <button className="PupdateProfile-edit">Edit Pupdate</button>
              </Link>
              <button onClick={this.handleDeleteRequest}>Delete Pupdate</button>
            </div>
          ) : this.state.userAttending === true ? (
            <div>
              <button onClick={this.handleRsvpNo}>
                I can no longer attend
              </button>
            </div>
          ) : (
            <div>
              <button onClick={this.handleRsvpYes}>I'll be there!</button>
            </div>
          )}
          <button onClick={this.handleBack}>Back to Pupdates</button>
        </section>
      </div>
    );
  }
}

export default PupdateProfile;
