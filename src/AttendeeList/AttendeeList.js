import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TokenService from "../services/token-service";
import { API_ENDPOINT } from "../config";

class AttendeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pups: [],
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
    console.log(this.props);
    const pupdateId = this.props.params.pupdateId;
    // get pupdate attendee list (rsvps)
    fetch(API_ENDPOINT + `/pupdate-rsvp/${pupdateId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        let attendeeList = [];
        for (let i = 0; i < response.length; i++) {
          fetch(API_ENDPOINT + `/pups/${response[i].attendee}`, {
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

  render() {
    return (
      <div>
        <h3>Attendees:</h3>
        <ul>
          <li>Attendee List here</li>
          <li>{console.log(this.state.attendees)}</li>
          {/* {this.state.attendees.map((attendee) => {
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
          })} */}
        </ul>
      </div>
    );
  }
}

export default AttendeeList;
