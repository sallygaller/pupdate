import React from "react";
import { Link } from "react-router-dom";
import { PupSize } from "../Utils/Helpers";
import PropTypes from "prop-types";
import TokenService from "../services/token-service";
import { API_ENDPOINT } from "../config";
import "./Pup.css";

class Pup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      id: "",
      name: "",
      breed: "",
      mix: "",
      age: "",
      size: "",
      playstyle: {
        nervous: null,
        rambunctious: null,
        gentle: null,
        wrestling: null,
        walks: null,
        parks: null,
        foodobsessed: null,
        ballobsessed: null,
      },
      description: "",
      owner: "",
      userPup: false,
    };
  }

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
  };

  componentDidMount() {
    const { pupId } = this.props.match.params;
    Promise.all([
      fetch(API_ENDPOINT + `/pups/${pupId}`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
      fetch(API_ENDPOINT + `/pups/user`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([responseData1, responseData2]) => {
        responseData2.map((pup) => {
          if (pup.id === responseData1.id) {
            this.setState({
              userPup: true,
            });
          }
        });
        this.setState({
          id: responseData1.id,
          name: responseData1.name,
          breed: responseData1.breed,
          mix: responseData1.mix,
          age: responseData1.age,
          size: responseData1.size,
          playstyle: {
            nervous: responseData1.nervous
              ? "I'm nervous or shy around other dogs."
              : null,
            rambunctious: responseData1.rambunctious
              ? "I'm rambunctious and playful."
              : null,
            gentle: responseData1.gentle ? "I play gently." : null,
            wrestling: responseData1.wrestling
              ? "I like playfighting and wrestling."
              : null,
            walks: responseData1.walks
              ? "I like going on walks with my pup pals."
              : null,
            parks: responseData1.parks
              ? "I like going to dog parks with my pup pals."
              : null,
            foodobsessed: responseData1.foodobsessed
              ? "I'm food-obsessed!"
              : null,
            ballobsessed: responseData1.ballobsessed
              ? "I love to play fetch!"
              : null,
          },
          description: responseData1.description,
          owner: responseData1.owner,
        });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="Pup">
        <h1>Hi, I'm {this.state.name}!</h1>
        {this.state.id ? (
          <img
            className="Pup-img"
            alt={this.state.name}
            src={`https://pupdate.s3-us-west-1.amazonaws.com/${this.state.id}`}
          />
        ) : null}
        <p>
          Breed:{" "}
          {this.state.breed.charAt(0).toUpperCase() + this.state.breed.slice(1)}{" "}
          {this.state.mix === "true" ? "Mix" : null}
          <br></br>
          Size: {PupSize(this.state.size)}
          <br></br>
          Age: {this.state.age}
        </p>
        <p>{this.state.description}</p>
        <h2>{this.state.name}'s Play Profile</h2>
        <ul>
          {Object.values(this.state.playstyle).map((p) => {
            return p !== null ? <li key={p}>{p}</li> : null;
          })}
        </ul>
        {this.state.userPup === true ? (
          <Link to={`/edit/pups/${this.state.id}`}>
            <button>Edit</button>
          </Link>
        ) : null}
        <div>
          <button onClick={this.handleBack}>Back</button>
        </div>
      </div>
    );
  }
}

export default Pup;
