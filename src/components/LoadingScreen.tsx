import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["Deep Clean", "Detail", "Restore"];
const DURATION = 1500;

type LoadingScreenProps = {
  onComplete: () => void;
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => onCompleteRef.current(), 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(
      () => setWordIndex((i) => (i + 1) % WORDS.length),
      600,
    );
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-bg"
      role="status"
      aria-label="Loading Aqua Valet"
    >
      <p className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-muted">
        Aqua Valet
      </p>

      <div className="flex h-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={WORDS[wordIndex]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="font-display text-4xl font-extrabold text-text-primary/80 md:text-6xl"
          >
            {WORDS[wordIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="absolute bottom-8 right-6 font-display text-2xl font-bold tabular-nums text-text-primary/70">
        {String(count).padStart(3, "0")}
      </p>

      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-stroke/50">
        <div
          className="aqua-gradient h-full origin-left shadow-[0_0_12px_rgba(127,212,232,0.6)]"
          style={{ transform: `scaleX(${count / 100})` }}
        />
      </div>
    </div>
  );
}
