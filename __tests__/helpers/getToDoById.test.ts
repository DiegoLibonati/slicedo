import type { ToDo } from "@/types/app";

import { getToDoById } from "@/helpers/getToDoById";

const mockToDo: ToDo = { id: "todo-1", content: "Write tests", done: false };

describe("getToDoById", () => {
  it("should return the matching todo", () => {
    expect(getToDoById([mockToDo], "todo-1")).toEqual(mockToDo);
  });

  it("should return undefined when no todo matches the id", () => {
    expect(getToDoById([mockToDo], "todo-999")).toBeUndefined();
  });

  it("should return undefined for an empty array", () => {
    expect(getToDoById([], "todo-1")).toBeUndefined();
  });
});
