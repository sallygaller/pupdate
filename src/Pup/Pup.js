import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TokenService from "../services/token-service";
import { API_ENDPOINT } from "../config";
import { playstyles, pupImage } from "../Utils/Helpers";
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

  playstyles = () => {
    if (this.state.nervous === "true") {
      return <li>I'm nervous or shy around other dogs.</li>;
    }
    if (this.state.gentle === "true") {
      return <li>I play gently.</li>;
    }
    if (this.state.foodobsessed === "true") {
      return <li>I'm food-obsessed!"</li>;
    }
    if (this.state.walks === "true") {
      return "I like going on walks with my pup pals.";
    }
    if (this.state.parks === "true") {
      return "I like going to dog parks with my pup pals.";
    }
    if (this.state.wrestling === "true") {
      return "I like playfighting and wrestling.";
    }
    if (this.state.rambunctious === "true") {
      return "I'm rambunctious and playful.";
    }
    if (this.state.ballobsessed === "true") {
      return "I love to play fetch!";
    }
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
            nervous: responseData.nervous,
            rambunctious: responseData.rambunctious,
            entle: responseData.gentle,
            wrestling: responseData.wrestling,
            walks: responseData.walks,
            parks: responseData.parks,
            foodobsessed: responseData.foodobsessed,
            ballobsessed: responseData.ballobsessed,
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
        <ul>{this.playstyles(this.state.playstyle)}</ul>
        <button>Back</button>
        {this.state.id === 1 ? (
          <Link to={`/edit/pups/${this.state.id}`}>
            <button>Edit</button>
          </Link>
        ) : null}
      </div>
    );
  }
}

export default Pup;
