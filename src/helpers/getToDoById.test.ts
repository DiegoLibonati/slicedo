import { getToDoById } from "@src/helpers/getToDoById";

import defaultCategories from "@src/constants/defaultCategories";

describe("getToDoById.ts", () => {
  describe("General Tests.", () => {
    test("It should return a toDo by id.", () => {
      const categories = defaultCategories;
      const category = categories[0];
      const toDos = category.toDos;
      const toDo = toDos[0];

      const toDoById = getToDoById(toDos, toDo.id);

      expect(toDoById).toEqual(toDo);
    });

    test("It should not return a toDo if it is not found.", () => {
      const categories = defaultCategories;
      const category = categories[0];
      const toDos = category.toDos;
      const idNotFound = "asdasdas";

      const toDoById = getToDoById(toDos, idNotFound);

      expect(toDoById).toBeUndefined();
    });
  });
});
