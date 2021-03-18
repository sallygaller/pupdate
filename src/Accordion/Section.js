import React from "react";
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
        <button>toggle</button>
        <div className="sectionhead" onClick={this.handleClick}>
          <h3>{this.props.title}</h3>
        </div>
        <div className={this.state.open ? "animated" : "hidden"}>
          <div className="article">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Section;
