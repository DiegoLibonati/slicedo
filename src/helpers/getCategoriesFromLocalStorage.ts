import { ToDoCategory } from "../entities/entities";

import { getLocalStorage } from "./getLocalStorage";

import { LOCAL_STORAGE_KEY_CATEGORIES } from "../constants/config";

export const getCategoriesFromLocalStorage = (): ToDoCategory[] => {
  const categories = getLocalStorage<ToDoCategory[]>(
    LOCAL_STORAGE_KEY_CATEGORIES
  );

  return categories ? categories : [];
};
