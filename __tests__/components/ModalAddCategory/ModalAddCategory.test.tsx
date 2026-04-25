import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import type { ReactElement } from "react";
import type { RenderResult } from "@testing-library/react";

import ModalAddCategory from "@/components/ModalAddCategory/ModalAddCategory";

import { createTestStore } from "@tests/__mocks__/store.mock";

interface EmojiPickerProps {
  onEmojiClick: (event: MouseEvent, data: { emoji: string }) => void;
}

interface EmojiPickerModule {
  __esModule: boolean;
  default: (props: EmojiPickerProps) => ReactElement;
}

jest.mock(
  "emoji-picker-react",
  (): EmojiPickerModule => ({
    __esModule: true,
    default: ({ onEmojiClick }: EmojiPickerProps): ReactElement => (
      <button
        type="button"
        data-testid="emoji-picker-btn"
        onClick={(e): void => {
          onEmojiClick(e as unknown as MouseEvent, { emoji: "😀" });
        }}
      >
        Pick Emoji
      </button>
    ),
  })
);

const renderComponent = (): RenderResult =>
  render(
    <Provider store={createTestStore()}>
      <ModalAddCategory />
    </Provider>
  );

describe("ModalAddCategory", () => {
  describe("rendering", () => {
    it("should render the close button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Close add category dialog" })).toBeInTheDocument();
    });

    it("should render the emoji picker", () => {
      renderComponent();
      expect(screen.getByTestId("emoji-picker-btn")).toBeInTheDocument();
    });

    it("should render the category name input", () => {
      renderComponent();
      expect(screen.getByPlaceholderText("Category Name")).toBeInTheDocument();
    });

    it("should render the create button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Create new category" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should add a new category to the store when form is submitted", async () => {
      const user = userEvent.setup();
      const store = createTestStore();
      render(
        <Provider store={store}>
          <ModalAddCategory />
        </Provider>
      );
      await user.click(screen.getByTestId("emoji-picker-btn"));
      await user.type(screen.getByPlaceholderText("Category Name"), "Shopping");
      await user.click(screen.getByRole("button", { name: "Create new category" }));
      expect(
        store.getState().toDos.categories.some((c) => c.category === "Shopping" && c.icon === "😀")
      ).toBe(true);
    });

    it("should close the add category modal after submitting", async () => {
      const user = userEvent.setup();
      const store = createTestStore({
        global: {
          alert: { message: "", type: "" },
          modal: { modalAddCategory: true, modalManageToDo: false },
          sidebar: { sidebarMobile: false },
        },
      });
      render(
        <Provider store={store}>
          <ModalAddCategory />
        </Provider>
      );
      await user.click(screen.getByTestId("emoji-picker-btn"));
      await user.type(screen.getByPlaceholderText("Category Name"), "Shopping");
      await user.click(screen.getByRole("button", { name: "Create new category" }));
      expect(store.getState().global.modal.modalAddCategory).toBe(false);
    });

    it("should dispatch an alert after successfully adding a category", async () => {
      const user = userEvent.setup();
      const store = createTestStore();
      render(
        <Provider store={store}>
          <ModalAddCategory />
        </Provider>
      );
      await user.click(screen.getByTestId("emoji-picker-btn"));
      await user.type(screen.getByPlaceholderText("Category Name"), "Shopping");
      await user.click(screen.getByRole("button", { name: "Create new category" }));
      expect(store.getState().global.alert.type).toBe("alert--good");
      expect(store.getState().global.alert.message).toContain("Shopping");
    });

    it("should close the modal when the close button is clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore({
        global: {
          alert: { message: "", type: "" },
          modal: { modalAddCategory: true, modalManageToDo: false },
          sidebar: { sidebarMobile: false },
        },
      });
      render(
        <Provider store={store}>
          <ModalAddCategory />
        </Provider>
      );
      await user.click(screen.getByRole("button", { name: "Close add category dialog" }));
      expect(store.getState().global.modal.modalAddCategory).toBe(false);
    });
  });
});
