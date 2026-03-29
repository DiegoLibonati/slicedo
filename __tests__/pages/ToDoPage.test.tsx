import { render, screen } from "@testing-library/react";

import type { UseGlobalStore, UseToDosStore } from "@/types/hooks";

import ToDoPage from "@/pages/ToDoPage/ToDoPage";

import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useToDosStore } from "@/hooks/useToDosStore";
import { useMediaQuery } from "@/hooks/useMatchMedia";

jest.mock("@/hooks/useGlobalStore");
jest.mock("@/hooks/useToDosStore");
jest.mock("@/hooks/useMatchMedia");

const mockUseGlobalStore = useGlobalStore as jest.MockedFunction<typeof useGlobalStore>;
const mockUseToDosStore = useToDosStore as jest.MockedFunction<typeof useToDosStore>;
const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<typeof useMediaQuery>;

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
  toDosState: {
    categories: [{ id: "my_day", category: "My Day", icon: "☀️", toDos: [] }],
    loading: false,
    viewIdCategory: "",
    idToDoToEdit: "",
  },
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

type RenderPage = {
  container: HTMLElement;
  globalMock: UseGlobalStore;
  todosMock: UseToDosStore;
};

const renderPage = (
  globalOverrides?: Partial<UseGlobalStore>,
  todosOverrides?: Partial<UseToDosStore>,
  matches = false
): RenderPage => {
  const globalMock = buildGlobalStoreMock(globalOverrides);
  const todosMock = buildToDosStoreMock(todosOverrides);
  mockUseGlobalStore.mockReturnValue(globalMock);
  mockUseToDosStore.mockReturnValue(todosMock);
  mockUseMediaQuery.mockReturnValue({ matches });
  const { container } = render(<ToDoPage />);
  return { container, globalMock, todosMock };
};

describe("ToDoPage", () => {
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
