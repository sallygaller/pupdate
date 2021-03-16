import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { pups } from "../Utils/TestFiles";
import renderer from "react-test-renderer";
import EditPup from "./EditPup";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <EditPup
        name="EditPup"
        pup={pups[0]}
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
      <EditPup
        name="EditPup"
        pup={pups[0]}
        match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
