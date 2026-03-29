import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ToDoPresentantionButtonProps } from "@/types/props";
import type { UseToDosStore } from "@/types/hooks";

import ToDoPresentantionButton from "@/components/ToDoPresentationButton/ToDoPresentantionButton";

import { useToDosStore } from "@/hooks/useToDosStore";

jest.mock("@/hooks/useToDosStore");

const mockUseToDosStore = useToDosStore as jest.MockedFunction<typeof useToDosStore>;

const buildToDosStoreMock = (overrides?: Partial<UseToDosStore>): UseToDosStore => ({
  toDosState: { categories: [], loading: false, viewIdCategory: "", idToDoToEdit: "" },
  handleNewCategoryToDo: jest.fn(),
  handleAddToDo: jest.fn(),
  handleRemoveToDo: jest.fn(),
  handleDoneToDo: jest.fn(),
  handleGoToImportantToDo: jest.fn(),
  handleEditToDo: jest.fn(),
  handleSetViewIdCategory: jest.fn(),
  handleSetEditToDo: jest.fn(),
  handleResetIdToDoToEdit: jest.fn(),
  ...overrides,
});

type RenderComponent = {
  container: HTMLElement;
  props: ToDoPresentantionButtonProps;
  mock: UseToDosStore;
};

const renderComponent = (overrides?: Partial<ToDoPresentantionButtonProps>): RenderComponent => {
  const mock = buildToDosStoreMock();
  mockUseToDosStore.mockReturnValue(mock);

  const props: ToDoPresentantionButtonProps = {
    idCategory: "my_day",
    category: "My Day",
    icon: "☀️",
    ...overrides,
  };
  const { container } = render(<ToDoPresentantionButton {...props} />);
  return { container, props, mock };
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
    const { mock, props } = renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Select My Day category" }));
    expect(mock.handleSetViewIdCategory).toHaveBeenCalledWith(props.idCategory);
  });
});
