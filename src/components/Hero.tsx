import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/language";

const slides = [
  { src: "/2.jpg", position: "50% 50%" },
  { src: "/3.jpg", position: "56% 48%" },
  { src: "/4.jpg", position: "44% 44%" },
] as const;

const SLIDE_DURATION_MS = 20000;
const cinematicEase = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { content } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const titleWords1 = content.hero.titleLine1.split(" ");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    for (const slide of slides) {
      const image = new window.Image();
      image.src = slide.src;
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex]);

  const activeSlide = slides[activeIndex];

  return (
    <section id="inicio" className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black" />

      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={activeSlide.src}
            src={activeSlide.src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: activeSlide.position }}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.08, filter: "brightness(0.92) saturate(1.02)" }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1.02, filter: "brightness(1) saturate(1)" }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1, filter: "brightness(0.88) saturate(0.98)" }
            }
            transition={{ duration: shouldReduceMotion ? 0.35 : 1.6, ease: cinematicEase }}
          />
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-black/38" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,12,18,0.22) 0%, rgba(8,12,18,0.08) 24%, rgba(8,12,18,0.12) 62%, rgba(8,12,18,0.34) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pb-40 pt-28 md:px-10 md:pb-44">
        <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center rounded-full px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-md"
            style={{
              border: "1px solid rgba(231, 146, 30, 0.72)",
              backgroundColor: "rgba(9, 14, 22, 0.52)",
              textShadow: "0 1px 2px rgba(0,0,0,0.35)",
            }}
          >
            {content.hero.eyebrow}
          </motion.div>

          <h1
            className="mt-7 max-w-[920px] font-display font-bold leading-[0.96] tracking-[-0.045em] text-white"
            style={{
              fontSize: "clamp(3.5rem, 6vw, 5.85rem)",
              textShadow: "0 1px 2px rgba(11, 18, 31, 0.16)",
            }}
          >
            <span className="block">
              {titleWords1.map((word, index) => (
                <motion.span
                  key={word + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.06, duration: 0.5 }}
                  className="mr-[0.22em] inline-block"
                >
                  {word}
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
                {content.hero.titleHighlight}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="inline-block text-white"
              >
                {content.hero.titleLine2}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-7 max-w-[700px] text-[17px] leading-[1.8] text-white/78 md:text-[18px]"
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href="#servicios"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3.5 text-[15px] font-semibold text-white shadow-amber-glow"
            >
              {content.hero.ctaServices}
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
              {content.hero.ctaContact}
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-[7.5rem] left-1/2 z-10 -translate-x-1/2 text-center text-white/60"
      >
        <div className="text-[11px] font-medium uppercase tracking-[0.28em]">
          {content.hero.scroll}
        </div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-2 flex justify-center"
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
