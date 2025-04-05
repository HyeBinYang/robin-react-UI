import { describe, it, expect } from "vitest";
import hexToRgb from "../hexToRgb";

describe("hexToTgb()", () => {
  it("hex 값이 적절한 값이 들어오지 않으면 null을 반환한다.", () => {
    expect(hexToRgb("asdasd")).toBeNull();
    expect(hexToRgb("00fffp")).toBeNull();
    expect(hexToRgb("#00fffg")).toBeNull();
    expect(hexToRgb("##ff0000")).toBeNull();
  });

  describe("hex 값이 적절한 값이 들어온 경우", () => {
    it("alpha 값이 없으면 'rgb(r,g,b)' 형태의 값을 반환한다.", () => {
      expect(hexToRgb("#ff0000")).toBe("rgb(255, 0, 0)");
    });

    it("alpha 값이 있으면 'rgba(r, g, b, a)' 형태의 값을 반환한다.", () => {
      expect(hexToRgb("#ff0000", 0.5)).toBe("rgba(255, 0, 0, 0.5)");
    });

    it("hex 값이 '#'을 생략한 경우도 정상적으로 반환한다.", () => {
      expect(hexToRgb("ff0000")).toBe("rgb(255, 0, 0)");
    });
  });
});
