import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { UseGlobalStore, UseToDosStore } from "@/types/hooks";
import type { ModalManageToDoProps } from "@/types/props";

import ModalManageToDo from "@/components/ModalManageToDo/ModalManageToDo";

import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useToDosStore } from "@/hooks/useToDosStore";

jest.mock("@/hooks/useGlobalStore");
jest.mock("@/hooks/useToDosStore");

const mockUseGlobalStore = useGlobalStore as jest.MockedFunction<typeof useGlobalStore>;
const mockUseToDosStore = useToDosStore as jest.MockedFunction<typeof useToDosStore>;

const buildGlobalStoreMock = (overrides?: Partial<UseGlobalStore>): UseGlobalStore => ({
  globalState: {
    alert: { message: "", type: "" },
    modal: { modalAddCategory: false, modalManageToDo: true },
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
    categories: [{ id: "cat-1", category: "My Day", icon: "☀️", toDos: [] }],
    loading: false,
    viewIdCategory: "cat-1",
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
  props: ModalManageToDoProps;
  globalMock: UseGlobalStore;
  todosMock: UseToDosStore;
};

const renderComponent = (
  propOverrides?: Partial<ModalManageToDoProps>,
  storeOverrides?: Partial<UseToDosStore>
): RenderComponent => {
  const globalMock = buildGlobalStoreMock();
  const todosMock = buildToDosStoreMock(storeOverrides);
  mockUseGlobalStore.mockReturnValue(globalMock);
  mockUseToDosStore.mockReturnValue(todosMock);

  const props: ModalManageToDoProps = {
    idCategory: "cat-1",
    category: "My Day",
    icon: "☀️",
    ...propOverrides,
  };
  const { container } = render(<ModalManageToDo {...props} />);
  return { container, props, globalMock, todosMock };
};

describe("ModalManageToDo", () => {
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
    const { globalMock, todosMock } = renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Close to-do dialog" }));
    expect(globalMock.handleCloseModalManageToDo).toHaveBeenCalledTimes(1);
    expect(todosMock.handleResetIdToDoToEdit).toHaveBeenCalledTimes(1);
  });

  it("should call handleAddToDo with the correct category and content when the form is submitted", async () => {
    const { todosMock } = renderComponent();
    const user = userEvent.setup();
    await user.type(screen.getByRole("textbox"), "New task");
    await user.click(screen.getByRole("button", { name: "Add new to-do" }));
    expect(todosMock.handleAddToDo).toHaveBeenCalledWith(
      "cat-1",
      expect.objectContaining({ content: "New task", done: false })
    );
  });
});
