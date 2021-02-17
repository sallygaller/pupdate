import React, { useState } from "react";
import DatePicker from "react-datepicker";
import SearchLocationInput from "../SearchLocation/SearchLocation";
import "react-datepicker/dist/react-datepicker.css";
import "./AddPupdate.css";

export default function AddPupdat() {
  const [startDate, setStartDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="AddPupdate">
      <h2>New pupdate</h2>
      <form className="AddPupdate-form">
        <label htmlFor="date">Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <label htmlFor="time">Time:</label>
        <input></input>
        <label htmlFor="location">Location:</label>
        <SearchLocationInput location={location} setLocation={setLocation} />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          className="AddObservation-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
        <button type="button">Cancel</button>
      </form>
    </div>
  );
}