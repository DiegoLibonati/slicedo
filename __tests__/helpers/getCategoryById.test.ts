import type { ToDoCategory } from "@/types/app";

import { getCategoryById } from "@/helpers/getCategoryById";

const mockCategories: ToDoCategory[] = [
  { id: "cat-1", category: "Work", toDos: [], icon: "💼" },
  { id: "cat-2", category: "Personal", toDos: [], icon: "🏠" },
];

describe("getCategoryById", () => {
  it("should return the matching category when it exists", () => {
    expect(getCategoryById(mockCategories, "cat-1")).toEqual(mockCategories[0]);
  });

  it("should return undefined when no category matches the id", () => {
    expect(getCategoryById(mockCategories, "nonexistent")).toBeUndefined();
  });

  it("should return undefined when the categories array is empty", () => {
    expect(getCategoryById([], "cat-1")).toBeUndefined();
  });
});
