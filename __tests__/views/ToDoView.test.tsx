import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ToDoViewProps } from "@/types/props";
import type { UseGlobalStore, UseToDosStore } from "@/types/hooks";

import ToDoView from "@/views/ToDoView/ToDoView";

import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useToDosStore } from "@/hooks/useToDosStore";

interface RenderView {
  container: HTMLElement;
  props: ToDoViewProps;
  mockGlobalStore: UseGlobalStore;
  mockToDosStore: UseToDosStore;
}

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

const renderView = (
  propOverrides?: Partial<ToDoViewProps>,
  globalOverrides?: Partial<UseGlobalStore>,
  todosOverrides?: Partial<UseToDosStore>
): RenderView => {
  const mockGlobalStore = buildGlobalStoreMock(globalOverrides);
  const mockToDosStore = buildToDosStoreMock(todosOverrides);
  mockUseGlobalStore.mockReturnValue(mockGlobalStore);
  mockUseToDosStore.mockReturnValue(mockToDosStore);

  const props: ToDoViewProps = {
    idCategory: "my_day",
    icon: "☀️",
    category: "My Day",
    toDos: [],
    ...propOverrides,
  };
  const { container } = render(<ToDoView {...props} />);
  return { container, props, mockGlobalStore, mockToDosStore };
};

describe("ToDoView", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the loader when loading", () => {
    const { container } = renderView(undefined, undefined, {
      toDosState: { categories: [], loading: true, viewIdCategory: "", idToDoToEdit: "" },
    });
    expect(container.querySelector<HTMLDivElement>(".loader")).toBeInTheDocument();
  });

  it("should render the uppercased category name in the header", () => {
    const { container } = renderView({ category: "My Day" });
    expect(
      container.querySelector<HTMLHeadingElement>(".category-header__name")?.textContent
    ).toContain("MY DAY");
  });

  it("should render the add first todo button when there are no todos", () => {
    renderView({ toDos: [] });
    expect(screen.getByRole("button", { name: "Add your first to-do" })).toBeInTheDocument();
  });

  it("should render todo items when todos are provided", () => {
    renderView({ toDos: [{ id: "t1", content: "Buy groceries", done: false }] });
    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
  });

  it("should show the close view button when sidebarMobile is true", () => {
    renderView(undefined, {
      globalState: {
        alert: { message: "", type: "" },
        modal: { modalAddCategory: false, modalManageToDo: false },
        sidebar: { sidebarMobile: true },
      },
    });
    expect(screen.getByRole("button", { name: "Close to-do view" })).toBeInTheDocument();
  });

  it("should call handleCloseSidebar when the close view button is clicked", async () => {
    const { mockGlobalStore } = renderView(undefined, {
      globalState: {
        alert: { message: "", type: "" },
        modal: { modalAddCategory: false, modalManageToDo: false },
        sidebar: { sidebarMobile: true },
      },
    });
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Close to-do view" }));
    expect(mockGlobalStore.handleCloseSidebar).toHaveBeenCalledTimes(1);
  });
});
