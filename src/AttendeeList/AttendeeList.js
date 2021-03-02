// import React from "react";
// import TokenService from "../services/token-service";
// import { API_ENDPOINT } from "../config";

// class AttendeeList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pups: [],
//     };
//   }

//   componentDidMount() {
//     console.log("here!");
//     fetch(API_ENDPOINT + `/user/${this.props.pupdate.organizer}`, {
//       headers: {
//         authorization: `bearer ${TokenService.getAuthToken()}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(console.log(res.status));
//         }
//         return res.json();
//       })
//       .then((responseData) => {
//         this.setState({
//           organizer: responseData,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }
//   render() {
//     return <div></div>;
//   }
// }

// export default AttendeeList;
