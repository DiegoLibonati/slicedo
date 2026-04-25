import { setLocalStorage } from "@/helpers/setLocalStorage";

describe("setLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should store an object as a JSON string", () => {
    setLocalStorage("testKey", { name: "test" });
    expect(localStorage.getItem("testKey")).toBe(JSON.stringify({ name: "test" }));
  });

  it("should store an array as a JSON string", () => {
    setLocalStorage("testArray", [1, 2, 3]);
    expect(localStorage.getItem("testArray")).toBe(JSON.stringify([1, 2, 3]));
  });

  it("should store a string value serialized as JSON", () => {
    setLocalStorage("testString", "hello");
    expect(localStorage.getItem("testString")).toBe(JSON.stringify("hello"));
  });

  it("should overwrite an existing value for the same key", () => {
    setLocalStorage("testKey", "first");
    setLocalStorage("testKey", "second");
    expect(localStorage.getItem("testKey")).toBe(JSON.stringify("second"));
  });
});
