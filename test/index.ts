import { describe, it, expect } from "vitest";
import { validate } from "../src";

describe("UsernameValidator", () => {
  it("should normalize the username", () => {
    const result = validate("  U-ser_Na⚡️me!  ");
    expect(result.normalized).toBe("username");
  });

  it("should trim the username", () => {
    const result = validate("  username  ");
    expect(result.username).toBe("username");
  });

  it("should convert the username to lowercase", () => {
    const result = validate("UserName", { lowercase: true });
    expect(result.username).toBe("username");
  });

  it("should convert the username to uppercase", () => {
    const result = validate("UserName", { uppercase: true });
    expect(result.username).toBe("USERNAME");
  });

  it("should fail because the username is too short", () => {
    const result = validate("meh");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual({ code: "minLength", message: "Username must be at least 6 characters long." });
  });

  it("should fail because the username is too long", () => {
    const result = validate("john_doe-12345678901234567890");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual({ code: "maxLength", message: "Username must be at most 20 characters long." });
  });

  it("should fail because the username contains invalid characters", () => {
    const result = validate("meh@regarding");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual({ code: "invalid", message: "Username contains invalid characters." });
  });

  it("should fail because the username contains a blacklisted word", () => {
    const result = validate("administrator");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual({ code: "blacklist", message: "Username contains a blacklisted word." });
  });

  it("should pass with a valid username", () => {
    const result = validate("john_doe-123");
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });
});
