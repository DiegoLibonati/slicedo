import { configureStore } from "@reduxjs/toolkit";

import globalSlice from "./global/globalSlice";
import toDosSlice from "./toDos/toDosSlice";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    toDos: toDosSlice,
  },
});
