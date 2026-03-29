import type { ToDoCategory } from "@/types/app";

import { getCategoryById } from "@/helpers/getCategoryById";

const mockCategory: ToDoCategory = { id: "cat-1", category: "My Day", icon: "☀️", toDos: [] };

describe("getCategoryById", () => {
  it("should return the matching category", () => {
    expect(getCategoryById([mockCategory], "cat-1")).toEqual(mockCategory);
  });

  it("should return undefined when no category matches the id", () => {
    expect(getCategoryById([mockCategory], "cat-999")).toBeUndefined();
  });

  it("should return undefined for an empty array", () => {
    expect(getCategoryById([], "cat-1")).toBeUndefined();
  });
});
