import { Alert, ToDoCategory } from "@/types/app";

export type ToDosState = {
  categories: ToDoCategory[];
  loading: boolean;
  viewIdCategory: string;
  idToDoToEdit: string;
};

export type GlobalState = {
  alert: Alert;
  modal: {
    modalAddCategory: boolean;
    modalManageToDo: boolean;
  };
  sidebar: {
    sidebarMobile: boolean;
  };
};
