import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { CountUp } from "./CountUp";

const stats = [
  { value: 200, suffix: "+", labelKey: "stats.projects" },
  { value: 15, suffix: "+", labelKey: "stats.years" },
  { value: 7, suffix: "", labelKey: "stats.specs" },
  { value: 0, suffix: "", labelKey: "stats.region", custom: "Apurímac+" },
];

export function Hero() {
  const { t } = useLanguage();
  const titleWords1 = t("hero.title.1").split(" ");

  return (
    <section id="inicio" className="relative min-h-screen w-full overflow-hidden">
      {/* LAYER 1 — photo */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80"
          alt="Sitio de construcción aéreo en los Andes"
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
      </motion.div>

      {/* LAYER 2 — gradient */}
      <div className="absolute inset-0 gradient-hero" />

      {/* LAYER 3 — noise */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] mix-blend-overlay">
        <filter id="n">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
        </filter>
        <rect width="100%" height="100%" filter="url(#n)" />
      </svg>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pb-40 pt-28 md:px-10 md:pb-44">
        <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber"
            style={{
              border: "1px solid rgba(231, 146, 30, 0.55)",
              backgroundColor: "rgba(231, 146, 30, 0.10)",
            }}
          >
            {t("hero.eyebrow")}
          </motion.div>

          <h1
            className="mt-7 max-w-[920px] font-display font-bold leading-[0.96] tracking-[-0.045em] text-white"
            style={{
              fontSize: "clamp(3.5rem, 6vw, 5.85rem)",
              textShadow: "0 1px 2px rgba(11, 18, 31, 0.16)",
            }}
          >
            <span className="block">
              {titleWords1.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
                  className="mr-[0.22em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="mt-1 block">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mr-[0.2em] inline-block text-amber"
                style={{ textShadow: "none" }}
              >
                {t("hero.title.2a")}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="inline-block text-white"
              >
                {t("hero.title.2b")}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-7 max-w-[700px] text-[17px] leading-[1.8] text-white/78 md:text-[18px]"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href="#servicios"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3.5 text-[15px] font-semibold text-white shadow-amber-glow"
            >
              {t("hero.cta.services")}
              <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex items-center rounded-full border border-white/45 px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}
            >
              {t("hero.cta.contact")}
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-[7.5rem] left-1/2 z-10 -translate-x-1/2 text-center text-white/60"
      >
        <div className="text-[11px] font-medium uppercase tracking-[0.28em]">{t("hero.scroll")}</div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-2 flex justify-center"
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* Hero stats strip */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 md:px-8">
        <div className="mx-auto max-w-5xl rounded-t-[30px] bg-white shadow-navy-soft lg:max-w-[1040px]">
          <div className="flex snap-x snap-mandatory overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex min-w-[70%] snap-start items-center justify-center border-line px-6 py-7 md:min-w-0 md:px-4 [&:not(:last-child)]:md:border-r"
              >
                <div className="text-center">
                  <div className="font-display text-[28px] font-bold text-amber">
                    {s.custom ? s.custom : <CountUp to={s.value} suffix={s.suffix} />}
                  </div>
                  <div className="mt-1 text-[13px] text-muted-ink">{t(s.labelKey)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
