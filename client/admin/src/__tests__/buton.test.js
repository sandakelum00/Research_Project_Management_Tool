import { renderer, screen, cleanup } from "@testing-library/react";
import Link from "../utils/links";

test("test button", () => {
  const component = renderer.create(<Link page="all-docs">Facebook</Link>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  renderer.act(() => {
    tree.props.onMouseEnter();
  });

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  renderer.act(() => {
    tree.props.onMouseLeave();
  });

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
