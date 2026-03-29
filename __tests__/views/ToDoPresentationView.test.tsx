import { render, screen } from "@testing-library/react";

import type { UseToDosStore } from "@/types/hooks";

import ToDoPresentationView from "@/views/ToDoPresentationView/ToDoPresentationView";

import { useToDosStore } from "@/hooks/useToDosStore";

jest.mock("@/hooks/useToDosStore");

const mockUseToDosStore = useToDosStore as jest.MockedFunction<typeof useToDosStore>;

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
  mock: UseToDosStore;
};

const renderView = (overrides?: Partial<UseToDosStore>): RenderView => {
  const mock = buildToDosStoreMock(overrides);
  mockUseToDosStore.mockReturnValue(mock);
  const { container } = render(<ToDoPresentationView />);
  return { container, mock };
};

describe("ToDoPresentationView", () => {
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
