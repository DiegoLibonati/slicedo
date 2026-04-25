import type { ToDo } from "@/types/app";

import { getToDoById } from "@/helpers/getToDoById";

const mockToDos: ToDo[] = [
  { id: "todo-1", content: "Buy groceries", done: false },
  { id: "todo-2", content: "Read book", done: true },
];

describe("getToDoById", () => {
  it("should return the matching todo when it exists", () => {
    expect(getToDoById(mockToDos, "todo-1")).toEqual(mockToDos[0]);
  });

  it("should return undefined when no todo matches the id", () => {
    expect(getToDoById(mockToDos, "nonexistent")).toBeUndefined();
  });

  it("should return undefined when the todos array is empty", () => {
    expect(getToDoById([], "todo-1")).toBeUndefined();
  });
});
