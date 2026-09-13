import { connectDB } from "../lib/db.js";
import Response from "../lib/models/Response.js";
import { json } from "../lib/http.js";

const ALLOWED_TIMINGS = new Set(["asap", "today", "tomorrow", "this-week", "no-rush"]);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Некорректный JSON" }, 400);
  }

  const { drinks, timing, note } = body || {};

  if (!Array.isArray(drinks) || drinks.length === 0) {
    return json({ error: "Нужно выбрать хотя бы один энергетик" }, 400);
  }
  if (!drinks.every((d) => d && typeof d.id === "string" && typeof d.name === "string")) {
    return json({ error: "Некорректный формат энергетиков" }, 400);
  }
  if (!ALLOWED_TIMINGS.has(timing)) {
    return json({ error: "Некорректное значение timing" }, 400);
  }

  try {
    await connectDB();
    const doc = await Response.create({
      drinks: drinks.map((d) => ({ id: d.id, name: d.name })),
      timing,
      note: typeof note === "string" ? note.slice(0, 500) : "",
    });

    return json({ ok: true, id: doc._id.toString() }, 201);
  } catch (err) {
    console.error("Ошибка сохранения ответа:", err);
    return json({ error: "Не удалось сохранить ответ" }, 500);
  }
}
