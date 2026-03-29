import { configureStore } from "@reduxjs/toolkit";

import globalSlice from "@/features/global/globalSlice";
import toDosSlice from "@/features/toDos/toDosSlice";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    toDos: toDosSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
