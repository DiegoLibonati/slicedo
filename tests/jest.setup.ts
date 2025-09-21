import "@testing-library/jest-dom";

import { mocksLocalStorage } from "@tests/jest.constants";

// Mock Local Storage

Object.defineProperty(global, "localStorage", {
  value: {
    getItem: mocksLocalStorage.getItem,
    setItem: mocksLocalStorage.setItem,
  },
});
