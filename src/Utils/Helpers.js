import Eddie from "./images/eddie.jpg";
import Buddy from "./images/buddy.jpg";
import Fran from "./images/fran.jpg";
import Rover from "./images/rover.jpg";
import Speckles from "./images/speckles.jpg";

export function pupImage(pupId) {
  if (pupId === 1) {
    return Eddie;
  }
  if (pupId === 2) {
    return Buddy;
  }
  if (pupId === 3) {
    return Fran;
  }
  if (pupId === 4) {
    return Rover;
  }
  if (pupId === 5) {
    return Speckles;
  }
}

export function playstyles(playstyle) {
  if (playstyle === "nervous") {
    return "I'm nervous or shy around other dogs.";
  }
  if (playstyle === "gentle") {
    return "I play gently.";
  }
  if (playstyle === "food-obsessed") {
    return "I'm food-obsessed!";
  }
  if (playstyle === "walks") {
    return "I like going on walks with my pup pals.";
  }
  if (playstyle === "parks") {
    return "I like going to dog parks with my pup pals.";
  }
  if (playstyle === "wrestling") {
    return "I like playfighting and wrestling.";
  }
  if (playstyle === "rambunctious") {
    return "I'm rambunctious and playful.";
  }
  if (playstyle === "ball-obsessed") {
    return "I love to play fetch!";
  }
}
