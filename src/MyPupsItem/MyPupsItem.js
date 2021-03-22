import React from "react";
import { Link } from "react-router-dom";

class MyPupsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDelete: false,
    };
  }

  render() {
    const pup = this.props.pup;
    return (
      <div>
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
              onClick={() => this.props.handleDeleteRequest(pup.id)}
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
      </div>
    );
  }
}

export default MyPupsItem;
