import { ToDoCategory } from "@src/entities/entities";

import { getLocalStorage } from "@src/helpers/getLocalStorage";

import { LOCAL_STORAGE_KEY_CATEGORIES } from "@src/constants/config";

export const getCategoriesFromLocalStorage = (): ToDoCategory[] => {
  const categories = getLocalStorage<ToDoCategory[]>(
    LOCAL_STORAGE_KEY_CATEGORIES
  );

  return categories ? categories : [];
};
