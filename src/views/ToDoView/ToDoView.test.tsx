import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { ToDo } from "../../entities/entities";

import { ToDoView } from "./ToDoView";

import { useAppDispatch } from "../../constants/redux";

import { renderWithOriginalProvider } from "../../tests/renders/renderWithOriginalProvider";
import { renderWithState } from "../../tests/renders/renderWithState";
import { GLOBAL_STATE_MOCK, TODOS_STATE_MOCK } from "../../tests/jest.setup";

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

jest.mock("../../constants/redux", () => ({
  ...jest.requireActual("../../constants/redux"),
  useAppDispatch: jest.fn(),
}));

beforeEach(() => {
  jest.resetAllMocks();

  (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
});

describe("If sidebarMobile key is true", () => {
  const sidebarMobile = true;

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
        ...GLOBAL_STATE_MOCK,
        sidebar: { ...GLOBAL_STATE_MOCK.sidebar, sidebarMobile: sidebarMobile },
      },
    });

    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
    expect(main).toHaveClass(
      "main_container open-sidebar animate__animated animate__fadeIn"
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
        ...GLOBAL_STATE_MOCK,
        sidebar: { ...GLOBAL_STATE_MOCK.sidebar, sidebarMobile: sidebarMobile },
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
        ...GLOBAL_STATE_MOCK,
        sidebar: { ...GLOBAL_STATE_MOCK.sidebar, sidebarMobile: sidebarMobile },
      },
    });

    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
    expect(main).toHaveClass(
      "main_container animate__animated animate__fadeIn"
    );
  });
});

describe("If the key loading is true", () => {
  const loading = true;

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
      toDosState: { ...TODOS_STATE_MOCK, loading: loading },
    });

    // eslint-disable-next-line
    const loader = container.querySelector(".loader") as HTMLDivElement;

    expect(loader).toBeInTheDocument();
  });
});

describe("If the key loading is false", () => {
  const loading = false;

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
      toDosState: { ...TODOS_STATE_MOCK, loading: loading },
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
      toDosState: { ...TODOS_STATE_MOCK, loading: loading },
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
        toDosState: { ...TODOS_STATE_MOCK, loading: loading },
      });

      // eslint-disable-next-line
      const toDoContainer = container.querySelector(
        ".todos_container"
      ) as HTMLElement;

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
        toDosState: { ...TODOS_STATE_MOCK, loading: loading },
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
        toDosState: { ...TODOS_STATE_MOCK, loading: loading },
      });

      // eslint-disable-next-line
      const toDoContainer = container.querySelector(
        ".todos_container"
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
        toDosState: { ...TODOS_STATE_MOCK, loading: loading },
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
        ...GLOBAL_STATE_MOCK,
        modal: { ...GLOBAL_STATE_MOCK.modal, modalManageToDo: modalManageToDo },
      },
    });

    // eslint-disable-next-line
    const modal = container.querySelector(
      ".modal_addtodo_wrapper"
    ) as HTMLDivElement;

    expect(modal).toBeInTheDocument();
  });
});

describe("If the key modalManageToDo is false", () => {
  const modalManageToDo = false;

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
        ...GLOBAL_STATE_MOCK,
        modal: { ...GLOBAL_STATE_MOCK.modal, modalManageToDo: modalManageToDo },
      },
    });

    // eslint-disable-next-line
    const modal = container.querySelector(
      ".modal_addtodo_wrapper"
    ) as HTMLDivElement;

    expect(modal).not.toBeInTheDocument();
  });
});
