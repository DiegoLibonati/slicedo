import { setLocalStorage } from "@/helpers/setLocalStorage";

describe("setLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("should store the JSON-stringified value at the given key", () => {
    const data = [{ id: "1", content: "test task" }];
    setLocalStorage("my-key", data);
    expect(localStorage.getItem("my-key")).toBe(JSON.stringify(data));
  });
});
