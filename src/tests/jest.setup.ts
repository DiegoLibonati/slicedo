import "@testing-library/jest-dom";

import { GlobalState, ToDosState } from "../entities/entities";

import { defaultCategories } from "../constants/config";

// Mock Local Storage

export const LOCAL_STORAGE_MOCKS = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

Object.defineProperty(global, "localStorage", {
  value: {
    getItem: LOCAL_STORAGE_MOCKS.getItem,
    setItem: LOCAL_STORAGE_MOCKS.setItem,
  },
});

// Mock Redux

export const GLOBAL_STATE_MOCK: GlobalState = {
  alert: {
    message: "",
    type: "",
  },
  modal: {
    modalAddCategory: false,
    modalManageToDo: false,
  },
  sidebar: { sidebarMobile: false },
};
export const TODOS_STATE_MOCK: ToDosState = {
  categories: defaultCategories,
  idToDoToEdit: "",
  loading: false,
  viewIdCategory: "",
};

// Mock Window

export const MOCK_MATCH_MEDIA = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

export const setMockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: matches,
      media: query,
      addEventListener: MOCK_MATCH_MEDIA.addEventListener,
      removeEventListener: MOCK_MATCH_MEDIA.removeEventListener,
    })),
  });
};
