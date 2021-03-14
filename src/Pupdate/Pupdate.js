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
          <div className="Pupdate-item-double">
            <p>
              Date: {moment(pupdate.date).format("LL")} <br></br>
              Time: {moment(pupdate.starttime, "h:mm A").format(
                "h:mm A"
              )} - {moment(pupdate.endtime, "h:mm A").format("h:mm A")}{" "}
              <br></br>
              Location: {pupdate.location}
            </p>
          </div>
          {/* </div>
        <div className="Pupdate-group"> */}
          <div className="Pupdate-item">
            <ul>
              Organized by:
              {this.state.organizerPups.map((organizerPup) => (
                <li key={organizerPup.id}>
                  <Link to={`/pups/${organizerPup.id}`}>
                    {organizerPup.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {this.props.userOrganized === "true" ? (
            <div className="Pupdate-item Pupdate-rsvp">
              <Link to={`/pupdates/${pupdate.id}`}>
                <p>View/Edit Pupdate</p>
              </Link>
            </div>
          ) : null}
          {this.props.userAttending === "true" ? (
            <div className="Pupdate-item Pupdate-rsvp">
              <Link to={`/pupdates/${pupdate.id}`}>
                <p>View Pupdate/RSVP</p>
              </Link>
            </div>
          ) : null}
          {this.props.availablePupdate === "true" ? (
            <div className="Pupdate-item Pupdate-rsvp">
              <Link to={`/pupdates/${pupdate.id}`}>
                <p>View Pupdate/RSVP</p>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Pupdate;
