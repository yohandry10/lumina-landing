import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { SERVICE_SLUGS } from "@/lib/serviceData";

const heroMedia = [
  { src: "/diseño-civil.mp4", position: "50% 50%", serviceId: "civilHydraulic", title: "service" },
  {
    src: "/copia3.mp4",
    position: "44% 44%",
    serviceId: "geotechnics",
    title: "bullet-start",
    bulletIndex: 2,
    stopAt: [" por ", " using "],
  },
  { src: "/copia5.mp4", position: "50% 50%", serviceId: "generalWorks", title: "service" },
  {
    src: "/copia6.mp4",
    position: "50% 50%",
    serviceId: "generalWorks",
    title: "bullet",
    bulletIndex: 2,
  },
] as const;

const SLIDE_DURATION_MS = 10000;
const cinematicEase = [0.22, 1, 0.36, 1] as const;

function splitTitle(title: string) {
  const words = title.trim().split(/\s+/);
  const highlight = words.pop() ?? title;

  return {
    prefixWords: words,
    highlight,
  };
}

function getSlideTitle(
  service: { title: string; bullets: string[] } | undefined,
  media: (typeof heroMedia)[number],
) {
  if (!service) return "";

  if (media.title === "bullet" || media.title === "bullet-start") {
    const bullet = service.bullets[media.bulletIndex] ?? service.title;

    if (media.title === "bullet-start") {
      const stopAt = media.stopAt.find((marker) => bullet.includes(marker));
      return stopAt ? bullet.slice(0, bullet.indexOf(stopAt)) : bullet;
    }

    return bullet;
  }

  return service.title;
}

export function Hero() {
  const { content } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const activeMedia = heroMedia[activeIndex % heroMedia.length];
  const activeServiceHref = `/servicios/${SERVICE_SLUGS[activeMedia.serviceId]}`;
  const slide = useMemo(() => {
    const service = content.services.items.find((item) => item.id === activeMedia.serviceId);

    return {
      title: getSlideTitle(service, activeMedia),
      desc: service?.desc ?? "",
    };
  }, [activeMedia, content]);
  const { prefixWords, highlight } = splitTitle(slide.title);

  const goToSlide = useCallback((nextIndex: number) => {
    setActiveIndex((nextIndex + heroMedia.length) % heroMedia.length);
  }, []);

  const stepSlide = useCallback((direction: number) => {
    setActiveIndex((current) => (current + direction + heroMedia.length) % heroMedia.length);
  }, []);

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = touchEndX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 48) return;

    stepSlide(deltaX > 0 ? -1 : 1);
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % heroMedia.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex]);

  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full overflow-hidden"
      style={{ touchAction: "pan-y" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 bg-black" />

      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.video
            key={activeMedia.src}
            src={activeMedia.src}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: activeMedia.position }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
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

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 pb-24 pt-24 sm:px-6 md:px-10 md:pb-44 md:pt-28">
        <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          <h1
            className="max-w-[920px] font-display font-bold leading-[1.05] tracking-[-0.045em] text-white"
            style={{
              fontSize: "clamp(3.5rem, 6vw, 5.85rem)",
              textShadow: "0 1px 2px rgba(11, 18, 31, 0.16)",
            }}
          >
            <span className="block">
              {prefixWords.map((word, index) => (
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
            <span className="mt-1 block overflow-visible">
              <AnimatePresence mode="wait">
                <motion.span
                  key={highlight}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: cinematicEase }}
                  className="mr-[0.2em] inline-block text-amber"
                  style={{ textShadow: "none" }}
                >
                  {highlight}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <div className="mt-7 max-w-[700px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={slide.desc}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: cinematicEase }}
                className="text-[17px] leading-[1.8] text-white/78 md:text-[18px]"
              >
                {slide.desc}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.45 }}
            className="mt-6 flex items-center justify-center gap-3 md:hidden"
            aria-label={content.hero.serviceControls}
          >
            <button
              type="button"
              onClick={() => stepSlide(-1)}
              aria-label={content.hero.previousService}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition-colors active:bg-white/15"
            >
              <ChevronLeft size={18} strokeWidth={2.2} />
            </button>

            <div className="flex items-center justify-center gap-1">
              {heroMedia.map((media, index) => {
                const isActive = index === activeIndex;
                const service = content.services.items.find((item) => item.id === media.serviceId);

                return (
                  <button
                    key={`${media.src}-${index}`}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`${content.hero.goToService}: ${service?.title ?? index + 1}`}
                    aria-current={isActive ? "true" : undefined}
                    className="flex h-9 w-8 items-center justify-center"
                  >
                    <span
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        isActive ? "w-6 bg-amber" : "w-2.5 bg-white/45"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => stepSlide(1)}
              aria-label={content.hero.nextService}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition-colors active:bg-white/15"
            >
              <ChevronRight size={18} strokeWidth={2.2} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href={activeServiceHref}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3.5 text-[15px] font-semibold text-white shadow-amber-glow"
            >
              {content.hero.ctaServices}
              <ArrowRight size={16} />
            </motion.a>

            <motion.a
              href="/#contacto"
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
        className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 text-center text-white/60 md:bottom-[7.5rem]"
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
