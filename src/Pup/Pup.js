import React from "react";
import { Link } from "react-router-dom";
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
        nervous: "",
        rambunctious: "",
        gentle: "",
        wrestling: "",
        walks: "",
        parks: "",
        foodobsessed: "",
        ballobsessed: "",
      },
      description: "",
      owner: "",
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
    const { pupId } = this.props.match.params;
    fetch(API_ENDPOINT + `/pups/${pupId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(console.log(res.status));
        }
        return res.json();
      })
      .then((responseData) => {
        this.setState({
          id: responseData.id,
          name: responseData.name,
          breed: responseData.breed,
          mix: responseData.mix,
          age: responseData.age,
          size: responseData.size,
          playstyle: {
            nervous:
              responseData.nervous === true
                ? "I'm nervous or shy around other dogs."
                : "",
            rambunctious:
              responseData.rambunctious === true
                ? "I'm rambunctious and playful."
                : null,
            gentle: responseData.gentle === true ? "I play gently." : null,
            wrestling:
              responseData.wrestling === true
                ? "I like playfighting and wrestling."
                : null,
            walks:
              responseData.walks === true
                ? "I like going on walks with my pup pals."
                : null,
            parks:
              responseData.parks === true
                ? "I like going to dog parks with my pup pals."
                : null,
            foodobsessed:
              responseData.foodobsessed === true ? "I'm food-obsessed!" : null,
            ballobsessed:
              responseData.ballobsessed === true
                ? "I love to play fetch!"
                : null,
          },
          description: responseData.description,
          owner: responseData.owner,
        });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  render() {
    return (
      <div className="Pup">
        <h1>Hi, I'm {this.state.name}!</h1>
        {/* <img className="Pup-img" alt={this.state.pup.name} src={pupImage(pup.id)} /> */}
        <p>
          Breed:{" "}
          {this.state.breed.charAt(0).toUpperCase() + this.state.breed.slice(1)}{" "}
          {this.state.mix === "true" ? "Mix" : null}
          <br></br>
          Size: {this.state.size}
          <br></br>
          Age: {this.state.age}
        </p>
        <p>{this.state.description}</p>
        <ul>
          <h2>{this.state.name}'s Play Profile</h2>
          {Object.values(this.state.playstyle).map((p) => {
            return <li>{p}</li>;
          })}
        </ul>

        <Link to={`/edit/pups/${this.state.id}`}>
          <button>Edit</button>
        </Link>
      </div>
    );
  }
}

export default Pup;
