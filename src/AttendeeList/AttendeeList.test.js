import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import PupdateProfile from "../PupdateProfile/PupdateProfile";
import { pups, pupdates } from "../Utils/TestFiles";
import AttendeeList from "./AttendeeList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <AttendeeList attendees={[pups]} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as expected", () => {
  const tree = renderer
    .create(
      <PupdateProfile
        pupdate={pupdates[0]}
        match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
      >
        <AttendeeList name="AttendeeList" attendees={[pups]} />
      </PupdateProfile>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
