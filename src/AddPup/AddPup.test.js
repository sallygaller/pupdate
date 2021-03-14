import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import AddPup from "./AddPup";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <AddPup />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as expected", () => {
  const tree = renderer.create(<AddPup name="AddPup" />).toJSON();
  expect(tree).toMatchSnapshot();
});
