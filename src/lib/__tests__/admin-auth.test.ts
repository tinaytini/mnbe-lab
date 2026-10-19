import { describe, it, expect, beforeEach } from "vitest";
import {
  getClientIp,
  isLoginRateLimited,
  recordFailedLogin,
  clearLoginAttempts,
  getAdminPassword,
} from "../admin-auth";
import { NextRequest } from "next/server";

describe("admin-auth utils", () => {
  const testIp = "192.168.1.100";

  beforeEach(() => {
    clearLoginAttempts(testIp);
  });

  describe("getClientIp", () => {
    it("extracts the first IP from x-forwarded-for header", () => {
      const req = new NextRequest("http://localhost:3000/api/admin", {
        headers: { "x-forwarded-for": "203.0.113.195, 70.41.3.18, 150.172.238.178" },
      });
      expect(getClientIp(req)).toBe("203.0.113.195");
    });

    it("falls back to x-real-ip when x-forwarded-for is missing", () => {
      const req = new NextRequest("http://localhost:3000/api/admin", {
        headers: { "x-real-ip": "198.51.100.1" },
      });
      expect(getClientIp(req)).toBe("198.51.100.1");
    });

    it("returns 'unknown' when neither header is present", () => {
      const req = new NextRequest("http://localhost:3000/api/admin");
      expect(getClientIp(req)).toBe("unknown");
    });
  });

  describe("rate limiting", () => {
    it("is not rate limited initially", () => {
      expect(isLoginRateLimited(testIp)).toBe(false);
    });

    it("blocks an IP after 5 failed login attempts", () => {
      for (let i = 0; i < 4; i++) {
        recordFailedLogin(testIp);
        expect(isLoginRateLimited(testIp)).toBe(false);
      }

      recordFailedLogin(testIp); // 5th attempt
      expect(isLoginRateLimited(testIp)).toBe(true);
    });

    it("clears rate limit when clearLoginAttempts is called", () => {
      for (let i = 0; i < 5; i++) {
        recordFailedLogin(testIp);
      }
      expect(isLoginRateLimited(testIp)).toBe(true);

      clearLoginAttempts(testIp);
      expect(isLoginRateLimited(testIp)).toBe(false);
    });
  });

  describe("getAdminPassword", () => {
    it("returns ADMIN_PASSWORD when set, or default dev value", () => {
      const pwd = getAdminPassword();
      expect(typeof pwd).toBe("string");
      expect(pwd?.length).toBeGreaterThan(0);
    });
  });
});
