import { render } from "@testing-library/react";

import Loader from "@/components/Loader/Loader";

type RenderComponent = { container: HTMLElement };

const renderComponent = (): RenderComponent => {
  const { container } = render(<Loader />);
  return { container };
};

describe("Loader", () => {
  it("should render the loader element", () => {
    const { container } = renderComponent();
    expect(container.querySelector<HTMLDivElement>(".loader")).toBeInTheDocument();
  });
});
