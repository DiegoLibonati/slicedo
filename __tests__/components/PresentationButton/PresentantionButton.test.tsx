import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import type { RenderResult } from "@testing-library/react";
import type { PresentantionButtonProps } from "@/types/props";

import PresentantionButton from "@/components/PresentationButton/PresentantionButton";

import { createTestStore } from "@tests/__mocks__/store.mock";

const renderComponent = (props: Partial<PresentantionButtonProps> = {}): RenderResult => {
  const defaultProps: PresentantionButtonProps = {
    idCategory: "cat-1",
    icon: "💼",
    category: "Work",
    ...props,
  };
  return render(
    <Provider store={createTestStore()}>
      <PresentantionButton {...defaultProps} />
    </Provider>
  );
};

describe("PresentantionButton", () => {
  describe("rendering", () => {
    it("should render the category button with an accessible label", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Select Work category" })).toBeInTheDocument();
    });

    it("should render with the provided icon and category", () => {
      renderComponent({ icon: "🏠", category: "Home" });
      expect(screen.getByRole("button", { name: "Select Home category" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should set the active category id in the store when clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore();
      render(
        <Provider store={store}>
          <PresentantionButton idCategory="cat-1" icon="💼" category="Work" />
        </Provider>
      );
      await user.click(screen.getByRole("button", { name: "Select Work category" }));
      expect(store.getState().toDos.viewIdCategory).toBe("cat-1");
    });
  });
});
