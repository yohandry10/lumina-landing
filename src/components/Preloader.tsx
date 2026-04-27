import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language";
import { Logo } from "./Logo";

const STAGE_PROGRESS = {
  survey: 0.38,
  lock: 0.76,
  out: 1,
} as const;

export function Preloader() {
  const { content } = useLanguage();
  const [stage, setStage] = useState<"survey" | "lock" | "out" | "gone">("survey");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("lock"), 1050);
    const t2 = setTimeout(() => setStage("out"), 2550);
    const t3 = setTimeout(() => setStage("gone"), 3200);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const progress = stage === "gone" ? 1 : STAGE_PROGRESS[stage];
  const statusLabel = stage === "gone" ? content.preloader.stageLabel.out : content.preloader.stageLabel[stage];

  return (
    <AnimatePresence>
      {stage !== "gone" && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, scale: 1 }}
          animate={stage === "out" ? { opacity: 0, scale: 0.985 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] overflow-hidden bg-background text-foreground"
        >
          {/* Subtle engineering grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.25] bg-[linear-gradient(rgba(31,48,75,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(31,48,75,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />

          {/* Soft architectural gradients */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(231,146,30,0.03),transparent_40%),radial-gradient(circle_at_0%_100%,rgba(31,48,75,0.03),transparent_40%)]" />

          <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
            <div className="relative w-full max-w-[560px]">
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: stage === "out" ? 0.985 : 1,
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative overflow-hidden rounded-sm border-2 border-line bg-surface px-7 py-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] sm:px-10 sm:py-10"
              >
                {/* Industrial hazard stripe at the top */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-[repeating-linear-gradient(45deg,var(--amber),var(--amber)_10px,transparent_10px,transparent_20px)]" />

                <div className="relative flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-muted-ink">
                  <span>{content.preloader.location}</span>
                  <span className="text-amber">
                    {stage === "survey"
                      ? content.preloader.topStatus.survey
                      : stage === "lock"
                        ? content.preloader.topStatus.lock
                        : content.preloader.topStatus.out}
                  </span>
                </div>

                <div className="relative mt-10 mb-4 flex justify-center">
                  <Logo className="relative h-[80px] w-[260px] sm:h-[96px] sm:w-[300px]" />
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative mt-10 text-center text-[13px] font-black uppercase tracking-[0.25em] text-navy"
                >
                  {statusLabel}
                </motion.p>

                <div className="relative mt-8 flex flex-wrap items-center justify-center gap-2">
                  {content.preloader.disciplines.map((item, index) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.08, duration: 0.4 }}
                      className="rounded-sm border border-line bg-surface-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-ink"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>

                <div className="relative mt-10 space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-muted-ink">
                    <span>{content.preloader.progressLabel}</span>
                    <span className="text-navy">{Math.round(progress * 100)}%</span>
                  </div>

                  <div className="relative h-2 overflow-hidden rounded-sm bg-surface-2 border border-line shadow-inner">
                    <motion.div
                      initial={false}
                      animate={{ scaleX: progress }}
                      transition={{ duration: 0.75, ease: "easeInOut" }}
                      style={{
                        originX: 0,
                        backgroundColor: "var(--amber)",
                        backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 8px, transparent 8px, transparent 16px)"
                      }}
                      className="h-full w-full"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {content.preloader.phases.map((label, index) => {
                      const active =
                        (stage === "survey" && index === 0) ||
                        (stage === "lock" && index <= 1) ||
                        stage === "out";

                      return (
                        <div
                          key={label}
                          className="border-l-4 px-2 py-2 text-left text-[9px] font-black uppercase tracking-[0.1em] transition-all bg-surface-2"
                          style={{
                            borderColor: active ? "var(--amber)" : "transparent",
                            color: active ? "var(--navy)" : "var(--color-muted-ink)",
                            opacity: active ? 1 : 0.5,
                          }}
                        >
                          {label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-[4px] bg-line">
            <motion.div
              initial={false}
              animate={{ scaleX: progress }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              style={{ originX: 0, backgroundColor: "var(--amber)" }}
              className="h-full w-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
