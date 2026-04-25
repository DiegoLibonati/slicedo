import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import type { RenderResult } from "@testing-library/react";

import PresentationView from "@/views/PresentationView/PresentationView";

import { createTestStore } from "@tests/__mocks__/store.mock";
import { mockCategories } from "@tests/__mocks__/categories.mock";

const defaultToDosState = {
  categories: mockCategories,
  loading: false,
  viewIdCategory: "",
  idToDoToEdit: "",
};

const renderView = (): RenderResult =>
  render(
    <Provider store={createTestStore({ toDos: defaultToDosState })}>
      <PresentationView />
    </Provider>
  );

describe("PresentationView", () => {
  describe("rendering", () => {
    it("should render a button for each category", () => {
      renderView();
      expect(screen.getByRole("button", { name: "Select Work category" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Select Important category" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Select Tasks category" })).toBeInTheDocument();
    });

    it("should render no buttons when categories are empty", () => {
      render(
        <Provider store={createTestStore({ toDos: { ...defaultToDosState, categories: [] } })}>
          <PresentationView />
        </Provider>
      );
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should set the active category when a category button is clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore({ toDos: defaultToDosState });
      render(
        <Provider store={store}>
          <PresentationView />
        </Provider>
      );
      await user.click(screen.getByRole("button", { name: "Select Work category" }));
      expect(store.getState().toDos.viewIdCategory).toBe("cat-1");
    });
  });
});
