import { store } from "@src/store/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type Alert = {
  message: string;
  type: string;
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

export type ToDo = {
  id: string;
  content: string;
  done: boolean;
};

export type ToDoCategory = {
  id: string;
  category: string;
  toDos: ToDo[];
  icon: string;
};

export type ToDosState = {
  categories: ToDoCategory[];
  loading: boolean;
  viewIdCategory: string;
  idToDoToEdit: string;
};
