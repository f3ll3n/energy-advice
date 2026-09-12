import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroGate from "./IntroGate.jsx";
import YesReveal from "./YesReveal.jsx";
import CatalogScreen from "./CatalogScreen.jsx";
import ThankYou from "./ThankYou.jsx";

// Steps: intro (tap + video) -> yes -> catalog -> done
const STEPS = {
  INTRO: "intro",
  YES: "yes",
  CATALOG: "catalog",
  DONE: "done",
};

export default function PrankFlow() {
  const [step, setStep] = useState(STEPS.INTRO);

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        {step === STEPS.INTRO && (
          <IntroGate key="intro" onVideoEnd={() => setStep(STEPS.YES)} />
        )}
        {step === STEPS.YES && (
          <YesReveal key="yes" onDone={() => setStep(STEPS.CATALOG)} />
        )}
        {step === STEPS.CATALOG && (
          <CatalogScreen key="catalog" onSubmitted={() => setStep(STEPS.DONE)} />
        )}
        {step === STEPS.DONE && <ThankYou key="done" />}
      </AnimatePresence>
    </div>
  );
}
