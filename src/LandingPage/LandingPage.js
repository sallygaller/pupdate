import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <h2>Helping Pups Find Their Perfect Playmate</h2>
      <section>
        <h3>Create a Play Profile</h3>
        <p>
          [<em>placeholder for screenshot of creating a profile</em>]
        </p>
        <p>
          Is your pup rowdy, shy, or ball obsessed? Does playing with a puppy
          make your senior dog feel young again? Include information about your
          dog's preferred playstyle to ensure a happy playdate!
        </p>
      </section>
      <section>
        <h3>Create a Meetup in Your Local Park</h3>
        <p>
          [<em>placeholder for creating a meetup</em>]
        </p>
        <p>
          Arrange playdates with other dog owners in your area by choosing a
          location, date, and time.
        </p>
      </section>
      <section>
        <h3>RSVP to Meetings</h3>
        <p>
          [<em>placeholder for screenshot of RSVP/comment interface</em>]
        </p>
        <p>
          Search for and RSVP to pupdates happening in your area. View your
          previous meetups so you can arrange them again at a moment's notice!
        </p>
      </section>
      <section>
        <h3>Get Started with pupdate!</h3>
        <Link to="/register">Register here</Link>
        <br></br>
        <Link to="/login">Log in here</Link>
      </section>
    </div>
  );
}
