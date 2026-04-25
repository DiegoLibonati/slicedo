import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import type { ReactElement } from "react";
import type { RenderResult } from "@testing-library/react";

import SlicedoPage from "@/pages/SlicedoPage/SlicedoPage";

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

const renderPage = (preloadedState = {}): RenderResult =>
  render(
    <Provider store={createTestStore({ toDos: defaultToDosState, ...preloadedState })}>
      <SlicedoPage />
    </Provider>
  );

describe("SlicedoPage", () => {
  describe("rendering", () => {
    it("should render the sidebar", () => {
      renderPage();
      expect(screen.getByText("Slicedo")).toBeInTheDocument();
    });

    it("should not render ToDoView when no category is selected", () => {
      renderPage();
      expect(screen.queryByRole("main")).not.toBeInTheDocument();
    });

    it("should render ToDoView when a category is selected", () => {
      render(
        <Provider
          store={createTestStore({
            toDos: { ...defaultToDosState, viewIdCategory: "cat-1" },
          })}
        >
          <SlicedoPage />
        </Provider>
      );
      expect(screen.getByRole("heading", { name: /WORK/ })).toBeInTheDocument();
    });

    it("should not render ToDoPresentationView on mobile when no category is selected", () => {
      renderPage();
      expect(
        screen.queryByRole("button", { name: "Select Work category" })
      ).not.toBeInTheDocument();
    });

    it("should render ToDoPresentationView on desktop when no category is selected", () => {
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
      render(
        <Provider store={createTestStore({ toDos: defaultToDosState })}>
          <SlicedoPage />
        </Provider>
      );
      expect(screen.getByRole("button", { name: "Select Work category" })).toBeInTheDocument();
    });

    it("should render the Alert component when an alert message is set", () => {
      render(
        <Provider
          store={createTestStore({
            toDos: defaultToDosState,
            global: {
              alert: { message: "Task done!", type: "alert--good" },
              modal: { modalAddCategory: false, modalManageToDo: false },
              sidebar: { sidebarMobile: false },
            },
          })}
        >
          <SlicedoPage />
        </Provider>
      );
      expect(screen.getByText("Task done!")).toBeInTheDocument();
    });

    it("should not render the Alert component when no alert message is set", () => {
      renderPage();
      expect(screen.queryByRole("button", { name: "Dismiss alert" })).not.toBeInTheDocument();
    });
  });
});
