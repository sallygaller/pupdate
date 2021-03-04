import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../services/token-service";
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

  render() {
    const pupdate = this.props.pupdate;
    return (
      <div className="Pupdate">
        <div className="Pupdate-group">
          <div className="Pupdate-item">
            <p>
              Date: {pupdate.date} <br></br>
              Time: {pupdate.starttime}-{pupdate.endtime}
            </p>
          </div>
          <div className="Pupdate-item">
            <p>Location: {pupdate.location}</p>
          </div>
          <div className="Pupdate-item">
            <ul>
              {this.state.organizerPups.map((organizerPup) => (
                <li key={organizerPup.id}>
                  {organizerPup.name}
                  <br></br>
                  <Link to={`/pups/${organizerPup.id}`}>
                    <button className="Pupdate-rsvp" type="button">
                      View {organizerPup.name}'s Play Profile
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="Pupdate-item">
            <Link to={`/pupdates/${pupdate.id}`}>
              <button className="Pupdate-rsvp" type="button">
                View Pupdate and RSVP
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Pupdate;
