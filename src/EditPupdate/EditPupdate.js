import React, { useState } from "react";
import SearchLocationInput from "../SearchLocation/SearchLocation";
import "./EditPupdate.css";

export default function EditPupdate(props) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const pupdate = props.pupdates.find(
    ({ id }) => parseInt(id) === parseInt(props.match.params.pupdateId)
  );

  return (
    <div className="EditPupdate">
      <h2>Edit pupdate</h2>
      <form className="EditPupdate-form">
        <label htmlFor="date">Date: </label>
        <input
          type="date"
          value={pupdate.date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <label htmlFor="startTime">Start Time: </label>
        <input
          type="time"
          value={pupdate.startTime}
          onChange={(e) => setStartTime(e.target.value)}
        ></input>
        <label htmlFor="endTime">End Time: </label>
        <input
          type="time"
          value={pupdate.endTime}
          onChange={(e) => setEndTime(e.target.value)}
        ></input>
        <label htmlFor="location">Location:</label>
        <SearchLocationInput
          location={location}
          setLocation={setLocation}
          placeholder={"Enter a location (e.g. a local park)"}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          className="EditPupdate-textarea"
          rows="5"
          cols="10"
          value={pupdate.description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
        <button type="button">Cancel</button>
      </form>
    </div>
  );
}
