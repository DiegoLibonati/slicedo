import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Alert, GlobalState } from "../../entities/entities";

const initialState: GlobalState = {
  alert: {
    message: "",
    type: "",
  },
  modal: {
    modalAddCategory: false,
    modalManageToDo: false,
  },
  sidebar: {
    sidebarMobile: false,
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.sidebar.sidebarMobile = true;
    },
    closeSidebar: (state) => {
      state.sidebar.sidebarMobile = false;
    },
    openModalAddCategory: (state) => {
      state.modal.modalAddCategory = true;
    },
    closeModalAddCategory: (state) => {
      state.modal.modalAddCategory = false;
    },
    openModalManageToDo: (state) => {
      state.modal.modalManageToDo = true;
    },
    closeModalManageToDo: (state) => {
      state.modal.modalManageToDo = false;
    },
    displayAlert: (state, action: PayloadAction<Alert>) => {
      const message = action.payload.message;
      const type = action.payload.type;

      state.alert.message = message;
      state.alert.type = type;
    },
    resetAlert: (state) => {
      state.alert.message = "";
      state.alert.type = "";
    },
  },
});

export const {
  openSidebar,
  closeSidebar,
  openModalAddCategory,
  closeModalAddCategory,
  openModalManageToDo,
  closeModalManageToDo,
  displayAlert,
  resetAlert,
} = globalSlice.actions;

export default globalSlice.reducer;
