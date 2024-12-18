import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { SidebarItem } from "./SidebarItem";

const mockOnOpenCategoryToDo = jest.fn();

type RenderComponent = {
  props: {
    icon: string;
    category: string;
    quantity: number;
    onOpenCategoryToDo: jest.Mock;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    icon: "1",
    category: "cat",
    quantity: 10,
    onOpenCategoryToDo: mockOnOpenCategoryToDo,
  };

  const { container } = render(
    <SidebarItem
      category={props.category}
      icon={props.icon}
      onOpenCategoryToDo={props.onOpenCategoryToDo}
      quantity={props.quantity}
    ></SidebarItem>
  );

  return {
    props: props,
    container: container,
  };
};

test("It must render the sidebar item.", () => {
  const { props } = renderComponent();

  const sidebarItem = screen.getByRole("listitem");
  const heading = screen.getByRole("heading", {
    name: `${props.icon}${props.category}`,
  });
  const quantity = screen.getByRole("heading", {
    name: String(props.quantity),
  });

  expect(sidebarItem).toBeInTheDocument();
  expect(heading).toBeInTheDocument();
  expect(quantity).toBeInTheDocument();
});

test("It must execute the 'onOpenCategoryToDo' function when you click on the item title.", async () => {
  const { props } = renderComponent();

  const heading = screen.getByRole("heading", {
    name: `${props.icon}${props.category}`,
  });

  expect(heading).toBeInTheDocument();

  await user.click(heading);

  expect(mockOnOpenCategoryToDo).toHaveBeenCalledTimes(1);
});
