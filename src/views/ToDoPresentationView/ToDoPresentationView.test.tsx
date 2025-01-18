import { ToDoPresentationView } from "./ToDoPresentationView";

import { renderWithState } from "../../tests/renders/renderWithState";
import { mockTodosState } from "../../tests/jest.constants";

describe("ToDoPresentationView.tsx", () => {
  describe("General Tests.", () => {
    test("It must render all categories.", () => {
      const { container } = renderWithState({
        children: <ToDoPresentationView></ToDoPresentationView>,
      });

      // eslint-disable-next-line
      const toDosContainer = container.querySelector(
        ".categories"
      ) as HTMLElement;

      expect(toDosContainer).toBeInTheDocument();

      // eslint-disable-next-line
      expect(toDosContainer?.children).toHaveLength(
        mockTodosState.categories.length
      );
    });
  });
});
