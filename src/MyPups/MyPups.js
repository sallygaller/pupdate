import React from "react";
import { Link } from "react-router-dom";
import { pupImage } from "../Utils/Helpers";
import { API_ENDPOINT } from "../config";
import TokenService from "../services/token-service";
import "./MyPups.css";

class MyPups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pups: [],
    };
  }

  componentDidMount() {
    // get pup of each pupdate organizer
    fetch(API_ENDPOINT + `/pups/user`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((responseData) =>
        this.setState({
          pups: responseData,
        })
      )
      .catch((error) => {
        console.error({ error });
      });
  }

  render() {
    return (
      <div className="MyPups">
        <h2>My Pups</h2>
        <Link to={`/addpup`}>
          <button className="MyPups-add" type="button">
            Add a Pup!
          </button>
        </Link>
        <ul>
          {this.state.pups.map((pup) => (
            <li key={pup.id}>
              <Link to={`/pups/${pup.id}`}>
                <h3>{pup.name}</h3>
                <img
                  className="MyPups-img"
                  alt={pup.name}
                  src={pupImage(pup.id)}
                />
              </Link>
              <br></br>
              <Link to={`/edit/pups/${pup.id}`}>
                <button className="MyPups-profile">Edit Play Profile</button>
              </Link>
              <button className="MyPups-delete-profile" type="button">
                Delete Play Profile
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MyPups;
