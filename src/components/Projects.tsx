import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Section, SectionHeading } from "./Section";

const PROJECTS = [
  {
    title: "Diseño de relavera — Mina Sur",
    location: "Apurímac",
    sector: "Minería",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Análisis de estabilidad de presa",
    location: "Cusco",
    sector: "Geotecnia",
    img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Modelamiento hidráulico fluvial",
    location: "Apurímac",
    sector: "Hidrología",
    img: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Supervisión de obra vial",
    location: "Andahuaylas",
    sector: "Construcción",
    img: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Catastro y fotogrametría",
    location: "Abancay",
    sector: "Geográfica",
    img: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Estudio hidrogeológico",
    location: "Ayacucho",
    sector: "Hidrogeología",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
  },
];

export function Projects() {
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
          overline="Proyectos"
          title="Trabajos realizados"
          subtitle="Selección de proyectos donde nuestro equipo aportó conocimiento técnico, innovación y rigor para resolver desafíos complejos."
        />
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Anterior"
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Siguiente"
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="-mx-6 mt-12 md:-mx-[calc((100vw-1200px)/2+24px)]">
        <div
          ref={trackRef}
          className="scrollbar-none flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-6 md:px-[6vw]"
          style={{ scrollSnapType: "x mandatory", cursor: "grab" }}
        >
          {PROJECTS.map((p, i) => (
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
                  Ver caso de estudio
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
          <div className="w-2 shrink-0" />
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {PROJECTS.map((_, i) => (
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
              aria-label={`Ir al proyecto ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
