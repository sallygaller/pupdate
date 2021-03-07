import React from "react";
import Pupdate from "../Pupdate/Pupdate";
import { API_ENDPOINT } from "../config";
import TokenService from "../services/token-service";
import "./Pupdates.css";

class Pupdates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pupdateOrganized: [],
      pupdateAttending: [],
      error: null,
    };
  }

  componentDidMount() {
    Promise.all([
      // get pupdate rsvps for logged in user
      fetch(API_ENDPOINT + `/pupdate-rsvp/user`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
      // get pupdates that user has organized
      fetch(API_ENDPOINT + `/pupdates/user`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([responseData1, responseData2]) => {
        this.setState({
          pupdateOrganized: responseData2,
        });
        Promise.all(
          responseData1.map((pupdateRsvp) =>
            fetch(API_ENDPOINT + `/pupdates/${pupdateRsvp.pupdate}`, {
              headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`,
              },
            })
          )
        )
          .then((responses) => {
            return Promise.all(
              responses.map((response) => {
                return response.json();
              })
            );
          })
          .then((data) => {
            console.log(data);
            this.setState({
              pupdateAttending: data,
            });
          });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  render() {
    return (
      <div className="Pupdates">
        <section>
          <h3>Pupdates I've organized:</h3>
          {this.state.pupdateOrganized.length === 0 ? (
            <p>You haven't organized a pupdate</p>
          ) : (
            <ul>
              {this.state.pupdateOrganized.map((pupdate) => (
                <li key={pupdate.id}>
                  <Pupdate pupdate={pupdate} userOrganized="true" />
                </li>
              ))}
            </ul>
          )}
          <h3>Pupdates I'm attending</h3>
          <div>
            <ul>
              {this.state.pupdateAttending.map((pupdate) => (
                <li key={pupdate.id}>
                  <Pupdate pupdate={pupdate} userAttending="true" />
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
