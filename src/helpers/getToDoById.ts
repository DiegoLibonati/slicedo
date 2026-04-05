import type { ToDo } from "@/types/app";

export const getToDoById = (toDos: ToDo[], idToDo: string): ToDo | undefined => {
  const todo = toDos.find((toDo) => toDo.id === idToDo);

  return todo;
};
