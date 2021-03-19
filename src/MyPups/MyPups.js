import React from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../config";
import TokenService from "../services/token-service";
import "./MyPups.css";

class MyPups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pups: [],
      deleteCheck: false,
    };
  }

  handleDeletePup = (pupId) => {
    const newPups = this.state.pups.filter((pup) => pup.id !== pupId);
    this.setState({
      pups: newPups,
    });
  };

  handleDeleteRequest = (id) => {
    fetch(API_ENDPOINT + `/pups/${id}`, {
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
        this.handleDeletePup(id);
        this.props.history.push("/pups");
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  componentDidMount() {
    // get pup(s) of logged in user
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
                  alt={`Profile of ${pup.name}`}
                  src={`https://pupdate.s3-us-west-1.amazonaws.com/${pup.id}`}
                />
              </Link>
              <br></br>
              <Link to={`/edit/pups/${pup.id}`}>
                <button className="MyPups-profile">Edit Profile</button>
              </Link>
              {this.state.checkDelete ? (
                <div>
                  Are you sure?
                  <button
                    className="MyPups-delete-profile"
                    type="button"
                    onClick={() => this.handleDeleteRequest(pup.id)}
                  >
                    Yes
                  </button>
                  <button
                    className="MyPups-add"
                    type="button"
                    onClick={() => this.setState({ checkDelete: false })}
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  className="MyPups-delete-profile"
                  type="button"
                  onClick={() => this.setState({ checkDelete: true })}
                >
                  Delete Profile
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MyPups;
