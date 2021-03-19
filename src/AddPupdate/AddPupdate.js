import React, { useState } from "react";
import { useHistory } from "react-router";
import SearchLocationInput from "../SearchLocation/SearchLocation";
import TokenService from "../services/token-service";
import { API_ENDPOINT } from "../config";
import "./AddPupdate.css";

export default function AddPupdate() {
  const history = useHistory();
  const [date, setDate] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const Required = () => <span>*</span>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const pupdate = {
      date,
      starttime,
      endtime,
      location,
      description,
    };
    fetch(API_ENDPOINT + `/pupdates`, {
      method: "POST",
      body: JSON.stringify(pupdate),
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
        history.push("/pupdates");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleClickCancel = () => {
    history.push("/pupdates");
  };

  return (
    <div className="AddPupdate">
      <h2>New Pupdate</h2>
      <form className="AddPupdate-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="AddPupdate-error" role="alert">
          {error && (
            <p>
              {error.message}
              {error}
            </p>
          )}
        </div>
        <label htmlFor="location">
          Location:
          <Required />
        </label>
        <SearchLocationInput
          required
          location={location}
          setLocation={setLocation}
          placeholder={"Enter a location (e.g. a local park)"}
        />
        <label htmlFor="date">
          Date:
          <Required />
        </label>
        <input
          required
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="starttime">
          Start Time:
          <Required />
        </label>
        <input
          required
          id="starttime"
          type="time"
          value={starttime}
          onChange={(e) => setStarttime(e.target.value)}
        />
        <label htmlFor="endtime">
          End Time
          <Required />{" "}
        </label>
        <input
          required
          id="endtime"
          type="time"
          value={endtime}
          onChange={(e) => setEndtime(e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          className="AddPupdate-textarea"
          rows="5"
          cols="10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit</button>{" "}
        <button type="button" onClick={handleClickCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
