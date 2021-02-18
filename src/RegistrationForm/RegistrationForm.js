import React, { useState } from "react";
import SearchLocationInput from "../SearchLocation/SearchLocation";
import "./RegistrationForm.css";

export default function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  return (
    <form className="RegistrationForm">
      <label htmlFor="first-name">First name: </label>
      <input
        type="text"
        value={firstName}
        id="first-name"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="last-name">Last name: </label>
      <input
        type="text"
        name="last-name"
        value={lastName}
        id="last-name"
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor="email">Email: </label>
      <input
        type="text"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="zip">City: </label>{" "}
      <SearchLocationInput
        location={location}
        setLocation={setLocation}
        placeholder={"Enter a location"}
      />
      <button type="submit">Sign Up!</button>
    </form>
  );
}
