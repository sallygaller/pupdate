import React from "react";
// import { Link } from "react-router-dom";
// import Pupdate from "../Pupdate/Pupdate";
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

  setMyPupdates = () => {
    console.log(this.state);
    this.setState({});
  };

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
          availablePupdates: responseData1.filter((pupdate) => {
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
    console.log(this.state);
    return (
      <div className="Pupdates">
        <section>
          <h2>My pupdates</h2>
          <div>
            {/* <ul>
              {this.state.userPupdates.map((pupdateRsvp) => {
                this.state.pupdates.filter();
              })}
            </ul> */}
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
            {/* <ul>
              {this.state.pupdates.map((pupdate) => (
                <li key={pupdate.id}>
                  <Link to={`/pupdates/${pupdate.id}`}>{pupdate.location}</Link>
                </li>
              ))}
            </ul> */}
          </div>
        </section>
      </div>
    );
  }
}

export default Pupdates;
