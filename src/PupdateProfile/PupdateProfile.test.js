import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import PupdateProfile from "./PupdateProfile";
import { pupdates } from "../Utils/TestFiles";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <PupdateProfile
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
      <BrowserRouter>
        <PupdateProfile
          pupdate={pupdates[0]}
          match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
