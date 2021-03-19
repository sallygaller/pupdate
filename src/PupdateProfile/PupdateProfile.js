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
      checkDelete: false,
      attendees: "",
      organizerPups: [],
      rsvps: [],
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
          <div>
            {this.state.pupdate.description ? (
              <p>{this.state.pupdate.description}</p>
            ) : null}
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
            <AttendeeList
              rsvps={this.state.rsvps}
              showAttendees={this.state.showAttendees}
              attendees={this.state.attendees}
              title="Attendee List"
            />
          </div>
          <br></br>
          {this.state.userPupdate === true ? (
            <div>
              <Link to={`/edit/pupdates/${this.state.pupdate.id}`}>
                <button className="PupdateProfile-button">Edit Pupdate</button>
              </Link>
              {this.state.checkDelete ? (
                <div>
                  Are you sure?
                  <button
                    className="PupdateProfile-button"
                    onClick={this.handleDeleteRequest}
                  >
                    Yes
                  </button>
                  <button
                    className="PupdateProfile-button"
                    type="button"
                    onClick={() => this.setState({ checkDelete: false })}
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  className="PupdateProfile-button"
                  onClick={() => this.setState({ checkDelete: true })}
                >
                  Delete Pupdate
                </button>
              )}
            </div>
          ) : this.state.userAttending === true ? (
            <div>
              <button
                className="PupdateProfile-button"
                onClick={this.handleRsvpNo}
              >
                I can no longer attend
              </button>
            </div>
          ) : (
            <div>
              <button
                className="PupdateProfile-button"
                onClick={this.handleRsvpYes}
              >
                I'll be there!
              </button>
            </div>
          )}
          <button className="PupdateProfile-button" onClick={this.handleBack}>
            Back to Pupdates
          </button>
        </section>
      </div>
    );
  }
}

export default PupdateProfile;
