import { ToDoPresentationView } from "./ToDoPresentationView";

import { renderWithState } from "../../tests/renders/renderWithState";
import { TODOS_STATE_MOCK } from "../../tests/jest.setup";

test("It must render all categories.", () => {
  const { container } = renderWithState({
    children: <ToDoPresentationView></ToDoPresentationView>,
  });

  // eslint-disable-next-line
  const toDosContainer = container.querySelector(
    ".ToDos_container"
  ) as HTMLElement;

  expect(toDosContainer).toBeInTheDocument();

  // eslint-disable-next-line
  expect(toDosContainer?.children).toHaveLength(
    TODOS_STATE_MOCK.categories.length
  );
});
