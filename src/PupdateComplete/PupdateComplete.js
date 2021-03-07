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
      attendees: [],
      attending: false,
      rsvp: "",
      pupdate: {},
      userPupdates: {},
      userOrganized: false,
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
      // get pupdate RSVPS for logged in user
      fetch(API_ENDPOINT + `/pupdate-rsvp/user`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
      // get pupdates the user organized
      fetch(API_ENDPOINT + `/pupdates/user`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
    ])
      .then(([res2, res3, res4]) =>
        Promise.all([res2.json(), res3.json(), res4.json()])
      )
      .then(([responseData2, responseData3, responseData4]) => {
        for (let i = 0; i < responseData4.length; i++) {
          if (responseData4[i].id === pupdateId) {
            this.setState({
              userOrganized: true,
            });
          }
        }
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
            {this.state.pupdate.locale} Pupdate on{" "}
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
            <RSVPButtons
              // handleDeleteRequest={this.handleDeleteRequest}
              handleRsvpYes={this.handleRsvpYes}
              handleRsvpNo={this.handleRsvpNo}
              attending={this.state.attending}
              organized={this.state.userOrganized}
            />
            {this.state.attending === false &&
            this.state.organized === false ? (
              <button onClick={(e) => this.handleRsvpYes(e)}>
                I'll be there!
              </button>
            ) : this.state.organized === true ? (
              // <button onClick={(e) => this.handleRsvpYes(e)}>
              <div>
                <button>Edit Pupdate</button>
                <button>Delete Pupdate</button>
              </div>
            ) : this.state.organized === false &&
              this.state.attending === false ? (
              <button onClick={(e) => this.handleRsvpNo(e)}>
                I'm no longer attending
              </button>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default PupdateComplete;
