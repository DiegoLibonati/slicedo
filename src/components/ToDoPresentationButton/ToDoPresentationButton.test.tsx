import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { ToDoPresentantionButton } from "./ToDoPresentantionButton";

import { useAppDispatch } from "../../constants/redux";

import { renderWithOriginalProvider } from "../../tests/renders/renderWithOriginalProvider";

jest.mock("../../constants/redux", () => ({
  useAppDispatch: jest.fn(),
}));

describe("ToDoPresentationButton.tsx", () => {
  describe("General Tests.", () => {
    const props = {
      icon: "icon",
      idCategory: "cat_1",
      category: "category",
    };

    const mockDispatch = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();

      (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    test("It must render the root of the presentation button.", () => {
      renderWithOriginalProvider({
        children: (
          <ToDoPresentantionButton
            icon={props.icon}
            category={props.category}
            idCategory={props.idCategory}
          ></ToDoPresentantionButton>
        ),
      });

      const article = screen.getByRole("article");

      expect(article).toBeInTheDocument();
      expect(article).toHaveClass("category");
    });

    test("It must render the category button.", () => {
      renderWithOriginalProvider({
        children: (
          <ToDoPresentantionButton
            icon={props.icon}
            category={props.category}
            idCategory={props.idCategory}
          ></ToDoPresentantionButton>
        ),
      });

      const btnCategory = screen.getByRole("button", {
        name: /todo category button/i,
      });

      expect(btnCategory).toBeInTheDocument();
      expect(btnCategory).toHaveTextContent(`${props.icon}${props.category}`);
    });

    test("It must execute the 'handleClickCategory' function when the presentation button is clicked.", async () => {
      renderWithOriginalProvider({
        children: (
          <ToDoPresentantionButton
            icon={props.icon}
            category={props.category}
            idCategory={props.idCategory}
          ></ToDoPresentantionButton>
        ),
      });

      const btnCategory = screen.getByRole("button", {
        name: /todo category button/i,
      });

      expect(btnCategory).toBeInTheDocument();

      await user.click(btnCategory);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "toDos/setViewIdCategory",
        payload: props.idCategory,
      });
    });
  });
});
