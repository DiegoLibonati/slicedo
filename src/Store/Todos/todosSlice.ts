import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ToDo, ToDoCategory, ToDosState } from "../../entities/entities";

import { getCategoriesFromLocalStorage } from "../../helpers/getCategoriesFromLocalStorage";
import { defaultCategories } from "../../constants/config";

const localStorageCategories = getCategoriesFromLocalStorage();

const initialState: ToDosState = {
  categories: localStorageCategories.length
    ? localStorageCategories
    : defaultCategories,
  loading: false,
  viewIdCategory: "",
  idToDoToEdit: "",
};

export const toDosSlice = createSlice({
  name: "toDos",
  initialState,
  reducers: {
    newCategoryToDo: (state, action: PayloadAction<ToDoCategory>) => {
      state.loading = true;

      const category = action.payload;

      state.categories.push(category);
      state.loading = false;
    },
    addToDo: (
      state,
      action: PayloadAction<{
        idCategory: string;
        newToDo: ToDo;
      }>
    ) => {
      state.loading = true;

      const idCategory = action.payload.idCategory;
      const newToDo = action.payload.newToDo;

      state.categories = state.categories.map((category) => {
        if (category.id === idCategory) category.toDos.push(newToDo);
        return category;
      });

      state.loading = false;
    },
    removeToDo: (
      state,
      action: PayloadAction<{ idCategory: string; idToDo: string }>
    ) => {
      state.loading = true;

      const idCategory = action.payload.idCategory;
      const idToDo = action.payload.idToDo;

      state.categories = state.categories.map((category) => {
        if (category.id === idCategory)
          category.toDos = category.toDos.filter((toDo) => toDo.id !== idToDo);

        return category;
      });

      state.loading = false;
    },
    doneToDo: (
      state,
      action: PayloadAction<{ idCategory: string; idToDo: string }>
    ) => {
      state.loading = true;

      const idCategory = action.payload.idCategory;
      const idToDo = action.payload.idToDo;

      state.categories = state.categories.map((category) => {
        if (category.id === idCategory)
          category.toDos.forEach((toDo) => {
            if (toDo.id === idToDo) toDo.done = !toDo.done;
          });

        return category;
      });

      state.loading = false;
    },
    goToImportantToDo: (
      state,
      action: PayloadAction<{ idCategory: string; toDo: ToDo }>
    ) => {
      state.loading = true;

      const idCategory = action.payload.idCategory;
      const toDoToMove = action.payload.toDo;

      state.categories = state.categories.map((category) => {
        if (category.id === idCategory)
          category.toDos = category.toDos.filter(
            (toDo) => toDo.id !== toDoToMove.id
          );

        if (category.id === "important") category.toDos.push(toDoToMove);

        return category;
      });

      state.loading = false;
    },
    editToDo: (
      state,
      action: PayloadAction<{ idCategory: string; toDo: ToDo }>
    ) => {
      state.loading = true;

      const idCategory = action.payload.idCategory;
      const toDoEdited = action.payload.toDo;

      state.categories = state.categories.map((category) => {
        if (category.id === idCategory)
          category.toDos.forEach((toDo) => {
            if (toDo.id === toDoEdited.id) toDo.content = toDoEdited.content;
          });

        return category;
      });

      state.loading = false;
    },
    setViewIdCategory: (state, action: PayloadAction<string>) => {
      const idCategory = action.payload;

      state.viewIdCategory = idCategory;
    },
    setEditToDo: (state, action: PayloadAction<string>) => {
      state.loading = true;

      const idToDo = action.payload;

      state.idToDoToEdit = idToDo;

      state.loading = false;
    },
    resetIdToDoToEdit: (state) => {
      state.idToDoToEdit = "";
    },
  },
});

export const {
  newCategoryToDo,
  addToDo,
  removeToDo,
  doneToDo,
  goToImportantToDo,
  editToDo,
  setViewIdCategory,
  setEditToDo,
  resetIdToDoToEdit,
} = toDosSlice.actions;

export default toDosSlice.reducer;
