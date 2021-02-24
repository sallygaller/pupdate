import React from "react";
import Pupdate from "../Pupdate/Pupdate";
import { API_ENDPOINT } from "../config";
import TokenService from "../services/token-service";
import "./Pupdates.css";

class Pupdates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pupdates: [],
      error: null,
    };
  }

  componentDidMount() {
    fetch(API_ENDPOINT + `/pupdates`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(console.log(res.status));
        }
        return res.json();
      })
      .then((pupdates) => {
        this.setState({
          pupdates: pupdates,
        });
        console.log(this.state.pupdates);
      })
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
            <ul>
              {this.state.pupdates.map((pupdate) =>
                pupdate.organizer === 1 ? (
                  <li key={pupdate.id}>
                    <Pupdate pupdate={pupdate} />
                  </li>
                ) : null
              )}
            </ul>
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
              {this.state.pupdates.map((pupdate) =>
                pupdate.organizer !== 1 ? (
                  <li key={pupdate.id}>
                    <Pupdate pupdate={pupdate} />
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default Pupdates;
