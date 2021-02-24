import React from "react";
import TokenService from "../services/token-service";
import AuthApiService from "../services/auth-api-service";
import "./LoginForm.css";

class LoginForm extends React.Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  state = {
    error: null,
  };

  handleSubmitJwtAuth = (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    AuthApiService.postLogin({
      email: email.value,
      password: password.value,
    })
      .then((res) => {
        email.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={(e) => this.handleSubmitJwtAuth(e)}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          id="email"
          defaultValue="helenlabrador@madeup.com"
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          defaultValue="Secret12345!"
          required
        />
        <button type="submit">Log In!</button>
      </form>
    );
  }
}

export default LoginForm;
