import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const BRAND = "HANAN INGENIERÍA";

export function Preloader() {
  const [stage, setStage] = useState<"draw" | "type" | "fill" | "out" | "gone">(
    "draw",
  );

  useEffect(() => {
    const t1 = setTimeout(() => setStage("type"), 1200);
    const t2 = setTimeout(() => setStage("fill"), 2000);
    const t3 = setTimeout(() => setStage("out"), 2800);
    const t4 = setTimeout(() => setStage("gone"), 3250);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  if (stage === "gone") return null;

  return (
    <AnimatePresence>
      {stage !== "gone" && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, scale: 1 }}
          animate={
            stage === "out"
              ? { opacity: 0, scale: 0.96 }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          <div className="absolute inset-0 grain pointer-events-none" />

          {/* Logomark — drawing SVG: stylized H + peak */}
          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            className="relative"
          >
            {/* mountain peak */}
            <motion.path
              d="M8 60 L30 28 L44 46 L56 22 L72 60 Z"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
            {/* H mark */}
            <motion.path
              d="M26 40 L26 60 M54 40 L54 60 M26 50 L54 50"
              stroke="var(--accent-2)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
            />
          </motion.svg>

          {/* Typed brand */}
          <div className="mt-8 flex h-7">
            {stage !== "draw" &&
              BRAND.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.06 }}
                  className="font-display text-[22px] font-bold tracking-[0.18em] text-foreground"
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: stage === "fill" || stage === "out" ? 1 : 0.05 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ originX: 0, background: "var(--gradient-accent)" }}
              className="h-full w-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
