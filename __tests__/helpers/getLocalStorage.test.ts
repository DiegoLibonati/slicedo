import { getLocalStorage } from "@/helpers/getLocalStorage";

describe("getLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return null when the key does not exist", () => {
    expect(getLocalStorage("nonexistent")).toBeNull();
  });

  it("should return the parsed object when an object is stored", () => {
    localStorage.setItem("testKey", JSON.stringify({ name: "test" }));
    expect(getLocalStorage("testKey")).toEqual({ name: "test" });
  });

  it("should return the parsed array when an array is stored", () => {
    localStorage.setItem("testArray", JSON.stringify([1, 2, 3]));
    expect(getLocalStorage("testArray")).toEqual([1, 2, 3]);
  });

  it("should return the parsed string when a string is stored", () => {
    localStorage.setItem("testString", JSON.stringify("hello"));
    expect(getLocalStorage("testString")).toBe("hello");
  });

  it("should return null when the stored value is an empty string", () => {
    localStorage.setItem("emptyKey", "");
    expect(getLocalStorage("emptyKey")).toBeNull();
  });
});
