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
      attendees: [],
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
    console.log(this.props.attendees);
    Promise.all(
      this.props.attendees.map((rsvp) =>
        fetch(API_ENDPOINT + `/pups/${rsvp.attendee}`, {
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

  render() {
    return (
      <div>
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
    );
  }
}

export default AttendeeList;
