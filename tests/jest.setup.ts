import "@testing-library/jest-dom";

import { mocksLocalStorage } from "./jest.constants";

// Mock Local Storage

Object.defineProperty(global, "localStorage", {
  value: {
    getItem: mocksLocalStorage.getItem,
    setItem: mocksLocalStorage.setItem,
  },
});
