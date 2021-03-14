import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import TokenService from "../services/token-service";
import FormData from "form-data";
import { API_ENDPOINT } from "../config";
import "./AddPup.css";

export default function AddPup() {
  const [breedList, setBreedList] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const [uploads, setUploads] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    age: "",
    size: "",
    breed: "",
    mix: false,
    nervous: false,
    rambunctious: false,
    gentle: false,
    wrestling: false,
    walks: false,
    parks: false,
    foodobsessed: false,
    ballobsessed: false,
    description: "",
  });

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
    const pupPic = uploads;
    const form = new FormData();
    form.append("uploads", pupPic);
    form.get("uploads");
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
        let newPupId = data.id;
        return fetch(API_ENDPOINT + `/pups/upload`, {
          method: "POST",
          body: form,
          headers: {
            key: newPupId,
            authorization: `bearer ${TokenService.getAuthToken()}`,
          },
        });
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
        console.error({ error });
      });
  };

  const onChangePic = (e) => {
    setUploads(e.target.files[0]);
    // setUploads({ uploads: e.target.files[0] });
  };

  const handleClickCancel = () => {
    history.push("/pups");
  };

  return (
    <div className="AddPup">
      <h2>Add a Pup</h2>
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
              <option key={breed} value={breed}>
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
          <option key="puppy" value="Puppy">
            Puppy (6-18 months)
          </option>
          <option key="adult" value="Adult">
            Adult (18 months-6 years)
          </option>
          <option key="senior" value="Senior">
            Senior (6 years and older)
          </option>
        </select>
        <label htmlFor="pup-size">Size:</label>
        <select
          required
          name="size"
          id="size"
          value={formState.size}
          onChange={onChange}
        >
          <option key="xs" value="XS">
            Extra Small (under 10lbs)
          </option>
          <option key="s" value="S">
            Small (10-30lbs)
          </option>
          <option key="m" value="M">
            Medium (30-60lbs)
          </option>
          <option key="l" value="L">
            Large (60-90lbs)
          </option>
          <option key="xl" value="XL">
            Extra Large (over 90lbs)
          </option>
        </select>
        <label htmlFor="pup-playstyle">Playstyle (check all that apply):</label>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="nervous"
            name="nervous"
            value={formState.nervous}
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
            value={formState.parks}
            onChange={onChange}
          />
          <label className="checkbox" htmlFor="parks">
            Prefers off-leash parks
          </label>
        </div>
        <label htmlFor="pup-description">Description:</label>
        <textarea
          id="description"
          name="description"
          className="AddPupdate-textarea"
          rows="5"
          cols="10"
          value={formState.description}
          onChange={onChange}
        />
        <label htmlFor="pup-pic">Photo:</label>
        <input
          type="file"
          name="uploads"
          id="uploads"
          onChange={(e) => onChangePic(e)}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleClickCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
