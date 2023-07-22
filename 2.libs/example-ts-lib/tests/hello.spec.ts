import { hello } from "../src/hello";

describe("Example TS Lib tests", () => {
  describe("hello", () => {
    test("return correct message", () => {
      expect(hello()).toEqual("Hello 👋 this is example ts lib.");
    });
  });
});
