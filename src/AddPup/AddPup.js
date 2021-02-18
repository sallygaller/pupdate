import React, { useState } from "react";
import "./AddPup.css";

export default function AddPupdat() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");

  return (
    <div className="AddPup">
      <h2>Add a Pup</h2>
      <form className="AddPup-form">
        <label htmlFor="pup-name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="pup-age">Age range:</label>
        <select
          name="pup-age"
          id="pup-age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        >
          <option>Puppy (6-18 months)</option>
          <option>Adult (18 months-6 years)</option>
          <option>Senior (6 years and older)</option>
        </select>
        <label htmlFor="pup-size">Size:</label>
        <select
          name="pup-size"
          id="pup-size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option>Extra Small (under 10lbs)</option>
          <option>Small (10-30lbs)</option>
          <option>Medium (30-60lbs)</option>
          <option>Large (60-90lbs)</option>
          <option>Extra Large (over 90lbs)</option>
        </select>
        <label for="pup-playstyle">Playstyle (check all that apply):</label>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="playstyle1"
            name="playstyle1"
            value="Nervous"
          />
          <label class="checkbox" for="playstyle1">
            Nervous/Shy
          </label>
        </div>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="playstyle2"
            name="playstyle2"
            value="rambunctious"
          />
          <label class="checkbox" for="playstyle2">
            Rambunctious/Boisterous
          </label>
        </div>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="playstyle3"
            name="playstyle3"
            value="gentle"
          />
          <label class="checkbox" for="playstyle3">
            Gentle play
          </label>
        </div>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="playstyle4"
            name="playstyle4"
            value="playfighting"
          />
          <label class="checkbox" for="playstyle4">
            Playfighting/wrestling
          </label>
        </div>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="playstyle5"
            name="playstyle5"
            value="parks"
          />
          <label class="checkbox" for="playstyle5">
            Ball-obsessed
          </label>
        </div>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="playstyle6"
            name="playstyle6"
            value="parks"
          />
          <label class="checkbox" for="playstyle6">
            Food-obsessed
          </label>
        </div>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="playstyle7"
            name="playstyle7"
            value="walks"
          />
          <label class="checkbox" for="playstyle7">
            Prefers walks
          </label>
        </div>
        <div className="AddPup-option">
          <input
            type="checkbox"
            id="playstyle8"
            name="playstyle8"
            value="parks"
          />
          <label class="checkbox" for="playstyle8">
            Prefers off-leash parks
          </label>
        </div>
        <button type="submit">Submit</button>
        <button type="button">Cancel</button>
      </form>
    </div>
  );
}
