import React, { useState, useEffect } from "react";
import "./EditPup.css";

export default function EditPup(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");
  const [breed, setBreed] = useState("");
  const [breedList, setBreedList] = useState("");
  const [mix, setMix] = useState(false);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list")
      .then((response) => response.json())
      .then((data) => {
        setBreedList(data.message);
      });
  }, []);

  const handleClick = () => setMix(!mix);

  const pup = props.pups.find(
    ({ id }) => parseInt(id) === parseInt(props.match.params.pupId)
  );

  return (
    <div className="EditPup">
      <h2>Edit a Pup</h2>
      <form className="EditPup-form">
        <label htmlFor="pup-name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={pup.name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="pup-breed">
          Breed (if your pup's a mixture, select the dominant breed):
        </label>
        <select
          name="breed"
          id="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        >
          <option defaultValue={pup.breed}>
            {pup.breed.charAt(0).toUpperCase() + pup.breed.slice(1)}
          </option>
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
            id="pup-mix"
            name="pup-mix"
            value="pup-mix"
            defaultChecked={pup.mix === "true" ? true : false}
            onClick={handleClick}
          />
          <label htmlFor="pup-mix">My pup's a mix!</label>
        </div>
        <label htmlFor="pup-age">Age range:</label>
        <select
          name="pup-age"
          id="pup-age"
          value={pup.age}
          onChange={(e) => setAge(e.target.value)}
        >
          <option defaultValue={pup.age} disabled hidden>
            {pup.age}
          </option>
          <option value="Puppy">Puppy (6-18 months)</option>
          <option value="Adult">Adult (18 months-6 years)</option>
          <option value="Senior">Senior (6 years and older)</option>
        </select>
        <label htmlFor="pup-size">Size:</label>
        <select
          name="pup-size"
          id="pup-size"
          value={pup.size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option defaultValue={pup.size} disabled hidden>
            {pup.size}
          </option>
          <option value="XS">Extra Small (under 10lbs)</option>
          <option value="S">Small (10-30lbs)</option>
          <option value="M">Medium (30-60lbs)</option>
          <option value="L">Large (60-90lbs)</option>
          <option value="XL">Extra Large (over 90lbs)</option>
        </select>
        <label htmlFor="pup-playstyle">Playstyle (check all that apply):</label>
        <div className="EditPup-option">
          <input
            type="checkbox"
            id="playstyle1"
            name="playstyle1"
            value="Nervous"
          />
          <label className="checkbox" htmlFor="playstyle1">
            Nervous/Shy
          </label>
        </div>
        <div className="EditPup-option">
          <input
            type="checkbox"
            id="playstyle2"
            name="playstyle2"
            value="rambunctious"
          />
          <label className="checkbox" htmlFor="playstyle2">
            Rambunctious/Boisterous
          </label>
        </div>
        <div className="EditPup-option">
          <input
            type="checkbox"
            id="playstyle3"
            name="playstyle3"
            value="gentle"
          />
          <label className="checkbox" htmlFor="playstyle3">
            Gentle play
          </label>
        </div>
        <div className="EditPup-option">
          <input
            type="checkbox"
            id="playstyle4"
            name="playstyle4"
            value="playfighting"
          />
          <label className="checkbox" htmlFor="playstyle4">
            Playfighting/wrestling
          </label>
        </div>
        <div className="EditPup-option">
          <input
            type="checkbox"
            id="playstyle5"
            name="playstyle5"
            value="parks"
          />
          <label className="checkbox" htmlFor="playstyle5">
            Ball-obsessed
          </label>
        </div>
        <div className="EditPup-option">
          <input
            type="checkbox"
            id="playstyle6"
            name="playstyle6"
            value="parks"
          />
          <label className="checkbox" htmlFor="playstyle6">
            Food-obsessed
          </label>
        </div>
        <div className="EditPup-option">
          <input
            type="checkbox"
            id="playstyle7"
            name="playstyle7"
            value="walks"
          />
          <label className="checkbox" htmlFor="playstyle7">
            Prefers walks
          </label>
        </div>
        <div className="EditPup-option">
          <input
            type="checkbox"
            id="playstyle8"
            name="playstyle8"
            value="parks"
          />
          <label className="checkbox" htmlFor="playstyle8">
            Prefers off-leash parks
          </label>
        </div>
        <button type="submit">Submit</button>
        <button type="button">Cancel</button>
      </form>
    </div>
  );
}
