import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Alert, ToDoCategory } from "@src/entities/app";

import { ModalAddCategory } from "@src/components/ModalAddCategory/ModalAddCategory";

import { useAppDispatch } from "@src/app/hooks";

import { renderWithOriginalProvider } from "@tests/renders/renderWithOriginalProvider";

jest.mock("@src/app/hooks", () => ({
  ...jest.requireActual("@src/app/hooks"),
  useAppDispatch: jest.fn(),
}));

describe("ModalAddCategory.tsx", () => {
  describe("General Tests.", () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();

      (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    test("It must render the close button.", () => {
      renderWithOriginalProvider({
        children: <ModalAddCategory></ModalAddCategory>,
      });

      const btnClose = screen.getByRole("button", {
        name: /close modal add category/i,
      });

      expect(btnClose).toBeInTheDocument();
    });

    test("It must render the emoji picker, the category name input and the create button.", () => {
      const { container } = renderWithOriginalProvider({
        children: <ModalAddCategory></ModalAddCategory>,
      });

      const emojiPickerContainer = container.querySelector<HTMLElement>(
        ".emoji-picker-react"
      );
      const input = screen.getByPlaceholderText("Category Name");
      const btnCreate = screen.getByRole("button", {
        name: /create category/i,
      });

      expect(emojiPickerContainer).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(btnCreate).toBeInTheDocument();
    });

    test("It should close the modal when the close button is clicked.", async () => {
      renderWithOriginalProvider({
        children: <ModalAddCategory></ModalAddCategory>,
      });

      const btnClose = screen.getByRole("button", {
        name: /close modal add category/i,
      });

      expect(btnClose).toBeInTheDocument();

      await user.click(btnClose);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "global/closeModalAddCategory",
        payload: undefined,
      });
    });

    test("It must create a new category when you click 'create'.", async () => {
      const emoji = undefined;
      const inputValue = "cat123";

      renderWithOriginalProvider({
        children: <ModalAddCategory></ModalAddCategory>,
      });

      const input = screen.getByPlaceholderText("Category Name");
      const btnCreate = screen.getByRole("button", {
        name: /create category/i,
      });

      expect(input).toBeInTheDocument();
      expect(btnCreate).toBeInTheDocument();

      await user.clear(input);
      await user.click(input);
      await user.keyboard(inputValue);

      expect(input).toHaveValue(inputValue);

      await user.click(btnCreate);

      const category: ToDoCategory = {
        id: expect.any(String),
        category: inputValue,
        toDos: [],
        icon: emoji!,
      };

      const alert: Alert = {
        message: `${emoji} ${inputValue} was successfully added!`,
        type: "alert--good",
      };

      expect(input).not.toHaveValue(inputValue);
      expect(mockDispatch).toHaveBeenCalledTimes(3);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "toDos/newCategoryToDo",
        payload: category,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "global/displayAlert",
        payload: alert,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "global/closeModalAddCategory",
        payload: undefined,
      });
    });
  });
});
