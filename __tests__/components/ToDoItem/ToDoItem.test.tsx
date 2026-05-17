import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import type { RenderResult } from "@testing-library/react";
import type { ToDoItemProps } from "@/types/props";

import ToDoItem from "@/components/ToDoItem/ToDoItem";

import { createTestStore } from "@tests/__mocks__/store.mock";
import { mockCategories } from "@tests/__mocks__/categories.mock";

const defaultToDosState = {
  categories: mockCategories,
  loading: false,
  viewIdCategory: "",
  idToDoToEdit: "",
};

const renderComponent = (props: Partial<ToDoItemProps> = {}): RenderResult => {
  const defaultProps: ToDoItemProps = {
    id: "todo-1",
    content: "Buy groceries",
    done: false,
    idCategory: "cat-1",
    category: "Work",
    ...props,
  };
  return render(
    <Provider store={createTestStore({ toDos: defaultToDosState })}>
      <ToDoItem {...defaultProps} />
    </Provider>
  );
};

describe("ToDoItem", () => {
  describe("rendering", () => {
    it("should render the todo content", () => {
      renderComponent();
      expect(screen.getByText("Buy groceries")).toBeInTheDocument();
    });

    it("should render the mark as complete button when not done", () => {
      renderComponent({ done: false });
      expect(screen.getByRole("button", { name: "Mark to-do as complete" })).toBeInTheDocument();
    });

    it("should render the mark as incomplete button when done", () => {
      renderComponent({ done: true });
      expect(screen.getByRole("button", { name: "Mark to-do as incomplete" })).toBeInTheDocument();
    });

    it("should render the delete button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Delete to-do" })).toBeInTheDocument();
    });

    it("should render the edit button when not done", () => {
      renderComponent({ done: false });
      expect(screen.getByRole("button", { name: "Edit to-do" })).toBeInTheDocument();
    });

    it("should not render the edit button when done", () => {
      renderComponent({ done: true });
      expect(screen.queryByRole("button", { name: "Edit to-do" })).not.toBeInTheDocument();
    });

    it("should render the move to important button when not done and not in important category", () => {
      renderComponent({ done: false, idCategory: "cat-1" });
      expect(screen.getByRole("button", { name: "Move to-do to Important" })).toBeInTheDocument();
    });

    it("should not render the move to important button when idCategory is important", () => {
      renderComponent({ idCategory: "important" });
      expect(
        screen.queryByRole("button", { name: "Move to-do to Important" })
      ).not.toBeInTheDocument();
    });

    it("should not render the move to important button when todo is done", () => {
      renderComponent({ done: true, idCategory: "cat-1" });
      expect(
        screen.queryByRole("button", { name: "Move to-do to Important" })
      ).not.toBeInTheDocument();
    });

    it("should apply the done style to the article when todo is done", () => {
      renderComponent({ done: true });
      expect(screen.getByRole("article")).toHaveClass("todo-item--done");
    });

    it("should not apply the done style when todo is not done", () => {
      renderComponent({ done: false });
      expect(screen.getByRole("article")).not.toHaveClass("todo-item--done");
    });
  });

  describe("behavior", () => {
    it("should toggle the todo to done when the complete button is clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore({ toDos: defaultToDosState });
      render(
        <Provider store={store}>
          <ToDoItem
            id="todo-1"
            content="Buy groceries"
            done={false}
            idCategory="cat-1"
            category="Work"
          />
        </Provider>
      );
      await user.click(screen.getByRole("button", { name: "Mark to-do as complete" }));
      const category = store.getState().toDos.categories.find((c) => c.id === "cat-1");
      expect(category?.toDos.find((t) => t.id === "todo-1")?.done).toBe(true);
    });

    it("should toggle the todo to incomplete when the incomplete button is clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore({ toDos: defaultToDosState });
      render(
        <Provider store={store}>
          <ToDoItem
            id="todo-2"
            content="Read book"
            done={true}
            idCategory="cat-1"
            category="Work"
          />
        </Provider>
      );
      await user.click(screen.getByRole("button", { name: "Mark to-do as incomplete" }));
      const category = store.getState().toDos.categories.find((c) => c.id === "cat-1");
      expect(category?.toDos.find((t) => t.id === "todo-2")?.done).toBe(false);
    });

    it("should remove the todo from the store when the delete button is clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore({ toDos: defaultToDosState });
      render(
        <Provider store={store}>
          <ToDoItem
            id="todo-1"
            content="Buy groceries"
            done={false}
            idCategory="cat-1"
            category="Work"
          />
        </Provider>
      );
      await user.click(screen.getByRole("button", { name: "Delete to-do" }));
      const category = store.getState().toDos.categories.find((c) => c.id === "cat-1");
      expect(category?.toDos.find((t) => t.id === "todo-1")).toBeUndefined();
    });

    it("should dispatch an alert when the delete button is clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore({ toDos: defaultToDosState });
      render(
        <Provider store={store}>
          <ToDoItem
            id="todo-1"
            content="Buy groceries"
            done={false}
            idCategory="cat-1"
            category="Work"
          />
        </Provider>
      );
      await user.click(screen.getByRole("button", { name: "Delete to-do" }));
      expect(store.getState().global.alert.message).toContain("todo-1");
      expect(store.getState().global.alert.type).toBe("alert--bad");
    });

    it("should open the edit modal and set idToDoToEdit when the edit button is clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore({ toDos: defaultToDosState });
      render(
        <Provider store={store}>
          <ToDoItem
            id="todo-1"
            content="Buy groceries"
            done={false}
            idCategory="cat-1"
            category="Work"
          />
        </Provider>
      );
      await user.click(screen.getByRole("button", { name: "Edit to-do" }));
      expect(store.getState().global.modal.modalManageToDo).toBe(true);
      expect(store.getState().toDos.idToDoToEdit).toBe("todo-1");
    });

    it("should move the todo to the important category when the move button is clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore({ toDos: defaultToDosState });
      render(
        <Provider store={store}>
          <ToDoItem
            id="todo-1"
            content="Buy groceries"
            done={false}
            idCategory="cat-1"
            category="Work"
          />
        </Provider>
      );
      await user.click(screen.getByRole("button", { name: "Move to-do to Important" }));
      const importantCategory = store.getState().toDos.categories.find((c) => c.id === "important");
      expect(importantCategory?.toDos.find((t) => t.id === "todo-1")).toBeDefined();
      const sourceCategory = store.getState().toDos.categories.find((c) => c.id === "cat-1");
      expect(sourceCategory?.toDos.find((t) => t.id === "todo-1")).toBeUndefined();
    });

    it("should dispatch an alert when the move to important button is clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore({ toDos: defaultToDosState });
      render(
        <Provider store={store}>
          <ToDoItem
            id="todo-1"
            content="Buy groceries"
            done={false}
            idCategory="cat-1"
            category="Work"
          />
        </Provider>
      );
      await user.click(screen.getByRole("button", { name: "Move to-do to Important" }));
      expect(store.getState().global.alert.message).toContain("todo-1");
      expect(store.getState().global.alert.type).toBe("alert--good");
    });
  });
});
