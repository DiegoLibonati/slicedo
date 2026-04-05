import type { UseToDosStore } from "@/types/hooks";
import type { ToDo, ToDoCategory } from "@/types/app";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

import {
  addToDo,
  doneToDo,
  editToDo,
  goToImportantToDo,
  newCategoryToDo,
  removeToDo,
  resetIdToDoToEdit,
  setEditToDo,
  setViewIdCategory,
} from "@/features/toDos/toDosSlice";

export const useToDosStore = (): UseToDosStore => {
  const toDosState = useAppSelector((state) => state.toDos);
  const dispatch = useAppDispatch();

  const handleNewCategoryToDo = (category: ToDoCategory): void => {
    dispatch(newCategoryToDo(category));
  };

  const handleResetIdToDoToEdit = (): void => {
    dispatch(resetIdToDoToEdit());
  };

  const handleAddToDo = (idCategory: string, toDo: ToDo): void => {
    dispatch(addToDo({ idCategory: idCategory, newToDo: toDo }));
  };

  const handleEditToDo = (idCategory: string, toDo: ToDo): void => {
    dispatch(editToDo({ idCategory: idCategory, toDo: toDo }));
  };

  const handleSetViewIdCategory = (idCategory: string): void => {
    dispatch(setViewIdCategory(idCategory));
  };

  const handleDoneToDo = (idCategory: string, idToDo: string): void => {
    dispatch(doneToDo({ idCategory: idCategory, idToDo: idToDo }));
  };

  const handleRemoveToDo = (idCategory: string, idToDo: string): void => {
    dispatch(removeToDo({ idCategory: idCategory, idToDo: idToDo }));
  };

  const handleSetEditToDo = (idToDo: string): void => {
    dispatch(setEditToDo(idToDo));
  };

  const handleGoToImportantToDo = (idCategory: string, toDo: ToDo): void => {
    dispatch(goToImportantToDo({ idCategory: idCategory, toDo: toDo }));
  };

  return {
    toDosState: toDosState,
    handleNewCategoryToDo: handleNewCategoryToDo,
    handleResetIdToDoToEdit: handleResetIdToDoToEdit,
    handleAddToDo: handleAddToDo,
    handleEditToDo: handleEditToDo,
    handleSetViewIdCategory: handleSetViewIdCategory,
    handleDoneToDo: handleDoneToDo,
    handleRemoveToDo: handleRemoveToDo,
    handleSetEditToDo: handleSetEditToDo,
    handleGoToImportantToDo: handleGoToImportantToDo,
  };
};
