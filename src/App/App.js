import React from "react";
import { Route, Link, Switch, withRouter } from "react-router-dom";
import AddPup from "../AddPup/AddPup";
import AddPupdate from "../AddPupdate/AddPupdate";
import AuthApiService from "../services/auth-api-service";
import AvailablePupdates from "../AvailablePupdates/AvailablePupdates";
import EditPup from "../EditPup/EditPup";
import EditPupdate from "../EditPupdate/EditPupdate";
import Error from "../Error/Error";
import IdleService from "../services/idle-service";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import Nav from "../Nav/Nav";
import Pupdates from "../Pupdates/Pupdates";
import MyPups from "../MyPups/MyPups";
import PrivateRoute from "../Utils/PrivateRoute";
import Pup from "../Pup/Pup";
import PupdateProfile from "../PupdateProfile/PupdateProfile";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import TokenService from "../services/token-service";
import "./App.css";

class App extends React.Component {
  state = {
    pupdates: [],
    pups: [],
    isLoggedIn: false,
    error: null,
  };

  componentDidMount() {
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle);

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      this.setState({
        isLoggedIn: true,
      });
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets();

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets();
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    this.setState({
      isLoggedIn: false,
    });
    /* remove the token from localStorage */
    TokenService.clearAuthToken();
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry();
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets();
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate();
  };

  handleSetError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true,
    });
    const { history } = this.props;
    history.push("/pupdates");
  };

  onLogout = () => {
    this.setState({
      isLoggedIn: false,
    });
    const { history } = this.props;
    history.push("/");
  };

  render() {
    return (
      <div className="App">
        <header>
          <Link to="/">
            <h1 className="App-h1">pupdate</h1>
          </Link>
          <Error>
            <Nav isLoggedIn={this.state.isLoggedIn} onLogout={this.onLogout} />
          </Error>
        </header>
        <main>
          <Switch>
            <Error>
              <Route exact path={"/"} component={LandingPage} />
              <PrivateRoute
                path={"/edit/pupdates/:pupdateId"}
                component={EditPupdate}
              />
              <PrivateRoute
                path={"/pupdates/:pupdateId"}
                component={PupdateProfile}
              />
              <PrivateRoute exact path={"/pupdates"} component={Pupdates} />
              <PrivateRoute
                path={"/availablepupdates"}
                component={AvailablePupdates}
              />
              <PrivateRoute path={"/new-pupdate"} component={AddPupdate} />
              <PrivateRoute path={"/pups/:pupId"} component={Pup} />
              <PrivateRoute exact path={"/pups"} component={MyPups} />
              <PrivateRoute path={"/edit/pups/:pupId"} component={EditPup} />
              <PrivateRoute path={"/addpup"} component={AddPup} />
              <Route path={"/register"} component={RegistrationPage} />
              <Route
                path={"/login"}
                render={() => <LoginPage onLogin={this.onLogin} />}
              />
            </Error>
          </Switch>
        </main>
        <footer>
          <p>Created by Sally Galler</p>
          <p>
            Photo by{" "}
            <a href="https://unsplash.com/@camilofierro14?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Camilo Fierro
            </a>{" "}
            on{" "}
            <a href="/s/photos/dogs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
          </p>
        </footer>
      </div>
    );
  }
}

export default withRouter(App);
