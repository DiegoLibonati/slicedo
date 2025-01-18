import { getCategoryById } from "./getCategoryById";

import { defaultCategories } from "../constants/config";

describe("getCategoryById.ts", () => {
  describe("General Tests.", () => {
    test("It should return a category by id.", () => {
      const categories = defaultCategories;
      const category = categories[0];

      const categoryById = getCategoryById(categories, category.id);

      expect(categoryById).toEqual(category);
    });

    test("It should not return a category if it is not found.", () => {
      const categories = defaultCategories;
      const idNotFound = "asdasdas";

      const categoryById = getCategoryById(categories, idNotFound);

      expect(categoryById).toBeUndefined();
    });
  });
});
