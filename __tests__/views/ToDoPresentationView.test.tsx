import { render, screen } from "@testing-library/react";

import type { UseToDosStore } from "@/types/hooks";

import ToDoPresentationView from "@/views/ToDoPresentationView/ToDoPresentationView";

import { useToDosStore } from "@/hooks/useToDosStore";

type RenderView = {
  container: HTMLElement;
  mockToDosStore: UseToDosStore;
};

const mockUseToDosStore = useToDosStore as jest.MockedFunction<typeof useToDosStore>;
const mockHandleNewCategoryToDo = jest.fn();
const mockHandleAddToDo = jest.fn();
const mockHandleRemoveToDo = jest.fn();
const mockHandleDoneToDo = jest.fn();
const mockHandleGoToImportantToDo = jest.fn();
const mockHandleEditToDo = jest.fn();
const mockHandleSetViewIdCategory = jest.fn();
const mockHandleSetEditToDo = jest.fn();
const mockHandleResetIdToDoToEdit = jest.fn();

jest.mock("@/hooks/useToDosStore");

const buildToDosStoreMock = (overrides?: Partial<UseToDosStore>): UseToDosStore => ({
  toDosState: {
    categories: [
      { id: "my_day", category: "My Day", icon: "☀️", toDos: [] },
      { id: "tasks", category: "Tasks", icon: "🎯", toDos: [] },
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

const renderView = (overrides?: Partial<UseToDosStore>): RenderView => {
  const mockToDosStore = buildToDosStoreMock(overrides);
  mockUseToDosStore.mockReturnValue(mockToDosStore);
  const { container } = render(<ToDoPresentationView />);
  return { container, mockToDosStore };
};

describe("ToDoPresentationView", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a button for each category", () => {
    renderView();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("should render the category names", () => {
    renderView();
    expect(screen.getByText(/My Day/)).toBeInTheDocument();
    expect(screen.getByText(/Tasks/)).toBeInTheDocument();
  });
});
