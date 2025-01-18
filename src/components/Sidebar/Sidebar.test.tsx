import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Sidebar } from "./Sidebar";

import { useAppDispatch } from "../../constants/redux";
import { defaultCategories } from "../../constants/config";

import { renderWithOriginalProvider } from "../../tests/renders/renderWithOriginalProvider";
import { renderWithState } from "../../tests/renders/renderWithState";
import {
  mockGlobalState,
  setMockMatchMedia,
  mockTodosState,
} from "../../tests/jest.constants";

jest.mock("../../constants/redux", () => ({
  ...jest.requireActual("../../constants/redux"),
  useAppDispatch: jest.fn(),
}));

describe("Sidebar.tsx", () => {
  describe("General Tests.", () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();

      setMockMatchMedia(false);

      (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    test("It must render the loader when it is loading.", () => {
      const { container } = renderWithState({
        children: <Sidebar></Sidebar>,
        toDosState: { ...mockTodosState, loading: true },
      });

      // eslint-disable-next-line
      const loading = container.querySelector(".loader") as HTMLDivElement;

      expect(loading).toBeInTheDocument();
    });

    test("It must render the sidebar title.", () => {
      renderWithOriginalProvider({ children: <Sidebar></Sidebar> });

      const heading = screen.getByRole("heading", { name: /die redux todo/i });

      expect(heading).toBeInTheDocument();
    });

    test("It must render all the categories.", () => {
      const { container } = renderWithState({ children: <Sidebar></Sidebar> });

      const nav = screen.getByRole("navigation");
      const list = screen.getByRole("list");
      const categories = screen.getAllByRole("listitem");

      expect(nav).toBeInTheDocument();
      expect(list).toBeInTheDocument();
      expect(categories).toHaveLength(defaultCategories.length);

      // eslint-disable-next-line
      const hr = container.querySelector(".sidebar__hr") as HTMLHRElement;

      expect(hr).toBeInTheDocument();
    });

    test("It must execute the function 'handleClickOpenModalAddCategory' when the open modal add category button is clicked.", async () => {
      const { container } = renderWithOriginalProvider({
        children: <Sidebar></Sidebar>,
      });

      // eslint-disable-next-line
      const modalAddCategory = container.querySelector(
        ".modal"
      ) as HTMLDivElement;
      const btnOpenModalAddCategory = screen.getByRole("button", {
        name: /open modal add category/i,
      });

      expect(modalAddCategory).not.toBeInTheDocument();
      expect(btnOpenModalAddCategory).toBeInTheDocument();

      await user.click(btnOpenModalAddCategory);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "global/openModalAddCategory",
        payload: undefined,
      });
    });

    test("It must execute the 'onOpenCategoryToDo' function with matchMedia in false when you click on a category.", async () => {
      const category = defaultCategories[0];
      const titleCategory = `${category.icon}${category.category}`;

      renderWithOriginalProvider({
        children: <Sidebar></Sidebar>,
      });

      const headingCategory = screen.getByRole("heading", {
        name: titleCategory,
      });

      expect(headingCategory).toBeInTheDocument();

      await user.click(headingCategory);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "global/openSidebar",
        payload: undefined,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "toDos/setViewIdCategory",
        payload: category.id,
      });
    });

    test("It must execute the 'onOpenCategoryToDo' function with matchMedia in true when you click on a category.", async () => {
      setMockMatchMedia(true);

      const category = defaultCategories[0];
      const titleCategory = `${category.icon}${category.category}`;

      renderWithOriginalProvider({
        children: <Sidebar></Sidebar>,
      });

      const headingCategory = screen.getByRole("heading", {
        name: titleCategory,
      });

      expect(headingCategory).toBeInTheDocument();

      await user.click(headingCategory);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "toDos/setViewIdCategory",
        payload: category.id,
      });
    });

    test("It should render the modal if 'modalAddCategory' is true.", () => {
      const { container } = renderWithState({
        children: <Sidebar></Sidebar>,
        globalState: {
          ...mockGlobalState,
          modal: { ...mockGlobalState.modal, modalAddCategory: true },
        },
      });

      // eslint-disable-next-line
      const modalAddCategory = container.querySelector(
        ".modal"
      ) as HTMLDivElement;

      expect(modalAddCategory).toBeInTheDocument();
    });
  });
});
