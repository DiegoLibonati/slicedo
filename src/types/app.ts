export interface Alert {
  message: string;
  type: string;
}

export interface ToDo {
  id: string;
  content: string;
  done: boolean;
}

export interface ToDoCategory {
  id: string;
  category: string;
  toDos: ToDo[];
  icon: string;
}
