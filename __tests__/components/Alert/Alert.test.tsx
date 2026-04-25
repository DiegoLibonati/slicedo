import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import type { RenderResult } from "@testing-library/react";
import type { TestPreloadedState } from "@tests/__mocks__/store.mock";

import Alert from "@/components/Alert/Alert";

import { createTestStore } from "@tests/__mocks__/store.mock";

const renderComponent = (preloadedState: TestPreloadedState = {}): RenderResult =>
  render(
    <Provider store={createTestStore(preloadedState)}>
      <Alert />
    </Provider>
  );

describe("Alert", () => {
  describe("rendering", () => {
    it("should render the alert container", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLDivElement>(".alert")).toBeInTheDocument();
    });

    it("should render the dismiss button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Dismiss alert" })).toBeInTheDocument();
    });

    it("should render the alert message text when provided", () => {
      renderComponent({
        global: {
          alert: { message: "Task completed!", type: "alert--good" },
          modal: { modalAddCategory: false, modalManageToDo: false },
          sidebar: { sidebarMobile: false },
        },
      });
      expect(screen.getByText("Task completed!")).toBeInTheDocument();
    });

    it("should apply the alert type class when a message is set", () => {
      const { container } = renderComponent({
        global: {
          alert: { message: "Error!", type: "alert--bad" },
          modal: { modalAddCategory: false, modalManageToDo: false },
          sidebar: { sidebarMobile: false },
        },
      });
      expect(container.querySelector<HTMLDivElement>(".alert")).toHaveClass("alert--bad");
    });

    it("should apply only the base class when no message is set", () => {
      const { container } = renderComponent({
        global: {
          alert: { message: "", type: "" },
          modal: { modalAddCategory: false, modalManageToDo: false },
          sidebar: { sidebarMobile: false },
        },
      });
      expect(container.querySelector<HTMLDivElement>(".alert")).toHaveAttribute("class", "alert");
    });
  });

  describe("behavior", () => {
    it("should reset the alert in the store when the dismiss button is clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore({
        global: {
          alert: { message: "Test message", type: "alert--good" },
          modal: { modalAddCategory: false, modalManageToDo: false },
          sidebar: { sidebarMobile: false },
        },
      });
      render(
        <Provider store={store}>
          <Alert />
        </Provider>
      );
      await user.click(screen.getByRole("button", { name: "Dismiss alert" }));
      expect(store.getState().global.alert.message).toBe("");
      expect(store.getState().global.alert.type).toBe("");
    });
  });
});
