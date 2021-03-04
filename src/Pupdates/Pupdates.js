import React from "react";
// import { Link } from "react-router-dom";
import Pupdate from "../Pupdate/Pupdate";
import { API_ENDPOINT } from "../config";
import TokenService from "../services/token-service";
import "./Pupdates.css";

class Pupdates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pupdates: [],
      userPupdates: [],
      availablePupdates: [],
      myPupdates: [],
      error: null,
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(API_ENDPOINT + `/pupdates`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
      fetch(API_ENDPOINT + `/pupdate-rsvp/user`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([responseData1, responseData2]) =>
        this.setState({
          pupdates: responseData1,
          userPupdates: responseData2,
          myPupdates: responseData1.filter((pupdate) => {
            return responseData2.some((userPupdate) => {
              return userPupdate.pupdate === pupdate.id;
            });
          }),
          availablePupdates:
            responseData2.length === 0
              ? responseData1
              : responseData1.filter((pupdate) => {
                  return responseData2.some((userPupdate) => {
                    return userPupdate.pupdate !== pupdate.id;
                  });
                }),
        })
      )
      .catch((error) => {
        console.error({ error });
      });
  }

  render() {
    return (
      <div className="Pupdates">
        <section>
          <h2>My pupdates</h2>
          <div>
            {this.state.userPupdates.length === 0 ? (
              <p>You don't have any pupdates scheduled!</p>
            ) : (
              <ul>
                {this.state.myPupdates.map((myPupdate) => (
                  <li key={myPupdate.id}>
                    <Pupdate pupdate={myPupdate} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        <section>
          <h2 id="available">Available pupdates</h2>
          <div>
            <label htmlFor="Pupdates-sort">Sort by </label>
            <select>
              <option value="date-desc">Date (Newest to Oldest)</option>
              <option value="date-asc">Date (Oldest to Newest)</option>
            </select>
          </div>
          <div>
            <ul>
              {this.state.availablePupdates.map((availablePupdate) => (
                <li key={availablePupdate.id}>
                  <Pupdate pupdate={availablePupdate} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default Pupdates;
