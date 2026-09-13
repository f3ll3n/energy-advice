import crypto from "node:crypto";
import jwt from "jsonwebtoken";

export function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function signAdminToken() {
  return jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "12h" });
}

export function verifyAdminToken(token) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload.role === "admin";
  } catch {
    return false;
  }
}
