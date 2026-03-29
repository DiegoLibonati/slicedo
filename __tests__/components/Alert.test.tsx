import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { UseGlobalStore } from "@/types/hooks";

import Alert from "@/components/Alert/Alert";

import { useGlobalStore } from "@/hooks/useGlobalStore";

jest.mock("@/hooks/useGlobalStore");

const mockUseGlobalStore = useGlobalStore as jest.MockedFunction<typeof useGlobalStore>;

const buildGlobalStoreMock = (overrides?: Partial<UseGlobalStore>): UseGlobalStore => ({
  globalState: {
    alert: { message: "Something went wrong", type: "alert--bad" },
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

type RenderComponent = {
  container: HTMLElement;
  mock: UseGlobalStore;
};

const renderComponent = (overrides?: Partial<UseGlobalStore>): RenderComponent => {
  const mock = buildGlobalStoreMock(overrides);
  mockUseGlobalStore.mockReturnValue(mock);
  const { container } = render(<Alert />);
  return { container, mock };
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
    const { mock } = renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Dismiss alert" }));
    expect(mock.handleResetAlert).toHaveBeenCalledTimes(1);
  });
});
