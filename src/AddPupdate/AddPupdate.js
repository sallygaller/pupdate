import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddPupdate.css";

export default function AddPupdat() {
  const [startDate, setStartDate] = useState(new Date());

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
        <input></input>
        <label htmlFor="description">Description:</label>
        <input></input>
        <button type="submit">Submit</button>
        <button type="button">Cancel</button>
      </form>
    </div>
  );
}
