import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { pupdates } from "../Utils/TestFiles";
import renderer from "react-test-renderer";
import EditPupdate from "./EditPupdate";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <EditPupdate
        name="EditPupdate"
        pupdate={pupdates[0]}
        match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
      />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as expected", () => {
  const tree = renderer
    .create(
      <EditPupdate
        name="EditPupdate"
        pupdate={pupdates[0]}
        match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
