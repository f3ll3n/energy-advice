import { safeEqual, signAdminToken } from "../../lib/auth.js";
import { json } from "../../lib/http.js";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const { password } = body || {};
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return json({ error: "ADMIN_PASSWORD не настроен на сервере" }, 500);
  }
  if (typeof password !== "string" || !safeEqual(password, expected)) {
    return json({ error: "Неверный пароль" }, 401);
  }

  const token = signAdminToken();
  return json({ token });
}
