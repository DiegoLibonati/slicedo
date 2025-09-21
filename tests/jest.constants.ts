import { GlobalState, ToDosState } from "@src/entities/entities";

import { defaultCategories } from "@src/constants/config";

// Mock Local Storage

export const mocksLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

// Mock Redux

export const mockGlobalState: GlobalState = {
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
export const mockTodosState: ToDosState = {
  categories: defaultCategories,
  idToDoToEdit: "",
  loading: false,
  viewIdCategory: "",
};

// Mock Window

export const mockMatchMedia = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

export const setMockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: matches,
      media: query,
      addEventListener: mockMatchMedia.addEventListener,
      removeEventListener: mockMatchMedia.removeEventListener,
    })),
  });
};
