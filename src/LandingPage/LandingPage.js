import React from "react";
import { Link } from "react-router-dom";
import Screenshot1 from "../Utils/images/screenshot1.PNG";
import Screenshot2 from "../Utils/images/screenshot2.PNG";
import Screenshot3 from "../Utils/images/screenshot3.PNG";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <h2>Helping Pups Find Their Perfect Playmate</h2>
      <section>
        <h3>Create a Play Profile</h3>
        <img src={Screenshot1} alt="Screenshot of dog profile"></img>
        <p>
          Is your pup rowdy, shy, or ball obsessed? Does playing with a puppy
          make your senior dog feel young again? Include information about your
          dog's preferred playstyle to ensure a happy playdate!
        </p>
      </section>
      <section>
        <h3>Create a Meetup in Your Local Park</h3>
        <img src={Screenshot2} alt="Screenshot of form to add pupdate"></img>
        <p>
          Arrange playdates with other dog owners in your area by choosing a
          location, date, and time.
        </p>
      </section>
      <section>
        <h3>RSVP to Meetings</h3>
        <p>
          <img src={Screenshot3} alt="Screenshot of pupdate interface"></img>
        </p>
        <p>
          RSVP to pupdates happening in your area! Don't forget to check the pup
          profiles of other attendees to ensure a happy playdate.
        </p>
      </section>
      <section>
        <h3>Get Started with pupdate!</h3>
        <div className="LandingPage-link">
          <Link to="/register">Register here</Link>
        </div>
        <div className="LandingPage-link">
          <Link to="/login">Log in here</Link>
        </div>
      </section>
    </div>
  );
}
