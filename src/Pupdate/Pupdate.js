import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../services/token-service";
import { API_ENDPOINT } from "../config";
import moment from "moment";
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
    // get pup of each pupdate organizer
    fetch(API_ENDPOINT + `/pups/user/${this.props.pupdate.organizer}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
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

  render() {
    const pupdate = this.props.pupdate;
    return (
      <div className="Pupdate">
        <div className="Pupdate-group">
          <div className="Pupdate-item">
            <p>
              Date: {moment(pupdate.date).format("LL")} <br></br>
              Time: {moment(pupdate.starttime, "h:mm A").format("h:mm A")} -
              {moment(pupdate.endtime, "h:mm A").format("h:mm A")}
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
                    <button className="Pupdate-play-profile" type="button">
                      View Play Profile
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="Pupdate-item">
            <Link to={`/pupdates/${pupdate.id}`}>
              <button className="Pupdate-rsvp" type="button">
                View Pupdate/Change RSVP
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Pupdate;
