import { ToDo, ToDoCategory } from "@/types/app";
import { GlobalState, ToDosState } from "@/types/states";

export type UseForm<T> = {
  formState: T;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onResetForm: () => void;
};

export type UseMatchMedia = {
  matches: boolean;
};

export type UseGlobalStore = {
  globalState: GlobalState;
  handleResetAlert: () => void;
  handleCloseModalAddCategory: () => void;
  handleDisplayAlert: (message: string, type: string) => void;
  handleCloseModalManageToDo: () => void;
  handleOpenSidebar: () => void;
  handleCloseSidebar: () => void;
  handleOpenModalAddCategory: () => void;
  handleOpenModalManageToDo: () => void;
};

export type UseToDosStore = {
  toDosState: ToDosState;
  handleNewCategoryToDo: (category: ToDoCategory) => void;
  handleResetIdToDoToEdit: () => void;
  handleAddToDo: (idCategory: string, toDo: ToDo) => void;
  handleEditToDo: (idCategory: string, toDo: ToDo) => void;
  handleSetViewIdCategory: (idCategory: string) => void;
  handleDoneToDo: (idCategory: string, idToDo: string) => void;
  handleRemoveToDo: (idCategory: string, idToDo: string) => void;
  handleSetEditToDo: (idToDo: string) => void;
  handleGoToImportantToDo: (idCategory: string, toDo: ToDo) => void;
};
