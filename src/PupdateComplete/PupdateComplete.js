import React from "react";
import { Link } from "react-router-dom";
import AttendeeList from "../AttendeeList/AttendeeList";
import OrganizerPups from "../OrganizerPups/OrganizerPups";
import RSVPButtons from "../RSVPButtons/RSVPButtons";
import PropTypes from "prop-types";
import moment from "moment";
import { API_ENDPOINT } from "../config";
import TokenService from "../services/token-service";
import "./PupdateComplete.css";

class PupdateComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pupdate: [],
      attendees: [],
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
        this.setState({
          pupdate: responseData1,
        });
        responseData4.map((pupdateRsvps) => {
          if (pupdateRsvps.pupdate === responseData1.id) {
            this.setState({
              userAttending: true,
            });
          }
        });
        responseData3.map((pupdate) => {
          if (pupdate.id === responseData1.id) {
            this.setState({
              userPupdate: true,
            });
          }
        });
        Promise.all(
          responseData2.map((pupdateRsvp) =>
            fetch(API_ENDPOINT + `/pups/${pupdateRsvp.attendee}`, {
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
            console.log(data);
            this.setState({
              attendees: data,
            });
          });
      })
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
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    console.log(this.state);
    return (
      <div className="PupdateComplete">
        <section>
          <h2>Pupdate on {moment(this.state.pupdate.date).format("LL")}</h2>
          <p>
            Time:{" "}
            {moment(this.state.pupdate.starttime, "h:mm A").format("h:mm A")} -{" "}
            {moment(this.state.pupdate.endtime, "h:mm A").format("h:mm A")}{" "}
            <br></br>
            Location: {this.state.pupdate.location}, {this.state.pupdate.city}
          </p>
          {this.state.userPupdate === true ? (
            <div>
              <Link to={`/edit/pupdate/${this.state.pupdate.id}`}>
                <button>Edit Pupdate</button>
              </Link>
              <button>Delete Pupdate</button>
            </div>
          ) : this.state.userAttending === true ? (
            <button>I can no longer attend.</button>
          ) : (
            <button>I'll be there!</button>
          )}
        </section>
      </div>
    );
  }
}

export default PupdateComplete;
