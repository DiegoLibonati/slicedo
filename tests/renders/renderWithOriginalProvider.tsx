import { Provider } from "react-redux";

import { render } from "@testing-library/react";

import { store } from "@src/store/store";

type RenderWithOriginalProvider = {
  children: React.ReactNode;
};

export const renderWithOriginalProvider = ({
  children,
}: RenderWithOriginalProvider) => {
  return render(<Provider store={store}>{children}</Provider>);
};
