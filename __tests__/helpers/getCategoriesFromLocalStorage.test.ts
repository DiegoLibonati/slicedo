import type { ToDoCategory } from "@/types/app";

import { getCategoriesFromLocalStorage } from "@/helpers/getCategoriesFromLocalStorage";

describe("getCategoriesFromLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return an empty array when the categories key does not exist", () => {
    expect(getCategoriesFromLocalStorage()).toEqual([]);
  });

  it("should return the stored categories when they exist", () => {
    const categories: ToDoCategory[] = [{ id: "1", category: "Work", toDos: [], icon: "💼" }];
    localStorage.setItem("categories", JSON.stringify(categories));
    expect(getCategoriesFromLocalStorage()).toEqual(categories);
  });

  it("should return an empty array when the stored value is null", () => {
    localStorage.setItem("categories", JSON.stringify(null));
    expect(getCategoriesFromLocalStorage()).toEqual([]);
  });
});
