import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function IntroGate({ onVideoEnd }) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  const handleStart = async () => {
    setStarted(true);
    const video = videoRef.current;
    if (!video) return;
    try {
      video.currentTime = 0;
      await video.play();
    } catch {
      // Autoplay with sound can still be blocked on some browsers —
      // the visible controls give the user a manual fallback.
    }
  };

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        overflow: "hidden",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <video
        ref={videoRef}
        src="/media/intro.mp4"
        playsInline
        onEnded={onVideoEnd}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: started ? 1 : 0.35,
          transition: "opacity 0.6s ease",
        }}
      />

      {!started && (
        <motion.button
          className="pill-button primary"
          onClick={handleStart}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", fontSize: 18, padding: "18px 36px" }}
        >
          Нажми, чтобы посмотреть
        </motion.button>
      )}
    </motion.div>
  );
}
