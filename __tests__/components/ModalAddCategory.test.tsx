import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { UseGlobalStore, UseToDosStore } from "@/types/hooks";

import ModalAddCategory from "@/components/ModalAddCategory/ModalAddCategory";

import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useToDosStore } from "@/hooks/useToDosStore";

jest.mock("@/hooks/useGlobalStore");
jest.mock("@/hooks/useToDosStore");

const mockUseGlobalStore = useGlobalStore as jest.MockedFunction<typeof useGlobalStore>;
const mockUseToDosStore = useToDosStore as jest.MockedFunction<typeof useToDosStore>;

const buildGlobalStoreMock = (overrides?: Partial<UseGlobalStore>): UseGlobalStore => ({
  globalState: {
    alert: { message: "", type: "" },
    modal: { modalAddCategory: true, modalManageToDo: false },
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
  globalMock: UseGlobalStore;
  todosMock: UseToDosStore;
};

const renderComponent = (): RenderComponent => {
  const globalMock = buildGlobalStoreMock();
  const todosMock = buildToDosStoreMock();
  mockUseGlobalStore.mockReturnValue(globalMock);
  mockUseToDosStore.mockReturnValue(todosMock);
  const { container } = render(<ModalAddCategory />);
  return { container, globalMock, todosMock };
};

describe("ModalAddCategory", () => {
  it("should render the category name input", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("Category Name")).toBeInTheDocument();
  });

  it("should render the create category button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Create new category" })).toBeInTheDocument();
  });

  it("should call handleCloseModalAddCategory when the close button is clicked", async () => {
    const { globalMock } = renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Close add category dialog" }));
    expect(globalMock.handleCloseModalAddCategory).toHaveBeenCalledTimes(1);
  });

  it("should call handleNewCategoryToDo when the form is submitted", async () => {
    const { todosMock } = renderComponent();
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Category Name"), "Work");
    await user.click(screen.getByRole("button", { name: "Create new category" }));
    expect(todosMock.handleNewCategoryToDo).toHaveBeenCalledTimes(1);
  });
});
