import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import "./LoginPage.css";

class LoginPage extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = () => {
    this.props.history.push("/pupdates");
    this.props.onLogin();
  };

  render() {
    return (
      <div className="LoginPage">
        <h2>Log in</h2>
        <p>For demo purposes, please use the login credentials provided.</p>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
      </div>
    );
  }
}

export default LoginPage;
