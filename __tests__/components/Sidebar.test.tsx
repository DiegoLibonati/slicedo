import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { UseGlobalStore, UseToDosStore } from "@/types/hooks";

import Sidebar from "@/components/Sidebar/Sidebar";

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
    categories: [
      { id: "my_day", category: "My Day", icon: "☀️", toDos: [] },
      { id: "important", category: "Important", icon: "⚠️", toDos: [] },
    ],
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

type RenderComponent = {
  container: HTMLElement;
  globalMock: UseGlobalStore;
  todosMock: UseToDosStore;
};

const renderComponent = (
  globalOverrides?: Partial<UseGlobalStore>,
  todosOverrides?: Partial<UseToDosStore>
): RenderComponent => {
  const globalMock = buildGlobalStoreMock(globalOverrides);
  const todosMock = buildToDosStoreMock(todosOverrides);
  mockUseGlobalStore.mockReturnValue(globalMock);
  mockUseToDosStore.mockReturnValue(todosMock);
  mockUseMediaQuery.mockReturnValue({ matches: false });
  const { container } = render(<Sidebar />);
  return { container, globalMock, todosMock };
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
    const { globalMock } = renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Add new category" }));
    expect(globalMock.handleOpenModalAddCategory).toHaveBeenCalledTimes(1);
  });
});
