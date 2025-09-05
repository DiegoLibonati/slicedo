import { render } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { GlobalState, ToDosState } from "../../src/entities/entities";

import globalSlice from "../../src/store/global/globalSlice";
import toDosSlice from "../../src/store/toDos/toDosSlice";

import { mockGlobalState, mockTodosState } from "../jest.constants";

type RenderWithStateProps = {
  globalState?: GlobalState;
  toDosState?: ToDosState;
  children: React.ReactNode;
};

export const renderWithState = ({
  children,
  globalState = mockGlobalState,
  toDosState = mockTodosState,
}: RenderWithStateProps) => {
  const testStore = configureStore({
    reducer: {
      global: globalSlice,
      toDos: toDosSlice,
    },
    preloadedState: {
      global: { ...globalState },
      toDos: { ...toDosState },
    },
  });

  return render(<Provider store={testStore}>{children}</Provider>);
};
