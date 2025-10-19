import { ToDoCategory } from "@src/entities/app";

export const getCategoryById = (
  categories: ToDoCategory[],
  idCategory: string
): ToDoCategory => {
  const category = categories.find((cat) => cat.id === idCategory);

  return category!;
};
