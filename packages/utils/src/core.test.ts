import * as F from "./core";

describe("Core Functions", () => {
  describe("isUndefined", () => {
    it("should test when target is undefined", () => {
      expect(F.isUndefined(1)).toBe(false);
      expect(F.isUndefined("undefined")).toBe(false);
      expect(F.isUndefined(undefined)).toBe(true);
      expect(F.isUndefined(void 0)).toBe(true);
    });
  });
});
