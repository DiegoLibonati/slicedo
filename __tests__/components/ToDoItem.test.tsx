import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { UseGlobalStore, UseToDosStore } from "@/types/hooks";
import type { ToDoItemProps } from "@/types/props";

import ToDoItem from "@/components/ToDoItem/ToDoItem";

import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useToDosStore } from "@/hooks/useToDosStore";

type RenderComponent = {
  container: HTMLElement;
  props: ToDoItemProps;
  mockGlobalStore: UseGlobalStore;
  mockToDosStore: UseToDosStore;
};

const mockUseGlobalStore = useGlobalStore as jest.MockedFunction<typeof useGlobalStore>;
const mockUseToDosStore = useToDosStore as jest.MockedFunction<typeof useToDosStore>;
const mockHandleResetAlert = jest.fn();
const mockHandleDisplayAlert = jest.fn();
const mockHandleOpenModalAddCategory = jest.fn();
const mockHandleCloseModalAddCategory = jest.fn();
const mockHandleOpenModalManageToDo = jest.fn();
const mockHandleCloseModalManageToDo = jest.fn();
const mockHandleOpenSidebar = jest.fn();
const mockHandleCloseSidebar = jest.fn();
const mockHandleNewCategoryToDo = jest.fn();
const mockHandleAddToDo = jest.fn();
const mockHandleRemoveToDo = jest.fn();
const mockHandleDoneToDo = jest.fn();
const mockHandleGoToImportantToDo = jest.fn();
const mockHandleEditToDo = jest.fn();
const mockHandleSetViewIdCategory = jest.fn();
const mockHandleSetEditToDo = jest.fn();
const mockHandleResetIdToDoToEdit = jest.fn();

jest.mock("@/hooks/useGlobalStore");
jest.mock("@/hooks/useToDosStore");

const buildGlobalStoreMock = (overrides?: Partial<UseGlobalStore>): UseGlobalStore => ({
  globalState: {
    alert: { message: "", type: "" },
    modal: { modalAddCategory: false, modalManageToDo: false },
    sidebar: { sidebarMobile: false },
  },
  handleResetAlert: mockHandleResetAlert,
  handleDisplayAlert: mockHandleDisplayAlert,
  handleOpenModalAddCategory: mockHandleOpenModalAddCategory,
  handleCloseModalAddCategory: mockHandleCloseModalAddCategory,
  handleOpenModalManageToDo: mockHandleOpenModalManageToDo,
  handleCloseModalManageToDo: mockHandleCloseModalManageToDo,
  handleOpenSidebar: mockHandleOpenSidebar,
  handleCloseSidebar: mockHandleCloseSidebar,
  ...overrides,
});

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

const renderComponent = (overrides?: Partial<ToDoItemProps>): RenderComponent => {
  const mockGlobalStore = buildGlobalStoreMock();
  const mockToDosStore = buildToDosStoreMock();
  mockUseGlobalStore.mockReturnValue(mockGlobalStore);
  mockUseToDosStore.mockReturnValue(mockToDosStore);

  const props: ToDoItemProps = {
    id: "todo-1",
    content: "Write tests",
    done: false,
    idCategory: "my_day",
    category: "My Day",
    ...overrides,
  };
  const { container } = render(<ToDoItem {...props} />);
  return { container, props, mockGlobalStore, mockToDosStore };
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
    const { mockToDosStore, props } = renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Delete to-do" }));
    expect(mockToDosStore.handleRemoveToDo).toHaveBeenCalledWith(props.idCategory, props.id);
  });

  it("should call handleSetEditToDo and handleOpenModalManageToDo when edit button is clicked", async () => {
    const { mockToDosStore, mockGlobalStore, props } = renderComponent({ done: false });
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Edit to-do" }));
    expect(mockToDosStore.handleSetEditToDo).toHaveBeenCalledWith(props.id);
    expect(mockGlobalStore.handleOpenModalManageToDo).toHaveBeenCalledTimes(1);
  });

  it("should not render the move to important button when in the important category", () => {
    renderComponent({ idCategory: "important", done: false });
    expect(
      screen.queryByRole("button", { name: "Move to-do to Important" })
    ).not.toBeInTheDocument();
  });
});
