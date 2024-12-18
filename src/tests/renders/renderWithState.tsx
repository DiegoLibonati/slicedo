import { render } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { GlobalState, ToDosState } from "../../entities/entities";

import globalSlice from "../../store/global/globalSlice";
import toDosSlice from "../../store/toDos/toDosSlice";

import { GLOBAL_STATE_MOCK, TODOS_STATE_MOCK } from "../jest.setup";

type RenderWithStateProps = {
  globalState?: GlobalState;
  toDosState?: ToDosState;
  children: React.ReactNode;
};

export const renderWithState = ({
  children,
  globalState = GLOBAL_STATE_MOCK,
  toDosState = TODOS_STATE_MOCK,
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
