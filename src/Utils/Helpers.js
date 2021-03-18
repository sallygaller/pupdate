export default function PupSize(size) {
  let sizeText = "";
  if (size === "XS") {
    sizeText = "Extra Small (under 10lbs)";
  } else if (size === "S") {
    sizeText = "Small (10-30lbs)";
  } else if (size === "M") {
    sizeText = "Medium (30-60lbs)";
  } else if (size === "L") {
    sizeText = "Large (60-90lbs)";
  } else if (size === "XL") {
    sizeText = "Extra Large (over 90lbs)";
  }
  return sizeText;
}
