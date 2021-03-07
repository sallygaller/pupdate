import React from "react";

export default function RSVPButtons(props) {
  console.log(props.attending);
  if (props.attending === true) {
    return <button>I can no longer attend.</button>;
  }
  if (props.organized === true) {
    return (
      <div>
        <button>Delete </button>;<button>Edit</button>
      </div>
    );
  }
  if (props.attending === false) {
    return <button>I'll be there</button>;
  }
}
