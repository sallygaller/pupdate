import React, { useState } from "react";
import SearchCityState from "../SearchCityState/SearchCityState";
import AuthApiService from "../services/auth-api-service";
import "./RegistrationForm.css";

export default function RegistrationForm(props) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  const Required = () => <span>*</span>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location === "") {
      setError("Please complete the 'City, State, Country' field below.");
    } else {
      let locationArray = location.split(",");
      const user = {
        firstname,
        lastname,
        email,
        password,
        city: locationArray[0],
        state: locationArray[1].trim(),
      };
      AuthApiService.postUser(user)
        .then((user) => {
          props.onRegistrationSuccess();
        })
        .catch((res) => {
          setError(res.error);
        });
    }
  };

  return (
    <form className="RegistrationForm" onSubmit={(e) => handleSubmit(e)}>
      <div className="RegistrationForm-error" role="alert">
        {error && (
          <p>
            {error.message}
            {error}
          </p>
        )}
      </div>
      <label htmlFor="first-name">
        First Name: <Required />
      </label>
      <input
        required
        type="text"
        value={firstname}
        id="first-name"
        onChange={(e) => setFirstname(e.target.value)}
      />
      <label htmlFor="last-name">
        Last Name: <Required />{" "}
      </label>
      <input
        required
        type="text"
        name="last-name"
        value={lastname}
        id="last-name"
        onChange={(e) => setLastname(e.target.value)}
      />
      <label htmlFor="email">
        Email: <Required />
      </label>
      <input
        required
        type="text"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">
        Password: <Required />
      </label>
      <p>
        (must be longer than 8 characters and contain 1 upper case, lower case,
        number and special character)
      </p>
      <input
        required
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="zip">
        City, State, Country: <Required />
      </label>{" "}
      <SearchCityState
        location={location}
        setLocation={setLocation}
        placeholder={"Portland, OR, USA"}
      />
      <button type="submit">Sign Up!</button>
    </form>
  );
}
