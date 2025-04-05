import { describe, it, expect } from "vitest";
import isValidHex from "../isValidHex";

describe("isValidHex 함수", () => {
  it("길이가 2가 아닌 값이면 false를 반환한다.", () => {
    expect(isValidHex("a")).toBe(false);
    expect(isValidHex("aaa")).toBe(false);
    expect(isValidHex("aaaaa")).toBe(false);
  });

  it("16진수가 아닌 값인 경우 false를 반환한다.", () => {
    expect(isValidHex("as")).toBe(false);
    expect(isValidHex("-9")).toBe(false);
    expect(isValidHex("fg")).toBe(false);
    expect(isValidHex("#a")).toBe(false);
  });
});
