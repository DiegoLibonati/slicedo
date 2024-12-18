import { getCategoriesFromLocalStorage } from "./getCategoriesFromLocalStorage";

import { LOCAL_STORAGE_KEY_CATEGORIES } from "../constants/config";

import { LOCAL_STORAGE_MOCKS } from "../tests/jest.setup";

test("The getItem of localStorage must be called with key of categories.", () => {
  getCategoriesFromLocalStorage();

  expect(LOCAL_STORAGE_MOCKS.getItem).toHaveBeenCalledTimes(1);
  expect(LOCAL_STORAGE_MOCKS.getItem).toHaveBeenCalledWith(
    LOCAL_STORAGE_KEY_CATEGORIES
  );
});
