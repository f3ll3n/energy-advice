import { motion } from "framer-motion";

export default function ThankYou() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 24,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong"
        style={{
          borderRadius: 28,
          padding: "36px 32px",
          textAlign: "center",
          maxWidth: 420,
        }}
      >
        <div style={{ fontSize: 44, marginBottom: 8 }}>🙏</div>
        <h2 style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 800 }}>
          Спасибо за совет!
        </h2>
        <p
          style={{
            margin: 0,
            color: "var(--text-1)",
            fontSize: 15,
            lineHeight: 1.5,
          }}
        >
          Учту твоё СЫС. СЫС. ПРИВЕТ ОТ САШИ
          <button
            className="pill-button primary"
            onClick={() =>
              (window.location.href =
                "https://ru.wikipedia.org/wiki/%D0%A1%D0%B0%D1%88%D0%B0_%D0%93%D1%80%D0%B5%D0%B9")
            }
          >
            ПРИВЕТ САШ
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
}
