import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DrinkCard from "./DrinkCard.jsx";
import TimingModal from "./TimingModal.jsx";
import { DRINKS } from "../data/drinks.js";

export default function CatalogScreen({ onSubmitted }) {
  const [selected, setSelected] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio
      .play()
      .catch(() => {
        /* browser may still require a gesture — user already tapped once earlier */
      });
    let vol = 0;
    const fade = setInterval(() => {
      vol = Math.min(vol + 0.05, 0.35);
      audio.volume = vol;
      if (vol >= 0.35) clearInterval(fade);
    }, 120);
    return () => clearInterval(fade);
  }, []);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%", maxWidth: 1080, padding: "48px 20px 140px" }}
    >
      <audio ref={audioRef} src="/media/track.mp3" loop />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong"
        style={{
          borderRadius: 28,
          padding: "28px 30px",
          marginBottom: 36,
        }}
      >
        <p style={{ margin: 0, fontSize: 20, lineHeight: 1.5, fontWeight: 500 }}>
          Помоги мне выбрать, очень хочу попитт но не знаю че купит , какой на
          твой взгляд саммый вкусеный?
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 18,
        }}
      >
        {DRINKS.map((drink, i) => (
          <DrinkCard
            key={drink.id}
            drink={drink}
            index={i}
            checked={selected.includes(drink.id)}
            onToggle={() => toggle(drink.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 40, x: "-50%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              left: "50%",
              bottom: 28,
              zIndex: 20,
            }}
          >
            <button
              className="pill-button primary"
              onClick={() => setModalOpen(true)}
              style={{ fontSize: 18 }}
            >
              Посоветовать ({selected.length})
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen && (
          <TimingModal
            drinks={DRINKS.filter((d) => selected.includes(d.id))}
            onClose={() => setModalOpen(false)}
            onSubmitted={onSubmitted}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
