import React from "react";
import Pupdate from "../Pupdate/Pupdate";
import Accordion from "../Accordion/Accordion";
import { API_ENDPOINT } from "../config";
import TokenService from "../services/token-service";
import "./AvailablePupdates.css";

class AvailablePupdates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availablePupdates: [],
      error: null,
    };
  }

  componentDidMount() {
    Promise.all([
      // get all pupdates
      fetch(API_ENDPOINT + `/pupdates`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
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
      .then(([res1, res2, res3]) =>
        Promise.all([res1.json(), res2.json(), res3.json()])
      )
      .then(([responseData1, responseData2, responseData3]) => {
        let finalArray = [];
        while (responseData2.length || responseData3.length) {
          let value;
          if (
            responseData3.length === 0 ||
            (responseData2.length &&
              responseData2[0].pupdate < responseData3[0].id)
          ) {
            value = responseData2[0].pupdate;
            responseData2.splice(0, 1);
          } else if (
            responseData2.length === 0 ||
            responseData2[0].pupdate > responseData3[0].id
          ) {
            value = responseData3[0].id;
            responseData3.splice(0, 1);
          } else {
            value = responseData2[0].pupdate;
            responseData2.splice(0, 1);
            responseData3.splice(0, 1);
          }
          finalArray.push(value);
        }
        // filter response data to see which pupdates user has RSVP'd to
        this.setState({
          availablePupdates: responseData1.filter((pupdate) => {
            return !finalArray.find((p) => p === pupdate.id);
          }),
        });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  render() {
    return (
      <div className="AvailablePupdates">
        <section>
          <div>
            <Accordion
              title="Available Pupdates"
              pupdates={this.state.availablePupdates}
              userOrganized="false"
              userAttending="false"
              availablePupdate="true"
            />
            {/* <ul>
              {this.state.availablePupdates.map((availablePupdate) => (
                <li key={availablePupdate.id}>
                  <Pupdate pupdate={availablePupdate} availablePupdate="true" />
                </li>
              ))}
            </ul> */}
          </div>
        </section>
      </div>
    );
  }
}

export default AvailablePupdates;
