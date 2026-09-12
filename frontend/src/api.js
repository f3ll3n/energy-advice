const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    let message = `Ошибка запроса (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export function submitAdvice({ drinks, timing, note }) {
  return request("/api/responses", {
    method: "POST",
    body: JSON.stringify({ drinks, timing, note }),
  });
}

export function adminLogin(password) {
  return request("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

export function fetchResponses(token) {
  return request("/api/admin/responses", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
