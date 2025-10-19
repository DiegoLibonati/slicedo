import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { ToDoItem } from "@src/components/ToDoItem/ToDoItem";

import { useAppDispatch } from "@src/app/hooks";

import { renderWithOriginalProvider } from "@tests/renders/renderWithOriginalProvider";

jest.mock("@src/app/hooks", () => ({
  ...jest.requireActual("@src/app/hooks"),
  useAppDispatch: jest.fn(),
}));

describe("ToDoItem.tsx", () => {
  describe("If the idCategory key is important", () => {
    const done = false;

    const props = {
      id: "todo_1",
      content: "content of todo",
      idCategory: "important",
      category: "category",
    };

    const mockDispatch = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();

      (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    test("It should not render the move button to important.", () => {
      renderWithOriginalProvider({
        children: (
          <ToDoItem
            id={props.id}
            category={props.category}
            content={props.content}
            done={done}
            idCategory={props.idCategory}
          ></ToDoItem>
        ),
      });

      const btnMoveToImportant = screen.queryByRole("button", {
        name: /move todo to important/i,
      });

      expect(btnMoveToImportant).not.toBeInTheDocument();
    });
  });

  describe("If the idCategory key is not important", () => {
    const done = false;

    const props = {
      id: "todo_1",
      content: "content of todo",
      idCategory: "not important",
      category: "category",
    };

    const mockDispatch = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();

      (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    test("It should render the move button to important.", () => {
      renderWithOriginalProvider({
        children: (
          <ToDoItem
            id={props.id}
            category={props.category}
            content={props.content}
            done={done}
            idCategory={props.idCategory}
          ></ToDoItem>
        ),
      });

      const btnMoveToImportant = screen.getByRole("button", {
        name: /move todo to important/i,
      });

      expect(btnMoveToImportant).toBeInTheDocument();
    });
  });

  describe("If the key 'done' is true", () => {
    const done = true;

    const props = {
      id: "todo_1",
      content: "content of todo",
      idCategory: "not important",
      category: "category",
    };

    const mockDispatch = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();

      (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    test("It must render the toDo container.", () => {
      renderWithOriginalProvider({
        children: (
          <ToDoItem
            id={props.id}
            category={props.category}
            content={props.content}
            done={done}
            idCategory={props.idCategory}
          ></ToDoItem>
        ),
      });

      const root = screen.getByRole("article");

      expect(root).toBeInTheDocument();
      expect(root).toHaveClass(
        "todo-item todo-item--done animate__animated animate__fadeIn"
      );
    });

    test("It should render the undone button and execute its respective function when clicked.", async () => {
      renderWithOriginalProvider({
        children: (
          <ToDoItem
            id={props.id}
            category={props.category}
            content={props.content}
            done={done}
            idCategory={props.idCategory}
          ></ToDoItem>
        ),
      });

      const btnUndone = screen.getByRole("button", { name: /undone todo/i });

      expect(btnUndone).toBeInTheDocument();

      await user.click(btnUndone);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "toDos/doneToDo",
        payload: { idCategory: props.idCategory, idToDo: props.id },
      });
    });

    test("It must render the content entirely.", () => {
      renderWithOriginalProvider({
        children: (
          <ToDoItem
            id={props.id}
            category={props.category}
            content={props.content}
            done={done}
            idCategory={props.idCategory}
          ></ToDoItem>
        ),
      });

      const heading = screen.getByRole("heading", { name: props.content });

      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass("todo-item__content--done");
    });

    test("It should render the remove button with the done settings set to true and execute its respective function when clicked", async () => {
      renderWithOriginalProvider({
        children: (
          <ToDoItem
            id={props.id}
            category={props.category}
            content={props.content}
            done={done}
            idCategory={props.idCategory}
          ></ToDoItem>
        ),
      });

      const btnRemove = screen.getByRole("button", { name: /remove todo/i });
      const icon = btnRemove.children[0] as HTMLElement;

      expect(btnRemove).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("todo-item__btn-remove-icon--done");

      await user.click(btnRemove);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "toDos/removeToDo",
        payload: { idCategory: props.idCategory, idToDo: props.id },
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "global/displayAlert",
        payload: {
          type: "alert--bad",
          message: `${props.id} was successfully removed from ${props.category}!`,
        },
      });
    });
  });

  describe("If the key 'done' is false", () => {
    const done = false;

    const props = {
      id: "todo_1",
      content: "content of todo",
      idCategory: "not important",
      category: "category",
    };

    const mockDispatch = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();

      (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    test("It must render the toDo container.", () => {
      renderWithOriginalProvider({
        children: (
          <ToDoItem
            id={props.id}
            category={props.category}
            content={props.content}
            done={done}
            idCategory={props.idCategory}
          ></ToDoItem>
        ),
      });

      const root = screen.getByRole("article");

      expect(root).toBeInTheDocument();
      expect(root).toHaveClass("todo-item animate__animated animate__fadeIn");
    });

    test("It should render the done button and execute its respective function when clicked.", async () => {
      renderWithOriginalProvider({
        children: (
          <ToDoItem
            id={props.id}
            category={props.category}
            content={props.content}
            done={done}
            idCategory={props.idCategory}
          ></ToDoItem>
        ),
      });

      const btnDone = screen.getByRole("button", { name: /done todo/i });

      expect(btnDone).toBeInTheDocument();

      await user.click(btnDone);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "toDos/doneToDo",
        payload: { idCategory: props.idCategory, idToDo: props.id },
      });
    });

    test("It must render the content entirely.", () => {
      renderWithOriginalProvider({
        children: (
          <ToDoItem
            id={props.id}
            category={props.category}
            content={props.content}
            done={done}
            idCategory={props.idCategory}
          ></ToDoItem>
        ),
      });

      const heading = screen.getByRole("heading", { name: props.content });

      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass("todo-item__content");
    });

    test("It should render the remove button with the done settings set to true and execute its respective function when clicked", async () => {
      renderWithOriginalProvider({
        children: (
          <ToDoItem
            id={props.id}
            category={props.category}
            content={props.content}
            done={done}
            idCategory={props.idCategory}
          ></ToDoItem>
        ),
      });

      const btnRemove = screen.getByRole("button", { name: /remove todo/i });
      const icon = btnRemove.children[0] as HTMLElement;

      expect(btnRemove).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("todo-item__btn-remove-icon");

      await user.click(btnRemove);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "toDos/removeToDo",
        payload: { idCategory: props.idCategory, idToDo: props.id },
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "global/displayAlert",
        payload: {
          type: "alert--bad",
          message: `${props.id} was successfully removed from ${props.category}!`,
        },
      });
    });

    test("It should render the edit button and execute its function when clicked.", async () => {
      renderWithOriginalProvider({
        children: (
          <ToDoItem
            id={props.id}
            category={props.category}
            content={props.content}
            done={done}
            idCategory={props.idCategory}
          ></ToDoItem>
        ),
      });

      const btnEdit = screen.getByRole("button", { name: /edit todo/i });

      expect(btnEdit).toBeInTheDocument();

      await user.click(btnEdit);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "toDos/setEditToDo",
        payload: props.id,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "global/openModalManageToDo",
        payload: undefined,
      });
    });

    test("It should render the move to important button and execute its function when clicked.", async () => {
      renderWithOriginalProvider({
        children: (
          <ToDoItem
            id={props.id}
            category={props.category}
            content={props.content}
            done={done}
            idCategory={props.idCategory}
          ></ToDoItem>
        ),
      });

      const btnMoveToImportant = screen.getByRole("button", {
        name: /move todo to important/i,
      });

      expect(btnMoveToImportant).toBeInTheDocument();

      await user.click(btnMoveToImportant);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "toDos/goToImportantToDo",
        payload: {
          idCategory: props.idCategory,
          toDo: { id: props.id, content: props.content, done: done },
        },
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "global/displayAlert",
        payload: {
          type: "alert--good",
          message: `${props.id} was successfully moved to Important!`,
        },
      });
    });
  });
});
