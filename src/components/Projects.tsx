import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Section, SectionHeading } from "./Section";

export function Projects() {
  const { content } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  // skeleton on mount
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = 320 + 24;
      setActive(Math.round(el.scrollLeft / cardW));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (320 + 24), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <Section id="proyectos" className="!pb-16 md:!pb-24">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          overline={content.projects.overline}
          title={content.projects.title}
          subtitle={content.projects.subtitle}
        />
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label={content.projects.previousAria}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label={content.projects.nextAria}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="-mx-6 mt-12 overflow-hidden md:-mx-[calc((100vw-1200px)/2+24px)]">
        <div
          ref={trackRef}
          className="scrollbar-none flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-6 md:px-[6vw]"
          style={{ scrollSnapType: "x mandatory", cursor: "grab" }}
        >
          {content.projects.items.map((p, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="card-base group flex min-w-[320px] max-w-[360px] shrink-0 snap-start flex-col !p-0"
            >
              <div className="relative h-56 overflow-hidden rounded-t-[var(--radius-card)]">
                {!loaded ? (
                  <div className="skeleton absolute inset-0" />
                ) : (
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, oklch(0.145 0.012 260 / 0.7) 100%)",
                  }}
                />
                <span
                  className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur-md"
                  style={{
                    background: "color-mix(in oklab, var(--accent) 18%, transparent)",
                    color: "var(--accent)",
                    border: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)",
                  }}
                >
                  {p.sector}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[19px] font-bold leading-snug text-foreground">
                  {p.title}
                </h3>
                <div className="mt-3 flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  <MapPin size={13} />
                  {p.location}
                </div>
                <a
                  href="#contacto"
                  className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium transition-colors"
                  style={{ color: "var(--accent)" }}
                >
                  {content.projects.caseStudyCta}
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
          <div className="w-2 shrink-0" />
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {content.projects.items.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                trackRef.current?.scrollTo({
                  left: i * (320 + 24),
                  behavior: reduce ? "auto" : "smooth",
                });
              }}
              animate={{
                width: i === active ? 24 : 8,
                opacity: i === active ? 1 : 0.4,
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
              style={{
                background: i === active ? "var(--gradient-accent)" : "var(--muted-foreground)",
              }}
              aria-label={`${content.projects.dotAriaPrefix} ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
