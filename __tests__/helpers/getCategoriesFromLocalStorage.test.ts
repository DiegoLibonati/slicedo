import type { ToDoCategory } from "@/types/app";

import { getCategoriesFromLocalStorage } from "@/helpers/getCategoriesFromLocalStorage";

import { LOCAL_STORAGE_KEY_CATEGORIES } from "@/constants/vars";

describe("getCategoriesFromLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("should return categories stored in localStorage", () => {
    const categories: ToDoCategory[] = [{ id: "cat-1", category: "Work", icon: "💼", toDos: [] }];
    localStorage.setItem(LOCAL_STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
    expect(getCategoriesFromLocalStorage()).toEqual(categories);
  });

  it("should return an empty array when localStorage has no categories", () => {
    expect(getCategoriesFromLocalStorage()).toEqual([]);
  });
});
