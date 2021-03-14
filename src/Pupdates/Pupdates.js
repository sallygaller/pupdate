import React from "react";
import Pupdate from "../Pupdate/Pupdate";
import AvailablePupdates from "../AvailablePupdates/AvailablePupdates";
import { API_ENDPOINT } from "../config";
import TokenService from "../services/token-service";
import Accordion from "../Accordion/Accordion";
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
        <h2>Pupdates</h2>
        <section>
          <Accordion
            title="Pupdates I've Organized"
            pupdates={this.state.pupdateOrganized}
            userOrganized="true"
            userAttending="false"
          />
          <Accordion
            title="Pupdates I'm Attending"
            pupdates={this.state.pupdateAttending}
            userOrganized="false"
            userAttending="true"
          />
          <AvailablePupdates />
        </section>
      </div>
    );
  }
}

export default Pupdates;
