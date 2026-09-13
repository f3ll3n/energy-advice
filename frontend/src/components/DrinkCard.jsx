import { motion } from "framer-motion";

export default function DrinkCard({ drink, index, checked, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.035, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="glass"
      style={{
        position: "relative",
        borderRadius: 22,
        padding: 16,
        textAlign: "left",
        cursor: "pointer",
        border: checked
          ? "1px solid rgba(90, 200, 250, 0.65)"
          : "1px solid var(--glass-border)",
        boxShadow: checked
          ? "0 0 0 3px rgba(90, 200, 250, 0.25), 0 20px 60px rgba(0,0,0,0.45)"
          : undefined,
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 24,
          height: 24,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: checked ? "var(--accent)" : "rgba(255,255,255,0.12)",
          border: checked ? "none" : "1px solid rgba(255,255,255,0.3)",
          transition: "background 0.2s ease",
        }}
      >
        {checked && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12.5L9.5 18L20 6"
              stroke="#04141d"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <div
        style={{
          width: "100%",
          aspectRatio: "3 / 4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}
      >
        <img
          src={drink.image}
          alt={drink.name}
          style={{
            width: "92%",
            height: "92%",
            objectFit: "contain",
            borderRadius: 10,
            filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.4))",
          }}
        />
      </div>

      <div style={{ fontWeight: 700, fontSize: 15.5 }}>{drink.name}</div>
      <div style={{ fontSize: 13, color: "var(--text-1)", lineHeight: 1.4 }}>
        {drink.description}
      </div>
    </motion.button>
  );
}
