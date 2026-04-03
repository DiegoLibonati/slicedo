import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { UseGlobalStore, UseToDosStore } from "@/types/hooks";

import Sidebar from "@/components/Sidebar/Sidebar";

import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useToDosStore } from "@/hooks/useToDosStore";
import { useMediaQuery } from "@/hooks/useMatchMedia";

type RenderComponent = {
  container: HTMLElement;
  mockGlobalStore: UseGlobalStore;
  mockToDosStore: UseToDosStore;
};

jest.mock("@/hooks/useGlobalStore");
jest.mock("@/hooks/useToDosStore");
jest.mock("@/hooks/useMatchMedia");

const mockUseGlobalStore = useGlobalStore as jest.MockedFunction<typeof useGlobalStore>;
const mockUseToDosStore = useToDosStore as jest.MockedFunction<typeof useToDosStore>;
const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<typeof useMediaQuery>;
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
  toDosState: {
    categories: [
      { id: "my_day", category: "My Day", icon: "☀️", toDos: [] },
      { id: "important", category: "Important", icon: "⚠️", toDos: [] },
    ],
    loading: false,
    viewIdCategory: "",
    idToDoToEdit: "",
  },
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

const renderComponent = (
  globalOverrides?: Partial<UseGlobalStore>,
  todosOverrides?: Partial<UseToDosStore>
): RenderComponent => {
  const mockGlobalStore = buildGlobalStoreMock(globalOverrides);
  const mockToDosStore = buildToDosStoreMock(todosOverrides);
  mockUseGlobalStore.mockReturnValue(mockGlobalStore);
  mockUseToDosStore.mockReturnValue(mockToDosStore);
  mockUseMediaQuery.mockReturnValue({ matches: false });
  const { container } = render(<Sidebar />);
  return { container, mockGlobalStore, mockToDosStore };
};

describe("Sidebar", () => {
  it("should render the app title", () => {
    renderComponent();
    expect(screen.getByText("Die Redux ToDo")).toBeInTheDocument();
  });

  it("should render the loader when categories are loading", () => {
    const { container } = renderComponent(undefined, {
      toDosState: { categories: [], loading: true, viewIdCategory: "", idToDoToEdit: "" },
    });
    expect(container.querySelector<HTMLDivElement>(".loader")).toBeInTheDocument();
  });

  it("should render each category name", () => {
    renderComponent();
    expect(screen.getByText(/My Day/)).toBeInTheDocument();
    expect(screen.getByText(/Important/)).toBeInTheDocument();
  });

  it("should call handleOpenModalAddCategory when the add category button is clicked", async () => {
    const { mockGlobalStore } = renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Add new category" }));
    expect(mockGlobalStore.handleOpenModalAddCategory).toHaveBeenCalledTimes(1);
  });
});
