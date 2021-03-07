import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <nav className="Nav">
      <Link to="/availablepupdates">Available Pupdates</Link>{" "}
      <Link to="/pupdates">My Pupdates</Link>{" "}
      <Link to="/new-pupdate">New Pupdate</Link> <Link to="/pups">My Pups</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Log In</Link>
    </nav>
  );
}
