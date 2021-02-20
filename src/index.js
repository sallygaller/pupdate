import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App/App";

const PUPDATES = [
  {
    id: 1,
    date: "01/03/2021",
    startTime: "15:30",
    endTime: "16:30",
    location: "Arbor Lodge Park",
    organizer: 3,
  },
  {
    id: 2,
    date: "02/03/2021",
    startTime: "09:30",
    endTime: "11:00",
    location: "Arbor Lodge Park",
    organizer: 1,
  },
  {
    id: 3,
    date: "03/15/2021",
    startTime: "09:30",
    endTime: "10:30",
    location: "Cathedral Park",
    organizer: 1,
  },
  {
    id: 4,
    date: "02/15/2021",
    startTime: "10:30",
    endTime: "11:30",
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
    playstyle: [
      { id: 4, style: "nervous" },
      { id: 3, style: "food-obsessed" },
      { id: 5, style: "walks" },
      { id: 6, style: "gentle" },
    ],
    owner: 1,
  },
  {
    id: 2,
    name: "Buddy",
    age: "Adult",
    size: "L",
    playstyle: [
      { id: 1, style: "rambunctious" },
      { id: 2, style: "parks" },
      { id: 3, style: "food-obsessed" },
    ],
    owner: 2,
  },
  {
    id: 3,
    name: "Fran",
    age: "Adult",
    size: "L",
    playstyle: [
      { id: 1, style: "rambunctious" },
      { id: 2, style: "parks" },
      { id: 7, style: "wrestling" },
    ],
    owner: 2,
  },
  {
    id: 4,
    name: "Rover",
    age: "Puppy",
    size: "S",
    playstyle: [
      { id: 1, style: "rambunctious" },
      { id: 2, style: "parks" },
      { id: 8, style: "ball-obsessed" },
    ],
    owner: 3,
  },
  {
    id: 5,
    name: "Speckles",
    age: "Senior",
    size: "M",
    playstyle: [
      { id: 3, style: "food-obsessed" },
      { id: 5, style: "walks" },
      { id: 6, style: "gentle" },
    ],
    owner: 4,
  },
];

ReactDOM.render(
  <BrowserRouter>
    <App pupdates={PUPDATES} pups={PUPS} />
  </BrowserRouter>,
  document.getElementById("root")
);
