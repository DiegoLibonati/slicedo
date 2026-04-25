import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import type { RenderResult } from "@testing-library/react";
import type { ModalManageToDoProps } from "@/types/props";
import type { ToDosState } from "@/types/states";

import ModalManageToDo from "@/components/ModalManageToDo/ModalManageToDo";

import { createTestStore } from "@tests/__mocks__/store.mock";
import { mockCategories } from "@tests/__mocks__/categories.mock";

const defaultToDosState: ToDosState = {
  categories: mockCategories,
  loading: false,
  viewIdCategory: "",
  idToDoToEdit: "",
};

const renderComponent = (
  props: Partial<ModalManageToDoProps> = {},
  toDosOverride: Partial<ToDosState> = {}
): RenderResult => {
  const defaultProps: ModalManageToDoProps = {
    idCategory: "cat-1",
    icon: "💼",
    category: "Work",
    ...props,
  };
  return render(
    <Provider store={createTestStore({ toDos: { ...defaultToDosState, ...toDosOverride } })}>
      <ModalManageToDo {...defaultProps} />
    </Provider>
  );
};

describe("ModalManageToDo", () => {
  describe("rendering", () => {
    it("should render the close button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Close to-do dialog" })).toBeInTheDocument();
    });

    it("should render the category name and icon", () => {
      renderComponent({ icon: "💼", category: "Work" });
      expect(screen.getByText("💼Work")).toBeInTheDocument();
    });

    it("should render the textarea with placeholder", () => {
      renderComponent();
      expect(screen.getByPlaceholderText("Insert a content...")).toBeInTheDocument();
    });

    it("should render the ADD TODO button when not in edit mode", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Add new to-do" })).toBeInTheDocument();
    });

    it("should render the EDIT TODO button when in edit mode", () => {
      renderComponent({}, { idToDoToEdit: "todo-1" });
      expect(screen.getByRole("button", { name: "Save to-do edits" })).toBeInTheDocument();
    });

    it("should pre-fill the textarea with the existing content when editing", () => {
      renderComponent({}, { idToDoToEdit: "todo-1" });
      expect(screen.getByRole("textbox")).toHaveValue("Buy groceries");
    });

    it("should render an empty textarea in add mode", () => {
      renderComponent();
      expect(screen.getByRole("textbox")).toHaveValue("");
    });
  });

  describe("behavior", () => {
    it("should add a new todo to the store when submitted in add mode", async () => {
      const user = userEvent.setup();
      const store = createTestStore({ toDos: defaultToDosState });
      render(
        <Provider store={store}>
          <ModalManageToDo idCategory="cat-1" icon="💼" category="Work" />
        </Provider>
      );
      await user.type(screen.getByRole("textbox"), "New task");
      await user.click(screen.getByRole("button", { name: "Add new to-do" }));
      const category = store.getState().toDos.categories.find((c) => c.id === "cat-1");
      expect(category?.toDos.some((t) => t.content === "New task")).toBe(true);
    });

    it("should update the todo content when submitted in edit mode", async () => {
      const user = userEvent.setup();
      const store = createTestStore({ toDos: { ...defaultToDosState, idToDoToEdit: "todo-1" } });
      render(
        <Provider store={store}>
          <ModalManageToDo idCategory="cat-1" icon="💼" category="Work" />
        </Provider>
      );
      await user.clear(screen.getByRole("textbox"));
      await user.type(screen.getByRole("textbox"), "Updated task");
      await user.click(screen.getByRole("button", { name: "Save to-do edits" }));
      const category = store.getState().toDos.categories.find((c) => c.id === "cat-1");
      expect(category?.toDos.find((t) => t.id === "todo-1")?.content).toBe("Updated task");
    });

    it("should close the modal and reset idToDoToEdit when close button is clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore({
        global: {
          alert: { message: "", type: "" },
          modal: { modalAddCategory: false, modalManageToDo: true },
          sidebar: { sidebarMobile: false },
        },
        toDos: { ...defaultToDosState, idToDoToEdit: "todo-1" },
      });
      render(
        <Provider store={store}>
          <ModalManageToDo idCategory="cat-1" icon="💼" category="Work" />
        </Provider>
      );
      await user.click(screen.getByRole("button", { name: "Close to-do dialog" }));
      expect(store.getState().global.modal.modalManageToDo).toBe(false);
      expect(store.getState().toDos.idToDoToEdit).toBe("");
    });

    it("should dispatch an alert when a new todo is added", async () => {
      const user = userEvent.setup();
      const store = createTestStore({ toDos: defaultToDosState });
      render(
        <Provider store={store}>
          <ModalManageToDo idCategory="cat-1" icon="💼" category="Work" />
        </Provider>
      );
      await user.type(screen.getByRole("textbox"), "New task");
      await user.click(screen.getByRole("button", { name: "Add new to-do" }));
      expect(store.getState().global.alert.type).toBe("alert--good");
    });

    it("should close the modal after submitting a new todo", async () => {
      const user = userEvent.setup();
      const store = createTestStore({
        global: {
          alert: { message: "", type: "" },
          modal: { modalAddCategory: false, modalManageToDo: true },
          sidebar: { sidebarMobile: false },
        },
        toDos: defaultToDosState,
      });
      render(
        <Provider store={store}>
          <ModalManageToDo idCategory="cat-1" icon="💼" category="Work" />
        </Provider>
      );
      await user.type(screen.getByRole("textbox"), "New task");
      await user.click(screen.getByRole("button", { name: "Add new to-do" }));
      expect(store.getState().global.modal.modalManageToDo).toBe(false);
    });
  });
});
