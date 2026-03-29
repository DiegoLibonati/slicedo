import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { UseGlobalStore, UseToDosStore } from "@/types/hooks";
import type { ToDoItemProps } from "@/types/props";

import ToDoItem from "@/components/ToDoItem/ToDoItem";

import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useToDosStore } from "@/hooks/useToDosStore";

jest.mock("@/hooks/useGlobalStore");
jest.mock("@/hooks/useToDosStore");

const mockUseGlobalStore = useGlobalStore as jest.MockedFunction<typeof useGlobalStore>;
const mockUseToDosStore = useToDosStore as jest.MockedFunction<typeof useToDosStore>;

const buildGlobalStoreMock = (overrides?: Partial<UseGlobalStore>): UseGlobalStore => ({
  globalState: {
    alert: { message: "", type: "" },
    modal: { modalAddCategory: false, modalManageToDo: false },
    sidebar: { sidebarMobile: false },
  },
  handleResetAlert: jest.fn(),
  handleDisplayAlert: jest.fn(),
  handleOpenModalAddCategory: jest.fn(),
  handleCloseModalAddCategory: jest.fn(),
  handleOpenModalManageToDo: jest.fn(),
  handleCloseModalManageToDo: jest.fn(),
  handleOpenSidebar: jest.fn(),
  handleCloseSidebar: jest.fn(),
  ...overrides,
});

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
  props: ToDoItemProps;
  globalMock: UseGlobalStore;
  todosMock: UseToDosStore;
};

const renderComponent = (overrides?: Partial<ToDoItemProps>): RenderComponent => {
  const globalMock = buildGlobalStoreMock();
  const todosMock = buildToDosStoreMock();
  mockUseGlobalStore.mockReturnValue(globalMock);
  mockUseToDosStore.mockReturnValue(todosMock);

  const props: ToDoItemProps = {
    id: "todo-1",
    content: "Write tests",
    done: false,
    idCategory: "my_day",
    category: "My Day",
    ...overrides,
  };
  const { container } = render(<ToDoItem {...props} />);
  return { container, props, globalMock, todosMock };
};

describe("ToDoItem", () => {
  it("should render the todo content", () => {
    renderComponent();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
  });

  it("should render the mark as complete button when the todo is not done", () => {
    renderComponent({ done: false });
    expect(screen.getByRole("button", { name: "Mark to-do as complete" })).toBeInTheDocument();
  });

  it("should render the mark as incomplete button when the todo is done", () => {
    renderComponent({ done: true });
    expect(screen.getByRole("button", { name: "Mark to-do as incomplete" })).toBeInTheDocument();
  });

  it("should call handleRemoveToDo with the correct ids when delete button is clicked", async () => {
    const { todosMock, props } = renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Delete to-do" }));
    expect(todosMock.handleRemoveToDo).toHaveBeenCalledWith(props.idCategory, props.id);
  });

  it("should call handleSetEditToDo and handleOpenModalManageToDo when edit button is clicked", async () => {
    const { todosMock, globalMock, props } = renderComponent({ done: false });
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Edit to-do" }));
    expect(todosMock.handleSetEditToDo).toHaveBeenCalledWith(props.id);
    expect(globalMock.handleOpenModalManageToDo).toHaveBeenCalledTimes(1);
  });

  it("should not render the move to important button when in the important category", () => {
    renderComponent({ idCategory: "important", done: false });
    expect(
      screen.queryByRole("button", { name: "Move to-do to Important" })
    ).not.toBeInTheDocument();
  });
});
