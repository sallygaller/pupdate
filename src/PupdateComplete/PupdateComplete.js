import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import { API_ENDPOINT } from "../config";
import TokenService from "../services/token-service";
import "./PupdateComplete.css";

class PupdateComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendees: [],
      attending: false,
      pupdate: {},
      userPupdates: {},
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
      // get RSVPS for pupdate
      fetch(API_ENDPOINT + `/pupdate-rsvp/${pupdateId}`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
      // get details about pupdate
      fetch(API_ENDPOINT + `/pupdates/${pupdateId}`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
      // get pupdate RSVPS for logged in user
      fetch(API_ENDPOINT + `/pupdate-rsvp/user`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
    ])
      .then(([res1, res2, res3]) =>
        Promise.all([res1.json(), res2.json(), res3.json()])
      )
      .then(([responseData1, responseData2, responseData3]) => {
        // loop through user RSVPs to see if they've registered for this pupdate
        for (let i = 0; i < responseData3.length; i++) {
          if (responseData2.id === responseData3[i].pupdate) {
            this.setState({
              attending: true,
              rsvp: responseData3[i].id,
            });
          }
        }
        this.setState({
          pupdate: responseData2,
          userPupdates: responseData3,
        });
        let attendeeList = [];
        for (let i = 0; i < responseData1.length; i++) {
          fetch(API_ENDPOINT + `/pups/${responseData1[i].attendee}`, {
            headers: {
              authorization: `bearer ${TokenService.getAuthToken()}`,
            },
          })
            .then((res) => res.json())
            .then((responsePup) => {
              let obj = {};
              obj["id"] = responsePup.id;
              obj["name"] = responsePup.name;
              attendeeList.push(obj);
              console.log(attendeeList);
              return attendeeList;
            })
            .then((attendeeList) =>
              this.setState({
                attendees: attendeeList,
              })
            );
        }
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
    return (
      <div className="PupdateComplete">
        <section>
          <h2>
            {this.state.pupdate.location} on{" "}
            {moment(this.state.pupdate.date).format("LL")}
          </h2>
          <p>
            Time:{" "}
            {moment(this.state.pupdate.starttime, "h:mm A").format("h:mm A")} -{" "}
            {moment(this.state.pupdate.endtime, "h:mm A").format("h:mm A")}{" "}
            <br></br>
            Location: {this.state.pupdate.location}, {this.state.pupdate.city}
          </p>
          <div className="PupdateComplete-item">
            <h3>Attendees:</h3>
            <ul>
              {this.state.attendees.map((attendee) => {
                return (
                  <li key={attendee.id}>
                    {attendee.name}
                    <br></br>
                    <Link to={`/pups/${attendee.id}`}>
                      <button className="PupdateComplete-button" type="button">
                        View {attendee.name}'s Play Profile
                      </button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="PupdateComplete-item">
            {this.state.attending === false ? (
              <button onClick={(e) => this.handleRsvpYes(e)}>
                I'll be there!
              </button>
            ) : (
              <button onClick={(e) => this.handleRsvpNo(e)}>
                I'm not going
              </button>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default PupdateComplete;
