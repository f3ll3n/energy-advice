import { connectDB } from "../../lib/db.js";
import Response from "../../lib/models/Response.js";
import { verifyAdminToken } from "../../lib/auth.js";
import { json } from "../../lib/http.js";

export async function GET(request) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token || !verifyAdminToken(token)) {
    return json({ error: "Токен недействителен или истёк" }, 401);
  }

  try {
    await connectDB();
    const responses = await Response.find().sort({ createdAt: -1 }).lean();
    return json({ responses });
  } catch (err) {
    console.error("Ошибка получения ответов:", err);
    return json({ error: "Не удалось получить ответы" }, 500);
  }
}
