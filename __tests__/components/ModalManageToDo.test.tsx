import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { UseGlobalStore, UseToDosStore } from "@/types/hooks";
import type { ModalManageToDoProps } from "@/types/props";

import ModalManageToDo from "@/components/ModalManageToDo/ModalManageToDo";

import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useToDosStore } from "@/hooks/useToDosStore";

type RenderComponent = {
  container: HTMLElement;
  props: ModalManageToDoProps;
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
    modal: { modalAddCategory: false, modalManageToDo: true },
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
    categories: [{ id: "cat-1", category: "My Day", icon: "☀️", toDos: [] }],
    loading: false,
    viewIdCategory: "cat-1",
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
  propOverrides?: Partial<ModalManageToDoProps>,
  storeOverrides?: Partial<UseToDosStore>
): RenderComponent => {
  const mockGlobalStore = buildGlobalStoreMock();
  const mockToDosStore = buildToDosStoreMock(storeOverrides);
  mockUseGlobalStore.mockReturnValue(mockGlobalStore);
  mockUseToDosStore.mockReturnValue(mockToDosStore);

  const props: ModalManageToDoProps = {
    idCategory: "cat-1",
    category: "My Day",
    icon: "☀️",
    ...propOverrides,
  };
  const { container } = render(<ModalManageToDo {...props} />);
  return { container, props, mockGlobalStore, mockToDosStore };
};

describe("ModalManageToDo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the ADD TODO submit button in add mode", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Add new to-do" })).toBeInTheDocument();
  });

  it("should render the EDIT TODO submit button in edit mode", () => {
    renderComponent(undefined, {
      toDosState: {
        categories: [
          {
            id: "cat-1",
            category: "My Day",
            icon: "☀️",
            toDos: [{ id: "todo-1", content: "Existing todo", done: false }],
          },
        ],
        loading: false,
        viewIdCategory: "cat-1",
        idToDoToEdit: "todo-1",
      },
    });
    expect(screen.getByRole("button", { name: "Save to-do edits" })).toBeInTheDocument();
  });

  it("should call handleCloseModalManageToDo and handleResetIdToDoToEdit when close button is clicked", async () => {
    const { mockGlobalStore, mockToDosStore } = renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Close to-do dialog" }));
    expect(mockGlobalStore.handleCloseModalManageToDo).toHaveBeenCalledTimes(1);
    expect(mockToDosStore.handleResetIdToDoToEdit).toHaveBeenCalledTimes(1);
  });

  it("should call handleAddToDo with the correct category and content when the form is submitted", async () => {
    const { mockToDosStore } = renderComponent();
    const user = userEvent.setup();
    await user.type(screen.getByRole("textbox"), "New task");
    await user.click(screen.getByRole("button", { name: "Add new to-do" }));
    expect(mockToDosStore.handleAddToDo).toHaveBeenCalledWith(
      "cat-1",
      expect.objectContaining({ content: "New task", done: false })
    );
  });
});
