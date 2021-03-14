import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import TokenService from "../services/token-service";
import { API_ENDPOINT } from "../config";
import SearchLocationInput from "../SearchLocation/SearchLocation";
import moment from "moment";
import "./EditPupdate.css";

export default function EditPupdate(props) {
  const [error, setError] = useState(null);
  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  useEffect(() => {
    const { pupdateId } = props.match.params;
    fetch(API_ENDPOINT + `/pupdates/${pupdateId}`, {
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
        setId(responseData.id);
        setDate(responseData.date);
        setStarttime(responseData.starttime);
        setEndtime(responseData.endtime);
        setLocation(responseData.location);
        setDescription(responseData.description);
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const pupdate = {
      id,
      date,
      starttime,
      endtime,
      location,
      description,
    };
    fetch(API_ENDPOINT + `/pupdates/${pupdate.id}`, {
      method: "PATCH",
      body: JSON.stringify(pupdate),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));
      })
      .then(() => {
        history.push("/pupdates");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="EditPupdate">
      <h2>Edit pupdate</h2>
      <form className="EditPupdate-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="EditPupdate-error" role="alert">
          {error && (
            <p>
              {error.message}
              {error}
            </p>
          )}
        </div>
        <label htmlFor="location">Location:</label>
        <SearchLocationInput
          location={location}
          setLocation={setLocation}
          placeholder={"Enter a location (e.g. a local park)"}
        />
        <label htmlFor="date">Date: </label>
        <input
          type="date"
          value={moment(date).format("YYYY-MM-DD")}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <label htmlFor="startTime">Start Time: </label>
        <input
          type="time"
          value={starttime}
          onChange={(e) => setStarttime(e.target.value)}
        ></input>
        <label htmlFor="endTime">End Time: </label>
        <input
          type="time"
          value={endtime}
          onChange={(e) => setEndtime(e.target.value)}
        ></input>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          className="EditPupdate-textarea"
          rows="5"
          cols="10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
        <button type="button">Cancel</button>
      </form>
    </div>
  );
}
