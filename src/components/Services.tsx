import { useState, useEffect } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Mountain,
  Droplets,
  Compass,
  Map,
  Leaf,
  HardHat,
  Waves,
  ArrowUpRight,
  Check,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Section, SectionHeading, itemVariants } from "./Section";

const SERVICE_ICONS = {
  civilHydraulic: HardHat,
  hydrologicalStudies: Droplets,
  geotechnics: Mountain,
  generalWorks: Compass,
  hydrogeologicalStudies: Waves,
  geographicEngineering: Map,
  environmentalEngineering: Leaf,
} as const;
type ServiceId = keyof typeof SERVICE_ICONS;

const SERVICE_ANCHORS: Record<ServiceId, string> = {
  civilHydraulic: "servicio-diseno-civil-hidraulico",
  hydrologicalStudies: "servicio-estudios-hidrologicos",
  geotechnics: "servicio-geotecnia",
  generalWorks: "servicio-obras-servicios-generales",
  hydrogeologicalStudies: "servicio-estudios-hidrogeologicos",
  geographicEngineering: "servicio-ingenieria-geografica",
  environmentalEngineering: "servicio-ingenieria-ambiental",
};
const SERVICE_IDS_BY_ANCHOR = Object.fromEntries(
  Object.entries(SERVICE_ANCHORS).map(([id, anchor]) => [anchor, id]),
) as Record<string, ServiceId>;

const MIN_VISIBLE_SERVICES = 2;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function Services() {
  const { content } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const openServiceFromHash = () => {
      const anchor = window.location.hash.replace("#", "");
      const serviceId = SERVICE_IDS_BY_ANCHOR[anchor];

      if (!serviceId) return;

      setExpanded(true);
      setOpenCard(serviceId);

      window.setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    };

    openServiceFromHash();
    window.addEventListener("hashchange", openServiceFromHash);

    return () => window.removeEventListener("hashchange", openServiceFromHash);
  }, []);

  const visibleServices =
    isMobile || expanded
      ? content.services.items
      : content.services.items.slice(0, MIN_VISIBLE_SERVICES);

  return (
    <Section id="servicios">
      <SectionHeading
        overline={content.services.overline}
        title={
          <>
            {content.services.titlePrefix}
            <span className="text-gradient">{content.services.titleHighlight}</span>
            {content.services.titleSuffix}
          </>
        }
        subtitle={content.services.subtitle}
      />

      {/* ── Mobile accordion ── */}
      <div className="mt-8 flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-surface shadow-sm md:hidden">
        {visibleServices.map(({ id, title, desc, bullets }, i) => {
          const Icon = SERVICE_ICONS[id];
          const isOpen = openCard === id;
          const isLast = i === visibleServices.length - 1;

          return (
            <div
              key={id}
              id={isMobile ? SERVICE_ANCHORS[id] : undefined}
              className={!isLast ? "scroll-mt-28 border-b border-border/40" : "scroll-mt-28"}
            >
              <button
                type="button"
                onClick={() => setOpenCard(isOpen ? null : id)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-surface-2/50"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: "color-mix(in oklab, var(--accent) 10%, transparent)",
                    color: "var(--accent)",
                  }}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </div>
                <span className="flex-1 text-[14px] font-semibold leading-snug text-foreground">
                  {title}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground"
                >
                  <ChevronDown size={14} strokeWidth={2} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1">
                      <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                        {desc}
                      </p>
                      <ul className="mt-3.5 flex flex-col gap-2.5">
                        {bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2 text-[12.5px] leading-relaxed text-foreground/80"
                          >
                            <span
                              className="mt-[5px] flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full"
                              style={{
                                background: "color-mix(in oklab, var(--accent) 12%, transparent)",
                              }}
                            >
                              <Check size={8} strokeWidth={3} style={{ color: "var(--accent)" }} />
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ── Desktop cards ── */}
      <motion.div layout className="mt-16 hidden flex-col gap-6 md:flex">
        <AnimatePresence initial={false}>
          {visibleServices.map(({ id, title, desc, bullets }, i) => {
            const Icon = SERVICE_ICONS[id];

            return (
              <motion.article
                layout
                key={title}
                id={!isMobile ? SERVICE_ANCHORS[id] : undefined}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="group relative flex w-full flex-row overflow-hidden rounded-[24px] border border-border/50 bg-surface shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-border hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.08)]"
              >
                {/* Left Section: Info */}
                <div className="relative flex w-[35%] flex-col justify-between bg-surface-2/30 p-8 lg:p-10">
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at 0% 0%, color-mix(in oklab, var(--accent) 4%, transparent) 0%, transparent 70%)",
                    }}
                  />

                  <div className="relative z-10">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-110"
                      style={{
                        background: "color-mix(in oklab, var(--accent) 10%, transparent)",
                        color: "var(--accent)",
                      }}
                    >
                      <Icon className="h-[26px] w-[26px]" strokeWidth={1.5} />
                    </div>

                    <h3 className="mt-8 font-display text-[22px] font-bold leading-tight text-foreground transition-colors group-hover:text-accent">
                      {title}
                    </h3>
                    <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
                      {desc}
                    </p>
                  </div>

                  <span
                    className="absolute right-6 top-6 font-display text-[48px] font-black tracking-tighter opacity-[0.03] transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.08]"
                    style={{ color: "var(--accent)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Right Section: Bullets */}
                <div className="flex w-[65%] flex-col justify-center border-l border-border/50 p-8 lg:p-10">
                  <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3.5 text-[14px] leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/90"
                      >
                        <span
                          className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                          style={{
                            background: "color-mix(in oklab, var(--accent) 15%, transparent)",
                          }}
                        >
                          <Check size={10} strokeWidth={3} style={{ color: "var(--accent)" }} />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Left accent line */}
                <div
                  className="absolute bottom-0 left-0 h-full w-[4px] transition-all duration-500 group-hover:w-[6px]"
                  style={{ background: "var(--gradient-accent)" }}
                />
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {content.services.items.length > MIN_VISIBLE_SERVICES && (
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 hidden justify-center md:flex"
        >
          <motion.button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 rounded-full border border-border bg-surface px-6 py-3 text-[14px] font-semibold text-foreground transition-colors hover:bg-surface-2"
          >
            {expanded ? content.services.showLess : content.services.showMore}
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.24, ease: "easeInOut" }}
            >
              <ChevronDown size={16} />
            </motion.span>
          </motion.button>
        </motion.div>
      )}

      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-surface-2 p-8 sm:flex-row sm:gap-4"
      >
        <div className="flex items-center gap-4">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ background: "var(--gradient-accent)", color: "#fff" }}
          >
            <Sparkles size={18} strokeWidth={2} />
          </div>
          <div>
            <p className="font-display text-[15px] font-bold text-foreground">
              {content.services.customTitle}
            </p>
            <p className="text-[13px] text-muted-foreground">
              {content.services.customSubtitle}
            </p>
          </div>
        </div>
        <motion.a
          href="/#contacto"
          className="btn-pill btn-primary gap-2 text-[14px]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {content.services.customCta}
          <ArrowUpRight size={15} />
        </motion.a>
      </motion.div>
    </Section>
  );
}
