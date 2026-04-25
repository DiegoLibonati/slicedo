import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import type { RenderResult } from "@testing-library/react";
import type { ToDoViewProps } from "@/types/props";
import type { ToDo } from "@/types/app";

import ToDoView from "@/views/ToDoView/ToDoView";

import { createTestStore } from "@tests/__mocks__/store.mock";
import { mockCategories } from "@tests/__mocks__/categories.mock";

const mockToDos: ToDo[] = [
  { id: "todo-1", content: "Buy groceries", done: false },
  { id: "todo-2", content: "Read book", done: true },
];

const defaultToDosState = {
  categories: mockCategories,
  loading: false,
  viewIdCategory: "cat-1",
  idToDoToEdit: "",
};

const renderView = (props: Partial<ToDoViewProps> = {}): RenderResult => {
  const defaultProps: ToDoViewProps = {
    idCategory: "cat-1",
    icon: "💼",
    category: "Work",
    toDos: mockToDos,
    ...props,
  };
  return render(
    <Provider store={createTestStore({ toDos: defaultToDosState })}>
      <ToDoView {...defaultProps} />
    </Provider>
  );
};

describe("ToDoView", () => {
  describe("rendering", () => {
    it("should render the category name in uppercase", () => {
      renderView();
      expect(screen.getByRole("heading", { name: /WORK/ })).toBeInTheDocument();
    });

    it("should render the category icon", () => {
      renderView();
      expect(screen.getByRole("heading", { name: /💼/ })).toBeInTheDocument();
    });

    it("should render todos when the list is not empty", () => {
      renderView();
      expect(screen.getByText("Buy groceries")).toBeInTheDocument();
      expect(screen.getByText("Read book")).toBeInTheDocument();
    });

    it("should render the add todo button when todos exist", () => {
      renderView();
      expect(screen.getByRole("button", { name: "Add new to-do" })).toBeInTheDocument();
    });

    it("should render the empty state prompt when there are no todos", () => {
      renderView({ toDos: [] });
      expect(screen.getByText(/ADD YOUR FIRST TODO/)).toBeInTheDocument();
    });

    it("should render the first add button when todos list is empty", () => {
      renderView({ toDos: [] });
      expect(screen.getByRole("button", { name: "Add your first to-do" })).toBeInTheDocument();
    });

    it("should render the loader when loading is true", () => {
      const { container } = render(
        <Provider store={createTestStore({ toDos: { ...defaultToDosState, loading: true } })}>
          <ToDoView idCategory="cat-1" icon="💼" category="Work" toDos={mockToDos} />
        </Provider>
      );
      expect(container.querySelector<HTMLDivElement>(".loader")).toBeInTheDocument();
    });

    it("should render the close sidebar button when sidebar is open on mobile", () => {
      render(
        <Provider
          store={createTestStore({
            toDos: defaultToDosState,
            global: {
              alert: { message: "", type: "" },
              modal: { modalAddCategory: false, modalManageToDo: false },
              sidebar: { sidebarMobile: true },
            },
          })}
        >
          <ToDoView idCategory="cat-1" icon="💼" category="Work" toDos={mockToDos} />
        </Provider>
      );
      expect(screen.getByRole("button", { name: "Close to-do view" })).toBeInTheDocument();
    });

    it("should not render the close sidebar button when sidebar is closed", () => {
      renderView();
      expect(screen.queryByRole("button", { name: "Close to-do view" })).not.toBeInTheDocument();
    });

    it("should render ModalManageToDo when the manage modal is open", () => {
      render(
        <Provider
          store={createTestStore({
            toDos: defaultToDosState,
            global: {
              alert: { message: "", type: "" },
              modal: { modalAddCategory: false, modalManageToDo: true },
              sidebar: { sidebarMobile: false },
            },
          })}
        >
          <ToDoView idCategory="cat-1" icon="💼" category="Work" toDos={mockToDos} />
        </Provider>
      );
      expect(screen.getByRole("button", { name: "Close to-do dialog" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should open the manage todo modal when the add button is clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore({ toDos: defaultToDosState });
      render(
        <Provider store={store}>
          <ToDoView idCategory="cat-1" icon="💼" category="Work" toDos={mockToDos} />
        </Provider>
      );
      await user.click(screen.getByRole("button", { name: "Add new to-do" }));
      expect(store.getState().global.modal.modalManageToDo).toBe(true);
    });

    it("should close the sidebar when the close button is clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore({
        toDos: defaultToDosState,
        global: {
          alert: { message: "", type: "" },
          modal: { modalAddCategory: false, modalManageToDo: false },
          sidebar: { sidebarMobile: true },
        },
      });
      render(
        <Provider store={store}>
          <ToDoView idCategory="cat-1" icon="💼" category="Work" toDos={mockToDos} />
        </Provider>
      );
      await user.click(screen.getByRole("button", { name: "Close to-do view" }));
      expect(store.getState().global.sidebar.sidebarMobile).toBe(false);
    });
  });
});
