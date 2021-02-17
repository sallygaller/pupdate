import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Nav from "../Nav/Nav";
import AddPupdate from "../AddPupdate/AddPupdate";
import Pupdates from "../Pupdates/Pupdates";
import MyPups from "../MyPups/MyPups";
import Pup from "../Pup/Pup";
import "./App.css";

export default function App(props) {
  const { pups, pupdates } = props;
  return (
    <div className="App">
      <header>
        <Link to="/">
          <h1 className="App-h1">pupdate</h1>
        </Link>
        <Nav />
      </header>
      <main>
        <Switch>
          {/* <Route exact path={"/"} component={LandingPage} /> */}
          <Route
            path={"/pupdates"}
            render={() => <Pupdates pups={pups} pupdates={pupdates} />}
          />
          <Route
            path={"/pups/:pupId"}
            render={(props) => <Pup {...props} pups={pups} />}
          />
          <Route path={"/new-pupdate"} component={AddPupdate} />
          <Route
            path={"/pups"}
            render={(props) => <MyPups {...props} pups={pups} />}
          />
        </Switch>
      </main>
    </div>
  );
}
