import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { SidebarItemProps } from "@/types/props";

import SidebarItem from "@/components/SidebarItem/SidebarItem";

const mockOnOpenCategoryToDo = jest.fn();

const renderComponent = (props: Partial<SidebarItemProps> = {}): RenderResult => {
  const defaultProps: SidebarItemProps = {
    icon: "💼",
    category: "Work",
    quantity: 3,
    onOpenCategoryToDo: mockOnOpenCategoryToDo,
    ...props,
  };
  return render(<SidebarItem {...defaultProps} />);
};

describe("SidebarItem", () => {
  describe("rendering", () => {
    it("should render the category heading with icon and name", () => {
      renderComponent();
      expect(screen.getByRole("heading", { name: "💼Work" })).toBeInTheDocument();
    });

    it("should render the quantity", () => {
      renderComponent({ quantity: 5 });
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("should render with the provided icon and category", () => {
      renderComponent({ icon: "🏠", category: "Home" });
      expect(screen.getByRole("heading", { name: "🏠Home" })).toBeInTheDocument();
    });

    it("should render zero quantity", () => {
      renderComponent({ quantity: 0 });
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should call onOpenCategoryToDo when the category heading is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("heading", { name: "💼Work" }));
      expect(mockOnOpenCategoryToDo).toHaveBeenCalledTimes(1);
    });
  });
});
