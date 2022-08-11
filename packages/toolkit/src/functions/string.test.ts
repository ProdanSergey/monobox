import * as F from "./string";

describe("String Functions", () => {
  describe("capitalize", () => {
    it("should make first letter capital for each word in the string", () => {
      expect(F.capitalize("hello world")).toBe("Hello World");
      expect(F.capitalize("hELLO")).toBe("HELLO");
    });
  });
});
