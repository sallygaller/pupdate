import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App/App";

const PUPDATES = [
  {
    id: 1,
    date: "01/03/2021",
    time: "15:30",
    location: "Arbor Lodge Park",
    organizer: 3,
  },
  {
    id: 2,
    date: "02/03/2021",
    time: "09:30",
    location: "Arbor Lodge Park",
    organizer: 1,
  },
  {
    id: 3,
    date: "03/15/2021",
    time: "09:30",
    location: "Cathedral Park",
    organizer: 1,
  },
  {
    id: 4,
    date: "02/15/2021",
    time: "10:30",
    location: "Portsmouth Park",
    organizer: 2,
  },
];

const PUPS = [
  {
    id: 1,
    name: "Eddie",
    age: "Adult",
    size: "M",
    playstyle: ["nervous", "food-obsessed", "walks", "gentle"],
    owner: 1,
  },
  {
    id: 2,
    name: "Red",
    age: "Adult",
    size: "L",
    playstyle: ["rambunctious", "parks", "food-obsessed"],
    owner: 2,
  },
  {
    id: 3,
    name: "Merle",
    age: "Adult",
    size: "L",
    playstyle: ["rambunctious", "parks", "wrestling"],
    owner: 2,
  },
  {
    id: 4,
    name: "Rover",
    age: "Puppy",
    size: "S",
    playstyle: ["rambunctious", "parks", "ball-obsessed"],
    owner: 3,
  },
  {
    id: 5,
    name: "Speckles",
    age: "Senior",
    size: "M",
    playstyle: ["gentle", "walks", "food-obsessed"],
    owner: 4,
  },
];

ReactDOM.render(
  <BrowserRouter>
    <App pupdates={PUPDATES} pups={PUPS} />
  </BrowserRouter>,
  document.getElementById("root")
);
