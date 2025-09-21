import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { ToDo } from "@src/entities/entities";

import { ToDoView } from "@src/views/ToDoView/ToDoView";

import { useAppDispatch } from "@src/constants/redux";

import { renderWithState } from "@tests/renders/renderWithState";
import { mockGlobalState, mockTodosState } from "@tests/jest.constants";

jest.mock("@src/constants/redux", () => ({
  ...jest.requireActual("@src/constants/redux"),
  useAppDispatch: jest.fn(),
}));

describe("ToDoView.tsx", () => {
  describe("If sidebarMobile key is true", () => {
    const sidebarMobile = true;

    const props = {
      icon: "icon",
      idCategory: "cat_1",
      category: "category one",
      toDos: [
        {
          id: "todo_1",
          content: "todo one",
          done: false,
        },
        {
          id: "todo_2",
          content: "todo two",
          done: true,
        },
      ],
    };

    const mockDispatch = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();

      (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    test("It must render main with its respective classes.", () => {
      renderWithState({
        children: (
          <ToDoView
            category={props.category}
            icon={props.icon}
            idCategory={props.idCategory}
            toDos={props.toDos}
          ></ToDoView>
        ),
        globalState: {
          ...mockGlobalState,
          sidebar: { ...mockGlobalState.sidebar, sidebarMobile: sidebarMobile },
        },
      });

      const main = screen.getByRole("main");

      expect(main).toBeInTheDocument();
      expect(main).toHaveClass(
        "main-todo-view main-todo-view--sidebar-open animate__animated animate__fadeIn"
      );
    });

    test("It should render the close sidebar button and execute its respective function when clicked.", async () => {
      renderWithState({
        children: (
          <ToDoView
            category={props.category}
            icon={props.icon}
            idCategory={props.idCategory}
            toDos={props.toDos}
          ></ToDoView>
        ),
        globalState: {
          ...mockGlobalState,
          sidebar: { ...mockGlobalState.sidebar, sidebarMobile: sidebarMobile },
        },
      });

      const btnCloseSidebar = screen.getByRole("button", {
        name: /close sidebar/i,
      });

      expect(btnCloseSidebar).toBeInTheDocument();

      await user.click(btnCloseSidebar);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "global/closeSidebar",
        payload: undefined,
      });
    });
  });

  describe("If sidebarMobile key is false", () => {
    const sidebarMobile = false;

    const props = {
      icon: "icon",
      idCategory: "cat_1",
      category: "category one",
      toDos: [
        {
          id: "todo_1",
          content: "todo one",
          done: false,
        },
        {
          id: "todo_2",
          content: "todo two",
          done: true,
        },
      ],
    };

    const mockDispatch = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();

      (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    test("It must render main with its respective classes.", () => {
      renderWithState({
        children: (
          <ToDoView
            category={props.category}
            icon={props.icon}
            idCategory={props.idCategory}
            toDos={props.toDos}
          ></ToDoView>
        ),
        globalState: {
          ...mockGlobalState,
          sidebar: { ...mockGlobalState.sidebar, sidebarMobile: sidebarMobile },
        },
      });

      const main = screen.getByRole("main");

      expect(main).toBeInTheDocument();
      expect(main).toHaveClass(
        "main-todo-view animate__animated animate__fadeIn"
      );
    });
  });

  describe("If the key loading is true", () => {
    const loading = true;

    const props = {
      icon: "icon",
      idCategory: "cat_1",
      category: "category one",
      toDos: [
        {
          id: "todo_1",
          content: "todo one",
          done: false,
        },
        {
          id: "todo_2",
          content: "todo two",
          done: true,
        },
      ],
    };

    const mockDispatch = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();

      (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    test("It must render the loader.", () => {
      const { container } = renderWithState({
        children: (
          <ToDoView
            category={props.category}
            icon={props.icon}
            idCategory={props.idCategory}
            toDos={props.toDos}
          ></ToDoView>
        ),
        toDosState: { ...mockTodosState, loading: loading },
      });

      // eslint-disable-next-line
      const loader = container.querySelector(".loader") as HTMLDivElement;

      expect(loader).toBeInTheDocument();
    });
  });

  describe("If the key loading is false", () => {
    const loading = false;

    const props = {
      icon: "icon",
      idCategory: "cat_1",
      category: "category one",
      toDos: [
        {
          id: "todo_1",
          content: "todo one",
          done: false,
        },
        {
          id: "todo_2",
          content: "todo two",
          done: true,
        },
      ],
    };

    const mockDispatch = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();

      (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    test("It should not render the loader.", () => {
      const { container } = renderWithState({
        children: (
          <ToDoView
            category={props.category}
            icon={props.icon}
            idCategory={props.idCategory}
            toDos={props.toDos}
          ></ToDoView>
        ),
        toDosState: { ...mockTodosState, loading: loading },
      });

      // eslint-disable-next-line
      const loader = container.querySelector(".loader") as HTMLDivElement;

      expect(loader).not.toBeInTheDocument();
    });

    test("It must render the category and date titles.", () => {
      renderWithState({
        children: (
          <ToDoView
            category={props.category}
            icon={props.icon}
            idCategory={props.idCategory}
            toDos={props.toDos}
          ></ToDoView>
        ),
        toDosState: { ...mockTodosState, loading: loading },
      });

      const categoryTitle = screen.getByRole("heading", {
        name: `${props.icon}${props.category.toUpperCase()}`,
      });
      const dateTitle = screen.getByRole("heading", { name: /gmt/i });

      expect(categoryTitle).toBeInTheDocument();
      expect(dateTitle).toBeInTheDocument();
    });

    describe("If there is ToDos.", () => {
      const toDos = props.toDos;

      test("It must render all of the toDos.", () => {
        const { container } = renderWithState({
          children: (
            <ToDoView
              category={props.category}
              icon={props.icon}
              idCategory={props.idCategory}
              toDos={toDos}
            ></ToDoView>
          ),
          toDosState: { ...mockTodosState, loading: loading },
        });

        // eslint-disable-next-line
        const toDoContainer = container.querySelector(".category-todos") as HTMLElement;

        expect(toDoContainer).toBeInTheDocument();
        // eslint-disable-next-line
        expect(toDoContainer?.children).toHaveLength(props.toDos.length);
      });

      test("It must render the add toDo button and you must execute its function when it is clicked.", async () => {
        renderWithState({
          children: (
            <ToDoView
              category={props.category}
              icon={props.icon}
              idCategory={props.idCategory}
              toDos={toDos}
            ></ToDoView>
          ),
          toDosState: { ...mockTodosState, loading: loading },
        });

        const btnAddToDo = screen.getByRole("button", { name: /add todo/i });

        expect(btnAddToDo).toBeInTheDocument();

        await user.click(btnAddToDo);

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith({
          type: "global/openModalManageToDo",
          payload: undefined,
        });
      });
    });

    describe("If there is NOT ToDos.", () => {
      const toDos: ToDo[] = [];

      test("It should not render all if there are none.", () => {
        const { container } = renderWithState({
          children: (
            <ToDoView
              category={props.category}
              icon={props.icon}
              idCategory={props.idCategory}
              toDos={toDos}
            ></ToDoView>
          ),
          toDosState: { ...mockTodosState, loading: loading },
        });

        // eslint-disable-next-line
        const toDoContainer = container.querySelector(
          ".todos"
        ) as HTMLDivElement;

        expect(toDoContainer).not.toBeInTheDocument();
      });

      test("It should render the add toDo button with its title and you should execute its function when it is clicked.", async () => {
        renderWithState({
          children: (
            <ToDoView
              category={props.category}
              icon={props.icon}
              idCategory={props.idCategory}
              toDos={toDos}
            ></ToDoView>
          ),
          toDosState: { ...mockTodosState, loading: loading },
        });

        const heading = screen.getByRole("heading", {
          name: /add your first todo/i,
        });
        const btnAddToDo = screen.getByRole("button", { name: /add todo/i });

        expect(heading).toBeInTheDocument();
        expect(btnAddToDo).toBeInTheDocument();

        await user.click(btnAddToDo);

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith({
          type: "global/openModalManageToDo",
          payload: undefined,
        });
      });
    });
  });

  describe("If the key modalManageToDo is true", () => {
    const modalManageToDo = true;

    const props = {
      icon: "icon",
      idCategory: "cat_1",
      category: "category one",
      toDos: [
        {
          id: "todo_1",
          content: "todo one",
          done: false,
        },
        {
          id: "todo_2",
          content: "todo two",
          done: true,
        },
      ],
    };

    const mockDispatch = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();

      (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    test("It must render the manage toDo modal.", () => {
      const { container } = renderWithState({
        children: (
          <ToDoView
            category={props.category}
            icon={props.icon}
            idCategory={props.idCategory}
            toDos={props.toDos}
          ></ToDoView>
        ),
        globalState: {
          ...mockGlobalState,
          modal: { ...mockGlobalState.modal, modalManageToDo: modalManageToDo },
        },
      });

      // eslint-disable-next-line
      const modal = container.querySelector(
        ".modal-manage-todo"
      ) as HTMLDivElement;

      expect(modal).toBeInTheDocument();
    });
  });

  describe("If the key modalManageToDo is false", () => {
    const modalManageToDo = false;

    const props = {
      icon: "icon",
      idCategory: "cat_1",
      category: "category one",
      toDos: [
        {
          id: "todo_1",
          content: "todo one",
          done: false,
        },
        {
          id: "todo_2",
          content: "todo two",
          done: true,
        },
      ],
    };

    const mockDispatch = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();

      (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    test("It must not render the manage toDo modal.", () => {
      const { container } = renderWithState({
        children: (
          <ToDoView
            category={props.category}
            icon={props.icon}
            idCategory={props.idCategory}
            toDos={props.toDos}
          ></ToDoView>
        ),
        globalState: {
          ...mockGlobalState,
          modal: { ...mockGlobalState.modal, modalManageToDo: modalManageToDo },
        },
      });

      // eslint-disable-next-line
      const modal = container.querySelector(
        ".modal__add-todo"
      ) as HTMLDivElement;

      expect(modal).not.toBeInTheDocument();
    });
  });
});
