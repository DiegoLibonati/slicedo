import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ToDoPresentantionButtonProps } from "@/types/props";
import type { UseToDosStore } from "@/types/hooks";

import ToDoPresentantionButton from "@/components/ToDoPresentationButton/ToDoPresentantionButton";

import { useToDosStore } from "@/hooks/useToDosStore";

type RenderComponent = {
  container: HTMLElement;
  props: ToDoPresentantionButtonProps;
  mockToDosStore: UseToDosStore;
};

jest.mock("@/hooks/useToDosStore");

const mockUseToDosStore = useToDosStore as jest.MockedFunction<typeof useToDosStore>;
const mockHandleNewCategoryToDo = jest.fn();
const mockHandleAddToDo = jest.fn();
const mockHandleRemoveToDo = jest.fn();
const mockHandleDoneToDo = jest.fn();
const mockHandleGoToImportantToDo = jest.fn();
const mockHandleEditToDo = jest.fn();
const mockHandleSetViewIdCategory = jest.fn();
const mockHandleSetEditToDo = jest.fn();
const mockHandleResetIdToDoToEdit = jest.fn();

const buildToDosStoreMock = (overrides?: Partial<UseToDosStore>): UseToDosStore => ({
  toDosState: { categories: [], loading: false, viewIdCategory: "", idToDoToEdit: "" },
  handleNewCategoryToDo: mockHandleNewCategoryToDo,
  handleAddToDo: mockHandleAddToDo,
  handleRemoveToDo: mockHandleRemoveToDo,
  handleDoneToDo: mockHandleDoneToDo,
  handleGoToImportantToDo: mockHandleGoToImportantToDo,
  handleEditToDo: mockHandleEditToDo,
  handleSetViewIdCategory: mockHandleSetViewIdCategory,
  handleSetEditToDo: mockHandleSetEditToDo,
  handleResetIdToDoToEdit: mockHandleResetIdToDoToEdit,
  ...overrides,
});

const renderComponent = (overrides?: Partial<ToDoPresentantionButtonProps>): RenderComponent => {
  const mockToDosStore = buildToDosStoreMock();
  mockUseToDosStore.mockReturnValue(mockToDosStore);

  const props: ToDoPresentantionButtonProps = {
    idCategory: "my_day",
    category: "My Day",
    icon: "☀️",
    ...overrides,
  };
  const { container } = render(<ToDoPresentantionButton {...props} />);
  return { container, props, mockToDosStore };
};

describe("ToDoPresentantionButton", () => {
  it("should render the category name", () => {
    renderComponent();
    expect(screen.getByText(/My Day/)).toBeInTheDocument();
  });

  it("should have an accessible label that includes the category name", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Select My Day category" })).toBeInTheDocument();
  });

  it("should call handleSetViewIdCategory with the idCategory when clicked", async () => {
    const { mockToDosStore, props } = renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Select My Day category" }));
    expect(mockToDosStore.handleSetViewIdCategory).toHaveBeenCalledWith(props.idCategory);
  });
});
