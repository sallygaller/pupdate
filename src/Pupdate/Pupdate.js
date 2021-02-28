import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../services/token-service";
import PropTypes from "prop-types";
import { API_ENDPOINT } from "../config";
import "./Pupdate.css";

class Pupdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      date: "",
      startTime: "",
      endtime: "",
      location: "",
      pups: [],
      error: null,
    };
  }

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  componentDidMount() {
    const { pupdateId } = this.props.match.params;
    Promise.all([
      fetch(API_ENDPOINT + `/pupdates/${pupdateId}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${TokenService.getAuthToken()}`,
        },
      }),
      fetch(API_ENDPOINT + `/pupdateRsvp/${pupdateId}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${TokenService.getAuthToken()}`,
        },
      }),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then((responseData1, responseData2) => {
        this.setState({
          id: responseData1.id,
          startTime: responseData1.startTime,
          endTime: responseData1.endtime,
          location: responseData1.location,
          pups: responseData2,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  render() {
    console.log(this.state);
    return (
      <div className="Pupdate Pupdate-group">
        <div className="Pupdate-item">
          <p>
            Date: {this.state.date} <br></br>
            Time: {this.state.startTime}-{this.state.endTime}
          </p>
        </div>
        <div className="Pupdate-item">
          <p>Location: {this.state.location}</p>
        </div>
        <div className="Pupdate-item">
          {/* <ul>
            {this.state.pups.map((pup) => (
              <li key={this.state.pup.id}>
                <p className="Pupdate-p">{this.state.pup.name}</p>
                <Link to={`/pups/${this.state.pup.id}`}>
                  <button className="Pupdate-profile" type="button">
                    {pup.name}'s Play Profile
                  </button>
                </Link>
              </li>
            ))}
          </ul> */}
        </div>
        <div className="Pupdate-item">
          <div>
            <button className="Pupdate-rsvp" type="button">
              RSVP
            </button>
            <Link to={`/edit/pupdates/${this.state.id}`}>
              <button className="Pupdate-edit">Edit</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Pupdate;
