import React, { useState } from "react";
import SearchLocationInput from "../SearchLocation/SearchLocation";
import "./AddPupdate.css";

export default function AddPupdat() {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="AddPupdate">
      <h2>New pupdate</h2>
      <form className="AddPupdate-form">
        <label htmlFor="date">Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <label htmlFor="startTime">Start Time: </label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        ></input>
        <label htmlFor="endTime">End Time: </label>
        <input
          type="time"
          value={endTime}
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
          className="AddPupdate-textarea"
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
