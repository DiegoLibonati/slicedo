import type { ToDoCategory } from "@/types/app";

export const getCategoryById = (
  categories: ToDoCategory[],
  idCategory: string
): ToDoCategory | undefined => {
  const category = categories.find((cat) => cat.id === idCategory);

  return category;
};
