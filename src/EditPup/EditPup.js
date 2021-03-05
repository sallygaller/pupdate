import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import TokenService from "../services/token-service";
import { API_ENDPOINT } from "../config";
import "./EditPup.css";

export default function EditPup(props) {
  const [breedList, setBreedList] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    age: "",
    size: "",
    breed: "",
    mix: "",
    nervous: "",
    rambunctious: "",
    gentle: "",
    wrestling: "",
    walks: "",
    parks: "",
    foodobsessed: "",
    ballobsessed: "",
    description: "",
  });

  useEffect(() => {
    const { pupId } = props.match.params;
    fetch(API_ENDPOINT + `/pups/${pupId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));
        return res.json();
      })
      .then((responseData) => {
        console.log(responseData);
        console.log(responseData.rambunctious);
        setFormState({
          id: responseData.id,
          name: responseData.name,
          age: responseData.age,
          size: responseData.size,
          breed: responseData.breed,
          mix: responseData.mix,
          nervous: responseData.nervous,
          rambunctious: responseData.rambunctious,
          gentle: responseData.gentle,
          wrestling: responseData.wrestling,
          walks: responseData.walks,
          parks: responseData.parks,
          foodobsessed: responseData.foodobsessed,
          ballobsessed: responseData.ballobsessed,
          description: responseData.description,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }, []);

  const onChange = (e) => {
    if (e.target.type === "checkbox" && !e.target.checked) {
      setFormState({ ...formState, [e.target.name]: "" });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list")
      .then((response) => response.json())
      .then((data) => {
        setBreedList(data.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const pup = {
      name: formState.name,
      breed: formState.breed,
      mix: formState.mix,
      age: formState.age,
      size: formState.size,
      nervous: formState.nervous,
      rambunctious: formState.rambunctious,
      gentle: formState.gentle,
      wrestling: formState.wrestling,
      walks: formState.walks,
      parks: formState.parks,
      foodobsessed: formState.foodobsessed,
      ballobsessed: formState.ballobsessed,
      description: formState.description,
    };
    fetch(API_ENDPOINT + `/pups`, {
      method: "POST",
      body: JSON.stringify(pup),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res.json();
      })
      .then((data) => {
        history.push("/pups");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleClickCancel = () => {
    history.push("/pups");
  };

  return (
    <div className="AddPup">
      <h2>Edit {formState.name}'s Profile</h2>
      <form className="AddPup-form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="pup-name">Name:</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          value={formState.name}
          onChange={onChange}
        />
        <label htmlFor="pup-breed">
          Breed (if your pup's a mixture, select the dominant breed):
        </label>
        <select
          name="breed"
          id="breed"
          value={formState.breed}
          onChange={onChange}
        >
          {Object.values(breedList).map((breed) => {
            return (
              <option value={breed}>
                {breed.charAt(0).toUpperCase() + breed.slice(1)}
              </option>
            );
          })}
        </select>
        <div className="AddPup-mix">
          <input
            className="pup-mix"
            type="checkbox"
            id="mix"
            name="mix"
            value={formState.mix}
            onChange={onChange}
          />
          <label htmlFor="pup-mix">My pup's a mix!</label>
        </div>
        <label htmlFor="pup-age">Age range:</label>
        <select
          required
          name="age"
          id="age"
          value={formState.age}
          onChange={onChange}
        >
          <option value="Puppy">Puppy (6-18 months)</option>
          <option value="Adult">Adult (18 months-6 years)</option>
          <option value="Senior">Senior (6 years and older)</option>
        </select>
        <label htmlFor="pup-size">Size:</label>
        <select
          required
          name="size"
          id="size"
          value={formState.size}
          onChange={onChange}
        >
          <option value="XS">Extra Small (under 10lbs)</option>
          <option value="S">Small (10-30lbs)</option>
          <option value="M">Medium (30-60lbs)</option>
          <option value="L">Large (60-90lbs)</option>
          <option value="XL">Extra Large (over 90lbs)</option>
        </select>
        <label htmlFor="pup-playstyle">Playstyle (check all that apply):</label>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="nervous"
            name="nervous"
            value={formState.nervous}
            checked={formState.nervous}
            onChange={onChange}
          />
          <label className="checkbox" htmlFor="nervous">
            Nervous/Shy
          </label>
        </div>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="rambunctious"
            name="rambunctious"
            checked={formState.rambunctious}
            value={formState.rambunctious}
            onChange={onChange}
          />
          <label className="checkbox" htmlFor="rambunctious">
            Rambunctious/Boisterous
          </label>
        </div>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="gentle"
            name="gentle"
            checked={formState.gentle}
            value={formState.gentle}
            onChange={onChange}
          />
          <label className="checkbox" htmlFor="gentle">
            Gentle play
          </label>
        </div>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="wrestling"
            name="wrestling"
            checked={formState.wrestling}
            value={formState.wrestling}
            onChange={onChange}
          />
          <label className="checkbox" htmlFor="wrestling">
            Playfighting/wrestling
          </label>
        </div>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="foodobsessed"
            name="foodobsessed"
            checked={formState.foodobsessed}
            value={formState.foodobsessed}
            onChange={onChange}
          />
          <label className="checkbox" htmlFor="foodobsessed">
            Food-obsessed
          </label>
        </div>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="ballobsessed"
            name="ballobsessed"
            checked={formState.ballobsessed}
            value={formState.ballobsessed}
            onChange={onChange}
          />
          <label className="checkbox" htmlFor="ballobsessed">
            Ball-obsessed
          </label>
        </div>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="walks"
            name="walks"
            checked={formState.walks}
            value={formState.walks}
            onChange={onChange}
          />
          <label className="checkbox" htmlFor="walks">
            Prefers walks
          </label>
        </div>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="parks"
            name="parks"
            checked={formState.parks}
            value={formState.parks}
            onChange={onChange}
          />
          <label className="checkbox" htmlFor="parks">
            Prefers off-leash parks
          </label>
        </div>
        <label htmlFor="pup-description">Description:</label>
        <input
          type="textarea"
          name="description"
          id="description"
          value={formState.description}
          onChange={onChange}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleClickCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
