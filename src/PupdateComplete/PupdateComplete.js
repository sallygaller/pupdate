import React from "react";
import PropTypes from "prop-types";
import { API_ENDPOINT } from "../config";
import TokenService from "../services/token-service";

class PupdateComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendees: [],
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
    fetch(API_ENDPOINT + `/pupdate-rsvp/${pupdateId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((responseData) => {
        let attendeeList = [];
        for (let i = 0; i < responseData.length; i++) {
          fetch(API_ENDPOINT + `/pups/${responseData[i].attendee}`, {
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

  render() {
    return (
      <div>
        <ul>
          {this.state.attendees.map((attendee) => {
            return <li key={attendee.id}>{attendee.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default PupdateComplete;
