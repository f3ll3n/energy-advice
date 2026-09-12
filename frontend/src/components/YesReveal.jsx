import { useEffect } from "react";
import { motion } from "framer-motion";

export default function YesReveal({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1600);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: "clamp(64px, 18vw, 160px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          margin: 0,
          background: "linear-gradient(180deg, #ffffff, #9fd8ff)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Да
      </motion.h1>
    </motion.div>
  );
}
