import React from "react";
import Pupdate from "../Pupdate/Pupdate";
import "./Accordion.css";

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      class: "section",
    };
  }

  handleClick = () => {
    if (this.state.open) {
      this.setState({
        open: false,
        class: "section",
      });
    } else {
      this.setState({
        open: true,
        class: "section open",
      });
    }
  };

  render() {
    return (
      <div className={this.state.class}>
        <div className="sectionhead" onClick={this.handleClick}>
          <h3>{this.props.title}</h3>
        </div>
        <div className={this.state.open ? "page" : "page fadeOut"}>
          <div className="article">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Section;
