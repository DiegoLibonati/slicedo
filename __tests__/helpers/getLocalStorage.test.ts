import { getLocalStorage } from "@/helpers/getLocalStorage";

describe("getLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("should return the parsed value when the key exists", () => {
    const data = { id: "1", name: "test" };
    localStorage.setItem("test-key", JSON.stringify(data));
    expect(getLocalStorage("test-key")).toEqual(data);
  });

  it("should return null when the key does not exist", () => {
    expect(getLocalStorage("non-existent")).toBeNull();
  });
});
