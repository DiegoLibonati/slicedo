import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ToDoViewProps } from "@/types/props";
import type { UseGlobalStore, UseToDosStore } from "@/types/hooks";

import ToDoView from "@/views/ToDoView/ToDoView";

import { useGlobalStore } from "@/hooks/useGlobalStore";
import { useToDosStore } from "@/hooks/useToDosStore";

jest.mock("@/hooks/useGlobalStore");
jest.mock("@/hooks/useToDosStore");

const mockUseGlobalStore = useGlobalStore as jest.MockedFunction<typeof useGlobalStore>;
const mockUseToDosStore = useToDosStore as jest.MockedFunction<typeof useToDosStore>;

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

type RenderView = {
  container: HTMLElement;
  props: ToDoViewProps;
  globalMock: UseGlobalStore;
  todosMock: UseToDosStore;
};

const renderView = (
  propOverrides?: Partial<ToDoViewProps>,
  globalOverrides?: Partial<UseGlobalStore>,
  todosOverrides?: Partial<UseToDosStore>
): RenderView => {
  const globalMock = buildGlobalStoreMock(globalOverrides);
  const todosMock = buildToDosStoreMock(todosOverrides);
  mockUseGlobalStore.mockReturnValue(globalMock);
  mockUseToDosStore.mockReturnValue(todosMock);

  const props: ToDoViewProps = {
    idCategory: "my_day",
    icon: "☀️",
    category: "My Day",
    toDos: [],
    ...propOverrides,
  };
  const { container } = render(<ToDoView {...props} />);
  return { container, props, globalMock, todosMock };
};

describe("ToDoView", () => {
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
    const { globalMock } = renderView(undefined, {
      globalState: {
        alert: { message: "", type: "" },
        modal: { modalAddCategory: false, modalManageToDo: false },
        sidebar: { sidebarMobile: true },
      },
    });
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Close to-do view" }));
    expect(globalMock.handleCloseSidebar).toHaveBeenCalledTimes(1);
  });
});
