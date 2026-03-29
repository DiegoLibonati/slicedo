import { ToDo } from "@/types/app";

export const getToDoById = (toDos: ToDo[], idToDo: string): ToDo => {
  const todo = toDos.find((toDo) => toDo.id === idToDo);

  return todo!;
};
