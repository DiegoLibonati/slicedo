import { configureStore } from "@reduxjs/toolkit";

import type { GlobalState, ToDosState } from "@/types/states";

import globalReducer from "@/features/global/globalSlice";
import toDosReducer from "@/features/toDos/toDosSlice";

const _PROTO_STORE = configureStore({
  reducer: { global: globalReducer, toDos: toDosReducer },
});

export type TestStore = typeof _PROTO_STORE;

export interface TestPreloadedState {
  global?: Partial<GlobalState>;
  toDos?: Partial<ToDosState>;
}

const INIT = { type: "@@INIT" };

export const createTestStore = (preloadedState: TestPreloadedState = {}): TestStore => {
  const globalDefault = globalReducer(undefined, INIT);
  const toDosDefault = toDosReducer(undefined, INIT);

  return configureStore({
    reducer: { global: globalReducer, toDos: toDosReducer },
    preloadedState: {
      global: { ...globalDefault, ...preloadedState.global } as GlobalState,
      toDos: { ...toDosDefault, ...preloadedState.toDos } as ToDosState,
    },
  });
};
