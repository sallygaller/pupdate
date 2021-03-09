import React from "react";
import { withRouter } from "react-router-dom";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import "./RegistrationPage.css";

class RegistrationPage extends React.Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  handleRegistrationSuccess = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="RegistrationPage">
        <h2>Welcome!</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </div>
    );
  }
}

export default withRouter(RegistrationPage);
