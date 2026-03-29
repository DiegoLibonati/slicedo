import { render } from "@testing-library/react";

import Loader from "@/components/Loader/Loader";

describe("Loader", () => {
  it("should render the loader element", () => {
    const { container } = render(<Loader />);
    expect(container.querySelector<HTMLDivElement>(".loader")).toBeInTheDocument();
  });
});
