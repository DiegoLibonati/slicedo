import { configureStore } from "@reduxjs/toolkit";

import globalSlice from "@src/store/global/globalSlice";
import toDosSlice from "@src/store/toDos/toDosSlice";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    toDos: toDosSlice,
  },
});
