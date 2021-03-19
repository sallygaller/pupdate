import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Pupdate from "./Pupdate";
import { pupdates } from "../Utils/TestFiles";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Pupdate pupdate={pupdates[0]} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as expected", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Pupdate pupdate={pupdates[0]} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
