import React from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../config";
import TokenService from "../services/token-service";

class OrganizerPups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizerPups: [],
      error: null,
    };
  }

  componentDidMount() {
    // get pup of each pupdate organizer
    fetch(API_ENDPOINT + `/pups/user/${this.props.organizer}`, {
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
    return (
      <ul>
        {console.log(this.state.organizerPups)}
        {/* {this.state.organizerPups.map((organizerPup) => (
          <li key={organizerPup.id}>
            {organizerPup.name}
            <br></br>
            <Link to={`/pups/${organizerPup.id}`}>
              <button className="Pupdate-play-profile" type="button">
                View Play Profile
              </button>
            </Link>
          </li>
        ))} */}
      </ul>
    );
  }
}

export default OrganizerPups;
