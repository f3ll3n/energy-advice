import { useState } from "react";
import { motion } from "framer-motion";
import { TIMING_OPTIONS } from "../data/drinks.js";
import { submitAdvice } from "../api.js";

export default function TimingModal({ drinks, onClose, onSubmitted }) {
  const [timing, setTiming] = useState(null);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!timing) return;
    setStatus("sending");
    setError("");
    try {
      await submitAdvice({
        drinks: drinks.map((d) => ({ id: d.id, name: d.name })),
        timing,
        note: note.trim(),
      });
      onSubmitted();
    } catch (err) {
      setStatus("error");
      setError(err.message || "Не получилось отправить, попробуй ещё раз");
    }
  };

  return (
    <>
      <motion.div
        className="scrim"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ zIndex: 30 }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong"
        style={{
          position: "fixed",
          left: "calc((100vw - 440px) / 2)",
          top: "calc((100vh - 560px) / 2)",
          transform: "translate(-50%, -50%)",
          zIndex: 31,
          width: "440px",
          maxHeight: "min(560px, calc(100vh - 40px))",
          overflowY: "auto",
          borderRadius: 26,
          padding: 26,
        }}
      >
        <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800 }}>
          Когда посоветуешь выпить?
        </h2>
        <p style={{ margin: "0 0 18px", fontSize: 14, color: "var(--text-1)" }}>
          Выбрано: {drinks.map((d) => d.name).join(", ")}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 18,
          }}
        >
          {TIMING_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setTiming(opt.id)}
              className="glass"
              style={{
                textAlign: "left",
                borderRadius: 16,
                padding: "12px 14px",
                cursor: "pointer",
                color: "inherit",
                border:
                  timing === opt.id
                    ? "1px solid rgba(90, 200, 250, 0.65)"
                    : "1px solid var(--glass-border)",
                boxShadow:
                  timing === opt.id
                    ? "0 0 0 3px rgba(90,200,250,0.22)"
                    : undefined,
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 15 }}>{opt.label}</div>
              <div style={{ fontSize: 12.5, color: "var(--text-1)" }}>
                {opt.hint}
              </div>
            </button>
          ))}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Можешь добавить комментарий (необязательно)"
          rows={2}
          style={{
            width: "100%",
            resize: "none",
            borderRadius: 14,
            border: "1px solid var(--glass-border)",
            background: "rgba(255,255,255,0.06)",
            color: "inherit",
            padding: "10px 12px",
            fontFamily: "inherit",
            fontSize: 14,
            marginBottom: 16,
          }}
        />

        {status === "error" && (
          <p
            style={{
              color: "#ff8a8a",
              fontSize: 13,
              marginTop: -8,
              marginBottom: 12,
            }}
          >
            {error}
          </p>
        )}

        <div style={{ display: "flex", gap: 10 }}>
          <button className="pill-button" onClick={onClose} style={{ flex: 1 }}>
            Отмена
          </button>
          <button
            className="pill-button primary"
            onClick={handleSubmit}
            disabled={!timing || status === "sending"}
            style={{ flex: 1 }}
          >
            {status === "sending" ? "Отправляю…" : "Отправить"}
          </button>
        </div>
      </motion.div>
    </>
  );
}
