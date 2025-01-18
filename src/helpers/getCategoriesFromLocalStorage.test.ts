import { getCategoriesFromLocalStorage } from "./getCategoriesFromLocalStorage";

import { LOCAL_STORAGE_KEY_CATEGORIES } from "../constants/config";

import { mocksLocalStorage } from "../tests/jest.constants";

describe("getCategoriesFromLocalStorage.ts", () => {
  describe("General Tests.", () => {
    test("The getItem of localStorage must be called with key of categories.", () => {
      getCategoriesFromLocalStorage();

      expect(mocksLocalStorage.getItem).toHaveBeenCalledTimes(1);
      expect(mocksLocalStorage.getItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_KEY_CATEGORIES
      );
    });
  });
});
