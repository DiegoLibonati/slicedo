import { UseToDosStore } from "@/types/hooks";
import { ToDo, ToDoCategory } from "@/types/app";

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

  const handleNewCategoryToDo = (category: ToDoCategory) => {
    dispatch(newCategoryToDo(category));
  };

  const handleResetIdToDoToEdit = () => {
    dispatch(resetIdToDoToEdit());
  };

  const handleAddToDo = (idCategory: string, toDo: ToDo) => {
    dispatch(addToDo({ idCategory: idCategory, newToDo: toDo }));
  };

  const handleEditToDo = (idCategory: string, toDo: ToDo) => {
    dispatch(editToDo({ idCategory: idCategory, toDo: toDo }));
  };

  const handleSetViewIdCategory = (idCategory: string) => {
    dispatch(setViewIdCategory(idCategory));
  };

  const handleDoneToDo = (idCategory: string, idToDo: string) => {
    dispatch(doneToDo({ idCategory: idCategory, idToDo: idToDo }));
  };

  const handleRemoveToDo = (idCategory: string, idToDo: string) => {
    dispatch(removeToDo({ idCategory: idCategory, idToDo: idToDo }));
  };

  const handleSetEditToDo = (idToDo: string) => {
    dispatch(setEditToDo(idToDo));
  };

  const handleGoToImportantToDo = (idCategory: string, toDo: ToDo) => {
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
