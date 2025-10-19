export type Alert = {
  message: string;
  type: string;
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
