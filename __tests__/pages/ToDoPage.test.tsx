import { render, screen } from "@testing-library/react";

import type { UseGlobalStore, UseToDosStore } from "@/types/hooks";

import ToDoPage from "@/pages/ToDoPage/ToDoPage";

import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useToDosStore } from "@/hooks/useToDosStore";
import { useMediaQuery } from "@/hooks/useMatchMedia";

type RenderPage = {
  container: HTMLElement;
  mockGlobalStore: UseGlobalStore;
  mockToDosStore: UseToDosStore;
};

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

jest.mock("@/hooks/useGlobalStore");
jest.mock("@/hooks/useToDosStore");
jest.mock("@/hooks/useMatchMedia");

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
    categories: [{ id: "my_day", category: "My Day", icon: "☀️", toDos: [] }],
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

const renderPage = (
  globalOverrides?: Partial<UseGlobalStore>,
  todosOverrides?: Partial<UseToDosStore>,
  matches = false
): RenderPage => {
  const mockGlobalStore = buildGlobalStoreMock(globalOverrides);
  const mockToDosStore = buildToDosStoreMock(todosOverrides);
  mockUseGlobalStore.mockReturnValue(mockGlobalStore);
  mockUseToDosStore.mockReturnValue(mockToDosStore);
  mockUseMediaQuery.mockReturnValue({ matches });
  const { container } = render(<ToDoPage />);
  return { container, mockGlobalStore, mockToDosStore };
};

describe("ToDoPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should always render the sidebar", () => {
    renderPage();
    expect(screen.getByText("Die Redux ToDo")).toBeInTheDocument();
  });

  it("should render ToDoView when a valid category is selected", () => {
    const { container } = renderPage(undefined, {
      toDosState: {
        categories: [{ id: "my_day", category: "My Day", icon: "☀️", toDos: [] }],
        loading: false,
        viewIdCategory: "my_day",
        idToDoToEdit: "",
      },
    });
    expect(
      container.querySelector<HTMLHeadingElement>(".category-header__name")
    ).toBeInTheDocument();
  });

  it("should render ToDoPresentationView on desktop when no category is selected", () => {
    renderPage(undefined, undefined, true);
    expect(screen.getByRole("button", { name: "Select My Day category" })).toBeInTheDocument();
  });

  it("should render Alert when there is an alert message", () => {
    renderPage({
      globalState: {
        alert: { message: "Item added!", type: "alert--good" },
        modal: { modalAddCategory: false, modalManageToDo: false },
        sidebar: { sidebarMobile: false },
      },
    });
    expect(screen.getByText("Item added!")).toBeInTheDocument();
  });
});
