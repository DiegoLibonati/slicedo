import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { UseGlobalStore, UseToDosStore } from "@/types/hooks";

import ModalAddCategory from "@/components/ModalAddCategory/ModalAddCategory";

import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useToDosStore } from "@/hooks/useToDosStore";

type RenderComponent = {
  container: HTMLElement;
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
    modal: { modalAddCategory: true, modalManageToDo: false },
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

const renderComponent = (): RenderComponent => {
  const mockGlobalStore = buildGlobalStoreMock();
  const mockToDosStore = buildToDosStoreMock();
  mockUseGlobalStore.mockReturnValue(mockGlobalStore);
  mockUseToDosStore.mockReturnValue(mockToDosStore);
  const { container } = render(<ModalAddCategory />);
  return { container, mockGlobalStore, mockToDosStore };
};

describe("ModalAddCategory", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the category name input", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("Category Name")).toBeInTheDocument();
  });

  it("should render the create category button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Create new category" })).toBeInTheDocument();
  });

  it("should call handleCloseModalAddCategory when the close button is clicked", async () => {
    const { mockGlobalStore } = renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Close add category dialog" }));
    expect(mockGlobalStore.handleCloseModalAddCategory).toHaveBeenCalledTimes(1);
  });

  it("should call handleNewCategoryToDo when the form is submitted", async () => {
    const { mockToDosStore } = renderComponent();
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Category Name"), "Work");
    await user.click(screen.getByRole("button", { name: "Create new category" }));
    expect(mockToDosStore.handleNewCategoryToDo).toHaveBeenCalledTimes(1);
  });
});
