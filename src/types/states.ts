import type { Alert, ToDoCategory } from "@/types/app";

export interface ToDosState {
  categories: ToDoCategory[];
  loading: boolean;
  viewIdCategory: string;
  idToDoToEdit: string;
}

export interface GlobalState {
  alert: Alert;
  modal: {
    modalAddCategory: boolean;
    modalManageToDo: boolean;
  };
  sidebar: {
    sidebarMobile: boolean;
  };
}
