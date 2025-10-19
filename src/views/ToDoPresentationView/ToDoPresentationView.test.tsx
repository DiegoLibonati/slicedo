import { ToDoPresentationView } from "@src/views/ToDoPresentationView/ToDoPresentationView";

import { renderWithState } from "@tests/renders/renderWithState";
import { mockTodosState } from "@tests/jest.constants";

describe("ToDoPresentationView.tsx", () => {
  describe("General Tests.", () => {
    test("It must render all categories.", () => {
      const { container } = renderWithState({
        children: <ToDoPresentationView></ToDoPresentationView>,
      });

      const toDosContainer = container.querySelector(
        ".categories"
      ) as HTMLElement;

      expect(toDosContainer).toBeInTheDocument();

      expect(toDosContainer?.children).toHaveLength(
        mockTodosState.categories.length
      );
    });
  });
});
