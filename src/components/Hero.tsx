import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { SERVICE_SLUGS, type ServiceId } from "@/lib/serviceData";

type HeroMedia = {
  src: string;
  position: string;
  serviceId: ServiceId;
  title: "service" | "bullet" | "bullet-start";
  bulletIndex?: number;
  stopAt?: string[];
};

const heroMedia: HeroMedia[] = [
  {
    src: "/diseño-civil.mp4",
    position: "50% 50%",
    serviceId: "civilHydraulic",
    title: "service",
  },
  {
    src: "/hidrauligco.png",
    position: "50% 50%",
    serviceId: "hydrologicalStudies",
    title: "service",
  },
  {
    src: "/copia3.mp4",
    position: "44% 44%",
    serviceId: "geotechnics",
    title: "bullet-start",
    bulletIndex: 2,
    stopAt: [" por ", " using "],
  },
  {
    src: "/copia5.mp4",
    position: "50% 50%",
    serviceId: "generalWorks",
    title: "service",
  },
  {
    src: "/hidrologico.jpg",
    position: "50% 50%",
    serviceId: "hydrogeologicalStudies",
    title: "service",
  },
  {
    src: "/geografica.jpg",
    position: "50% 50%",
    serviceId: "geographicEngineering",
    title: "service",
  },
  {
    src: "/ingeneria-ambental.jpg",
    position: "50% 50%",
    serviceId: "environmentalEngineering",
    title: "service",
  },
];

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
  media: HeroMedia,
) {
  if (!service) return "";

  if (media.title === "bullet" || media.title === "bullet-start") {
    const bullet = service.bullets[media.bulletIndex ?? 0] ?? service.title;

    if (media.title === "bullet-start") {
      const stopAt = media.stopAt?.find((marker) => bullet.includes(marker));
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
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const activeMedia = heroMedia[activeIndex % heroMedia.length];
  const activeService = content.services.items.find((item) => item.id === activeMedia.serviceId);
  const activeServiceHref = `/servicios/${SERVICE_SLUGS[activeMedia.serviceId]}`;
  const slide = useMemo(() => {
    return {
      title: getSlideTitle(activeService, activeMedia),
      desc: activeService?.desc ?? "",
    };
  }, [activeMedia, activeService]);
  const { prefixWords, highlight } = splitTitle(slide.title);

  const goToService = useCallback((serviceId: ServiceId) => {
    const nextIndex = heroMedia.findIndex((media) => media.serviceId === serviceId);
    if (nextIndex === -1) return;

    setActiveIndex(nextIndex);
    setServiceMenuOpen(false);
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
    setServiceMenuOpen(false);

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
          {activeMedia.src.endsWith(".mp4") ? (
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
          ) : (
            <motion.img
              key={activeMedia.src}
              src={activeMedia.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: activeMedia.position }}
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
          )}
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

          <div
            className="relative mt-6 flex w-full justify-center md:hidden"
            onTouchStart={(event) => event.stopPropagation()}
            onTouchEnd={(event) => event.stopPropagation()}
          >
            <AnimatePresence>
              {serviceMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-full mb-3 w-[min(320px,calc(100vw-48px))] overflow-hidden rounded-[18px] border border-white/20 bg-black/62 p-1.5 text-left shadow-2xl backdrop-blur-xl"
                >
                  {content.services.items.map((service) => {
                    const isActive = service.id === activeMedia.serviceId;

                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => goToService(service.id as ServiceId)}
                        className={`flex w-full items-center rounded-[14px] px-4 py-3 text-left text-[13.5px] font-semibold transition-colors ${
                          isActive ? "bg-amber text-white" : "text-white/82 active:bg-white/12"
                        }`}
                      >
                        {service.title}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => setServiceMenuOpen((open) => !open)}
              className="max-w-[min(320px,calc(100vw-48px))] rounded-full border border-white/28 bg-black/24 px-5 py-2.5 text-[13px] font-semibold text-white/90 backdrop-blur-md transition-colors active:bg-white/12"
            >
              {activeService?.title ?? content.nav.services}
            </button>
          </div>

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
