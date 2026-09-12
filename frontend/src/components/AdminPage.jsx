import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { adminLogin, fetchResponses } from "../api.js";

const TOKEN_KEY = "energy-advice-admin-token";
const TIMING_LABELS = {
  asap: "Как можно скорее",
  today: "Сегодня",
  tomorrow: "Завтра",
  "this-week": "На этой неделе",
  "no-rush": "Как получится",
};

export default function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState(null);

  const load = async (t) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchResponses(t);
      setResponses(data.responses || []);
    } catch (err) {
      setError(err.message);
      if (String(err.message).toLowerCase().includes("401") || err.message.includes("токен")) {
        setToken("");
        sessionStorage.removeItem(TOKEN_KEY);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) load(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token: newToken } = await adminLogin(password);
      sessionStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
      await load(newToken);
    } catch (err) {
      setError(err.message || "Неверный пароль");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setResponses(null);
  };

  return (
    <div
      className="app-shell"
      style={{ alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      {!token && (
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong"
          style={{ borderRadius: 24, padding: 28, width: "min(360px, 100%)" }}
        >
          <h2 style={{ margin: "0 0 16px", fontSize: 20 }}>Админ-панель</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 14,
              border: "1px solid var(--glass-border)",
              background: "rgba(255,255,255,0.06)",
              color: "inherit",
              fontSize: 15,
              marginBottom: 14,
            }}
          />
          {error && (
            <p style={{ color: "#ff8a8a", fontSize: 13, margin: "0 0 12px" }}>{error}</p>
          )}
          <button className="pill-button primary" type="submit" disabled={loading} style={{ width: "100%" }}>
            {loading ? "Входим…" : "Войти"}
          </button>
        </motion.form>
      )}

      {token && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: "min(900px, 100%)" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 18,
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 22 }}>Ответы ({responses?.length ?? 0})</h2>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="pill-button" onClick={() => load(token)}>
                Обновить
              </button>
              <button className="pill-button" onClick={handleLogout}>
                Выйти
              </button>
            </div>
          </div>

          {error && <p style={{ color: "#ff8a8a" }}>{error}</p>}
          {loading && <p style={{ color: "var(--text-1)" }}>Загрузка…</p>}

          {!loading && responses?.length === 0 && (
            <p style={{ color: "var(--text-1)" }}>Пока никто не ответил.</p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {responses?.map((r) => (
              <div key={r._id} className="glass" style={{ borderRadius: 18, padding: 18 }}>
                <div style={{ fontSize: 12.5, color: "var(--text-2)", marginBottom: 6 }}>
                  {new Date(r.createdAt).toLocaleString("ru-RU")}
                </div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>
                  {r.drinks?.map((d) => d.name).join(", ")}
                </div>
                <div style={{ fontSize: 14, color: "var(--text-1)" }}>
                  Когда: {TIMING_LABELS[r.timing] || r.timing}
                </div>
                {r.note && (
                  <div style={{ fontSize: 13.5, color: "var(--text-1)", marginTop: 6, fontStyle: "italic" }}>
                    «{r.note}»
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
