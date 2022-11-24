import * as F from "./object";

describe("Object Functions", () => {
  describe("isObject", () => {
    it("should test when target is object like", () => {
      expect(F.isObject({})).toBe(true);
      expect(F.isObject("{}")).toBe(false);
      expect(F.isObject([])).toBe(false);
      expect(F.isObject(() => void 0)).toBe(false);
      expect(F.isObject(null)).toBe(false);
    });
  });

  describe("forEachProperty", () => {
    it("should run the given callback for the each key of the object", () => {
      const target = { foo: "FOO", bar: "BAR" };

      const callback = jest.fn();
      F.forEachProperty(target, callback);

      expect(callback).toHaveBeenLastCalledWith("bar", "BAR", 1, target);
    });
  });

  describe("omitBy", () => {
    it("should make the copy of target without keys based on predicate functions", () => {
      const target = { foo: "FOO", bar: "BAR" };

      const result = F.omitBy(target, (key) => {
        return key !== "bar";
      });

      expect(result).toHaveProperty("foo");
      expect(result).not.toHaveProperty("bar");
    });
  });

  describe("pick", () => {
    it("should make the copy of target with picked keys", () => {
      const target = { foo: "FOO", bar: "BAR" };

      const result = F.pick(target, ["bar"]);

      expect(result).not.toHaveProperty("foo");
      expect(result).toHaveProperty("bar");
    });
  });
});
