import { Router } from "express";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import Response from "../models/Response.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

router.post("/login", (req, res) => {
  const { password } = req.body || {};
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return res.status(500).json({ error: "ADMIN_PASSWORD не настроен на сервере" });
  }
  if (typeof password !== "string" || !safeEqual(password, expected)) {
    return res.status(401).json({ error: "Неверный пароль" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "12h" });
  res.json({ token });
});

router.get("/responses", requireAdmin, async (req, res) => {
  try {
    const responses = await Response.find().sort({ createdAt: -1 }).lean();
    res.json({ responses });
  } catch (err) {
    console.error("Ошибка получения ответов:", err);
    res.status(500).json({ error: "Не удалось получить ответы" });
  }
});

export default router;
