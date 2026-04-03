import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { SidebarItemProps } from "@/types/props";

import SidebarItem from "@/components/SidebarItem/SidebarItem";

type RenderComponent = {
  container: HTMLElement;
  props: SidebarItemProps;
};

const mockOnOpenCategoryToDo = jest.fn();

const renderComponent = (overrides?: Partial<SidebarItemProps>): RenderComponent => {
  const props: SidebarItemProps = {
    icon: "☀️",
    category: "My Day",
    quantity: 5,
    onOpenCategoryToDo: mockOnOpenCategoryToDo,
    ...overrides,
  };
  const { container } = render(<SidebarItem {...props} />);
  return { container, props };
};

describe("SidebarItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the category name", () => {
    renderComponent();
    expect(screen.getByText(/My Day/)).toBeInTheDocument();
  });

  it("should render the todo quantity", () => {
    renderComponent({ quantity: 7 });
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("should call onOpenCategoryToDo when the category heading is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByText(/My Day/));
    expect(mockOnOpenCategoryToDo).toHaveBeenCalledTimes(1);
  });
});
