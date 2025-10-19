import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Alert, ToDo } from "@src/entities/app";
import { ToDosState } from "@src/entities/states";

import { ModalManageToDo } from "@src/components/ModalManageToDo/ModalManageToDo";

import { useAppDispatch } from "@src/app/hooks";

import { renderWithOriginalProvider } from "@tests/renders/renderWithOriginalProvider";
import { renderWithState } from "@tests/renders/renderWithState";

jest.mock("@src/app/hooks", () => ({
  ...jest.requireActual("@src/app/hooks"),
  useAppDispatch: jest.fn(),
}));

describe("ModalManageToDo.tsx", () => {
  describe("General Tests.", () => {
    const props = {
      idCategory: "random_category",
      icon: "P",
      category: "Random",
    };

    const toDoToEdit: ToDo = {
      id: "todo_1",
      content: "Hi, todo.",
      done: false,
    };

    const toDosState: ToDosState = {
      categories: [
        {
          id: props.idCategory,
          category: props.category,
          icon: props.icon,
          toDos: [toDoToEdit],
        },
      ],
      idToDoToEdit: toDoToEdit.id,
      loading: false,
      viewIdCategory: "",
    };

    const mockDispatch = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();

      (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    test("It should render the close button modal.", () => {
      renderWithOriginalProvider({
        children: (
          <ModalManageToDo
            category={props.category}
            icon={props.icon}
            idCategory={props.idCategory}
          ></ModalManageToDo>
        ),
      });

      const btnClose = screen.getByRole("button", {
        name: /close modal/i,
      });

      expect(btnClose).toBeInTheDocument();
    });

    test("It should execute the relevant functions when the close modal button is clicked.", async () => {
      renderWithOriginalProvider({
        children: (
          <ModalManageToDo
            category={props.category}
            icon={props.icon}
            idCategory={props.idCategory}
          ></ModalManageToDo>
        ),
      });

      const btnClose = screen.getByRole("button", {
        name: /close modal/i,
      });

      expect(btnClose).toBeInTheDocument();

      await user.click(btnClose);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "global/closeModalManageToDo",
        payload: undefined,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "toDos/resetIdToDoToEdit",
        payload: undefined,
      });
    });

    test("It must render the category title, the input and the submit button.", () => {
      renderWithOriginalProvider({
        children: (
          <ModalManageToDo
            category={props.category}
            icon={props.icon}
            idCategory={props.idCategory}
          ></ModalManageToDo>
        ),
      });

      const headingForm = screen.getByRole("heading", {
        name: `${props.icon}${props.category}`,
      });
      const input = screen.getByRole("textbox");
      const btnSubmit = screen.getByRole("button", { name: /submit form/i });

      expect(headingForm).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
    });

    test("It should create a toDo when you tap the submit button.", async () => {
      const inputText = "Hi, i am a todo.";

      renderWithOriginalProvider({
        children: (
          <ModalManageToDo
            category={props.category}
            icon={props.icon}
            idCategory={props.idCategory}
          ></ModalManageToDo>
        ),
      });

      const input = screen.getByRole("textbox");
      const btnSubmit = screen.getByRole("button", { name: /submit form/i });

      expect(input).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();

      await user.clear(input);
      await user.click(input);
      await user.keyboard(inputText);

      expect(input).toHaveValue(inputText);

      await user.click(btnSubmit);

      const toDo: ToDo = {
        id: expect.any(String),
        content: inputText,
        done: false,
      };

      const alert: Alert = {
        type: "alert--good",
        message: expect.any(String),
      };

      expect(mockDispatch).toHaveBeenCalledTimes(4);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "toDos/addToDo",
        payload: { idCategory: props.idCategory, newToDo: toDo },
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "global/displayAlert",
        payload: alert,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "global/closeModalManageToDo",
        payload: undefined,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "toDos/resetIdToDoToEdit",
        payload: undefined,
      });
    });

    test("It must edit a toDo when you tap the submit button.", async () => {
      const inputText = "Hi, i am a todo edited.";

      renderWithState({
        children: (
          <ModalManageToDo
            category={props.category}
            icon={props.icon}
            idCategory={props.idCategory}
          ></ModalManageToDo>
        ),
        toDosState: toDosState,
      });

      const input = screen.getByRole("textbox");
      const btnSubmit = screen.getByRole("button", { name: /submit form/i });

      expect(input).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();

      await user.clear(input);
      await user.click(input);
      await user.keyboard(inputText);

      expect(input).toHaveValue(inputText);

      await user.click(btnSubmit);

      const toDo: ToDo = {
        id: toDoToEdit.id,
        content: inputText,
        done: toDoToEdit.done,
      };

      const alert: Alert = {
        type: "alert--good",
        message: `${toDo.id} was successfully edited!`,
      };

      expect(mockDispatch).toHaveBeenCalledTimes(4);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: "toDos/editToDo",
        payload: { idCategory: props.idCategory, toDo: toDo },
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "global/displayAlert",
        payload: alert,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "global/closeModalManageToDo",
        payload: undefined,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "toDos/resetIdToDoToEdit",
        payload: undefined,
      });
    });
  });
});
