import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { UseGlobalStore } from "@/types/hooks";

import Alert from "@/components/Alert/Alert";

import { useGlobalStore } from "@/hooks/useGlobalStore";

type RenderComponent = {
  container: HTMLElement;
  mockGlobalStore: UseGlobalStore;
};

const mockUseGlobalStore = useGlobalStore as jest.MockedFunction<typeof useGlobalStore>;
const mockHandleResetAlert = jest.fn();
const mockHandleDisplayAlert = jest.fn();
const mockHandleOpenModalAddCategory = jest.fn();
const mockHandleCloseModalAddCategory = jest.fn();
const mockHandleOpenModalManageToDo = jest.fn();
const mockHandleCloseModalManageToDo = jest.fn();
const mockHandleOpenSidebar = jest.fn();
const mockHandleCloseSidebar = jest.fn();

jest.mock("@/hooks/useGlobalStore");

const buildGlobalStoreMock = (overrides?: Partial<UseGlobalStore>): UseGlobalStore => ({
  globalState: {
    alert: { message: "Something went wrong", type: "alert--bad" },
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

const renderComponent = (overrides?: Partial<UseGlobalStore>): RenderComponent => {
  const mockGlobalStore = buildGlobalStoreMock(overrides);
  mockUseGlobalStore.mockReturnValue(mockGlobalStore);
  const { container } = render(<Alert />);
  return { container, mockGlobalStore };
};

describe("Alert", () => {
  it("should render the alert message", () => {
    renderComponent();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should render the dismiss button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Dismiss alert" })).toBeInTheDocument();
  });

  it("should call handleResetAlert when the dismiss button is clicked", async () => {
    const { mockGlobalStore } = renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Dismiss alert" }));
    expect(mockGlobalStore.handleResetAlert).toHaveBeenCalledTimes(1);
  });
});
