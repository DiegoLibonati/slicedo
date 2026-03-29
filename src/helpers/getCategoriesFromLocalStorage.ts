import type { ToDoCategory } from "@/types/app";

import { getLocalStorage } from "@/helpers/getLocalStorage";

import { LOCAL_STORAGE_KEY_CATEGORIES } from "@/constants/vars";

export const getCategoriesFromLocalStorage = (): ToDoCategory[] => {
  const categories = getLocalStorage(LOCAL_STORAGE_KEY_CATEGORIES) as ToDoCategory[] | null;

  return categories ?? [];
};
