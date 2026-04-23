import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const STAGE_PROGRESS = {
  survey: 0.38,
  lock: 0.76,
  out: 1,
} as const;

const STAGE_LABEL = {
  survey: "Levantando datos del frente",
  lock: "Consolidando sistema técnico",
  out: "Listo para desplegar",
} as const;

const PHASES = ["Levantamiento", "Análisis", "Despliegue"] as const;
const DISCIPLINES = ["Geotecnia", "Hidrología", "Ambiental"] as const;

export function Preloader() {
  const [stage, setStage] = useState<"survey" | "lock" | "out" | "gone">("survey");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("lock"), 1050);
    const t2 = setTimeout(() => setStage("out"), 2550);
    const t3 = setTimeout(() => setStage("gone"), 3200);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const progress = stage === "gone" ? 1 : STAGE_PROGRESS[stage];
  const statusLabel = stage === "gone" ? STAGE_LABEL.out : STAGE_LABEL[stage];

  return (
    <AnimatePresence>
      {stage !== "gone" && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, scale: 1 }}
          animate={stage === "out" ? { opacity: 0, scale: 0.985 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] overflow-hidden bg-[#09111a] text-white"
        >
          <div className="pointer-events-none absolute inset-0 preloader-grid opacity-55" />
          <div className="pointer-events-none absolute inset-0 preloader-contours opacity-40" />
          <div className="pointer-events-none absolute inset-0 grain opacity-[0.06]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(231,146,30,0.18),transparent_28%),radial-gradient(circle_at_50%_52%,rgba(24,48,75,0.52),transparent_54%)]" />

          <motion.div
            className="pointer-events-none absolute inset-y-0 left-[-20%] w-[36%] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl"
            animate={{ x: ["0%", "320%"] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="pointer-events-none absolute inset-x-[10%] top-1/2 h-px bg-gradient-to-r from-transparent via-amber/55 to-transparent"
            animate={{ opacity: [0.24, 0.82, 0.24], scaleX: [0.92, 1, 0.92] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
            <div className="relative w-full max-w-[560px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: stage === "out" ? 1.04 : 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="pointer-events-none absolute -inset-14 rounded-full bg-[radial-gradient(circle,rgba(231,146,30,0.22),transparent_62%)] blur-3xl"
              />

              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: stage === "out" ? 0.985 : 1,
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] px-7 py-8 shadow-[0_30px_80px_-34px_rgba(0,0,0,0.82)] backdrop-blur-xl sm:px-10 sm:py-10"
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_42%,rgba(231,146,30,0.06)_100%)]" />
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                <div className="relative flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/38">
                  <span>Abancay, Perú</span>
                  <span>
                    {stage === "survey" ? "Site Scan" : stage === "lock" ? "Data Lock" : "Ready"}
                  </span>
                </div>

                <div className="relative mt-8 flex justify-center">
                  <div className="relative overflow-hidden rounded-[26px] border border-white/8 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.09),rgba(255,255,255,0.02)_62%,transparent_100%)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <div className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(231,146,30,0.24),transparent_62%)] opacity-80 blur-2xl" />
                    <Logo
                      className="relative h-[96px] w-[290px] sm:h-[112px] sm:w-[340px]"
                      imageClassName="h-[226%] w-[226%] [filter:brightness(1.42)_contrast(1.04)_saturate(1.08)_drop-shadow(0_0_28px_rgba(231,146,30,0.22))]"
                    />
                  </div>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative mt-7 text-center text-[12px] font-medium uppercase tracking-[0.34em] text-white/48"
                >
                  {statusLabel}
                </motion.p>

                <div className="relative mt-6 flex flex-wrap items-center justify-center gap-2">
                  {DISCIPLINES.map((item, index) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.08, duration: 0.4 }}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white/65"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>

                <div className="relative mt-7 space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.28em] text-white/34">
                    <span>Preparando sistema</span>
                    <span>{Math.round(progress * 100)}%</span>
                  </div>

                  <div className="relative h-[3px] overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={false}
                      animate={{ scaleX: progress }}
                      transition={{ duration: 0.75, ease: "easeInOut" }}
                      style={{
                        originX: 0,
                        background: "linear-gradient(90deg, #e7921e 0%, #f4ad37 100%)",
                      }}
                      className="h-full w-full"
                    />
                    <motion.div
                      className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[2px]"
                      animate={{ x: ["-30%", "450%"] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {PHASES.map((label, index) => {
                      const active =
                        (stage === "survey" && index === 0) ||
                        (stage === "lock" && index <= 1) ||
                        stage === "out";

                      return (
                        <div
                          key={label}
                          className="rounded-full border px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors"
                          style={{
                            borderColor: active ? "rgba(231,146,30,0.4)" : "rgba(255,255,255,0.08)",
                            backgroundColor: active
                              ? "rgba(231,146,30,0.08)"
                              : "rgba(255,255,255,0.02)",
                            color: active ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.3)",
                          }}
                        >
                          {label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -4, 0], opacity: [0.65, 1, 0.65] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -left-4 top-14 hidden rounded-full border border-amber/30 bg-amber/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber/80 sm:block"
              >
                Frente 01
              </motion.div>

              <motion.div
                animate={{ y: [0, 4, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -right-4 bottom-16 hidden rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55 sm:block"
              >
                Sistema listo
              </motion.div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
            <motion.div
              initial={false}
              animate={{ scaleX: progress }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              style={{ originX: 0, background: "linear-gradient(90deg, #e7921e 0%, #f4ad37 100%)" }}
              className="h-full w-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
