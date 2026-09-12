import { Router } from "express";
import Response from "../models/Response.js";

const router = Router();

const ALLOWED_TIMINGS = new Set(["asap", "today", "tomorrow", "this-week", "no-rush"]);

router.post("/", async (req, res) => {
  try {
    const { drinks, timing, note } = req.body || {};

    if (!Array.isArray(drinks) || drinks.length === 0) {
      return res.status(400).json({ error: "Нужно выбрать хотя бы один энергетик" });
    }
    if (!drinks.every((d) => d && typeof d.id === "string" && typeof d.name === "string")) {
      return res.status(400).json({ error: "Некорректный формат энергетиков" });
    }
    if (!ALLOWED_TIMINGS.has(timing)) {
      return res.status(400).json({ error: "Некорректное значение timing" });
    }

    const doc = await Response.create({
      drinks: drinks.map((d) => ({ id: d.id, name: d.name })),
      timing,
      note: typeof note === "string" ? note.slice(0, 500) : "",
    });

    res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    console.error("Ошибка сохранения ответа:", err);
    res.status(500).json({ error: "Не удалось сохранить ответ" });
  }
});

export default router;
