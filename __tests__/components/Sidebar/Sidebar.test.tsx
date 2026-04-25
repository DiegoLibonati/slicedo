import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import type { ReactElement } from "react";
import type { RenderResult } from "@testing-library/react";

import Sidebar from "@/components/Sidebar/Sidebar";

import { createTestStore } from "@tests/__mocks__/store.mock";
import { mockCategories } from "@tests/__mocks__/categories.mock";

interface EmojiPickerModule {
  __esModule: boolean;
  default: () => ReactElement;
}

interface MediaQueryMock {
  matches: boolean;
  media: string;
  onchange: null;
  addListener: () => void;
  removeListener: () => void;
  addEventListener: () => void;
  removeEventListener: () => void;
  dispatchEvent: () => boolean;
}

const defaultToDosState = {
  categories: mockCategories,
  loading: false,
  viewIdCategory: "",
  idToDoToEdit: "",
};

jest.mock(
  "emoji-picker-react",
  (): EmojiPickerModule => ({
    __esModule: true,
    default: (): ReactElement => <div data-testid="emoji-picker">Emoji Picker</div>,
  })
);

const renderComponent = (): RenderResult =>
  render(
    <Provider store={createTestStore({ toDos: defaultToDosState })}>
      <Sidebar />
    </Provider>
  );

describe("Sidebar", () => {
  describe("rendering", () => {
    it("should render the sidebar title", () => {
      renderComponent();
      expect(screen.getByText("Slicedo")).toBeInTheDocument();
    });

    it("should render a sidebar item for each category", () => {
      renderComponent();
      expect(screen.getByRole("heading", { name: "💼Work" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "⚠️Important" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "🎯Tasks" })).toBeInTheDocument();
    });

    it("should render the add category button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Add new category" })).toBeInTheDocument();
    });

    it("should render the loader when loading is true", () => {
      const { container } = render(
        <Provider store={createTestStore({ toDos: { ...defaultToDosState, loading: true } })}>
          <Sidebar />
        </Provider>
      );
      expect(container.querySelector<HTMLDivElement>(".loader")).toBeInTheDocument();
    });

    it("should not render the sidebar content when loading", () => {
      render(
        <Provider store={createTestStore({ toDos: { ...defaultToDosState, loading: true } })}>
          <Sidebar />
        </Provider>
      );
      expect(screen.queryByText("Slicedo")).not.toBeInTheDocument();
    });

    it("should render ModalAddCategory when modalAddCategory is true", () => {
      render(
        <Provider
          store={createTestStore({
            toDos: defaultToDosState,
            global: {
              alert: { message: "", type: "" },
              modal: { modalAddCategory: true, modalManageToDo: false },
              sidebar: { sidebarMobile: false },
            },
          })}
        >
          <Sidebar />
        </Provider>
      );
      expect(screen.getByTestId("emoji-picker")).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should open the add category modal when the add button is clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore({ toDos: defaultToDosState });
      render(
        <Provider store={store}>
          <Sidebar />
        </Provider>
      );
      await user.click(screen.getByRole("button", { name: "Add new category" }));
      expect(store.getState().global.modal.modalAddCategory).toBe(true);
    });

    it("should set the active category and open the sidebar when a category is clicked on mobile", async () => {
      const user = userEvent.setup();
      const store = createTestStore({ toDos: defaultToDosState });
      render(
        <Provider store={store}>
          <Sidebar />
        </Provider>
      );
      await user.click(screen.getByRole("heading", { name: "💼Work" }));
      expect(store.getState().toDos.viewIdCategory).toBe("cat-1");
      expect(store.getState().global.sidebar.sidebarMobile).toBe(true);
    });

    it("should not open the sidebar when a category is clicked on desktop", async () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: (query: string): MediaQueryMock => ({
          matches: true,
          media: query,
          onchange: null,
          addListener: (): void => undefined,
          removeListener: (): void => undefined,
          addEventListener: (): void => undefined,
          removeEventListener: (): void => undefined,
          dispatchEvent: (): boolean => false,
        }),
      });
      const user = userEvent.setup();
      const store = createTestStore({ toDos: defaultToDosState });
      render(
        <Provider store={store}>
          <Sidebar />
        </Provider>
      );
      await user.click(screen.getByRole("heading", { name: "💼Work" }));
      expect(store.getState().toDos.viewIdCategory).toBe("cat-1");
      expect(store.getState().global.sidebar.sidebarMobile).toBe(false);
    });
  });
});
