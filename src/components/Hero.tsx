import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1800&q=80";
// civil/mining engineering scene

const HEADLINE_LINE_1 = "Ingeniería que";
const HEADLINE_LINE_2 = "transforma desafíos.";

function CountUp({ to, duration = 1.6, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      setV(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const delay = setTimeout(() => (raf = requestAnimationFrame(tick)), 3200);
    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return (
    <span>
      {v}
      {suffix}
    </span>
  );
}

const STATS = [
  { num: 12, suffix: "+", label: "Años de experiencia" },
  { num: 80, suffix: "+", label: "Proyectos entregados" },
  { num: 30, suffix: "+", label: "Clientes mineros" },
  { num: 100, suffix: "%", label: "Compromiso técnico" },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      {/* Layer 1: base image */}
      <motion.div
        initial={{ scale: reduce ? 1 : 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={HERO_IMG}
          alt="Proyecto de ingeniería minera y civil"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Layer 2: clean enterprise overlay (no animated halo) */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(115deg, oklch(0.18 0.02 250 / 0.78) 0%, oklch(0.18 0.02 250 / 0.55) 55%, oklch(0.18 0.02 250 / 0.35) 100%)",
        }}
      />

      {/* Layer 3: subtle grain only — no colored halos / floating circles */}
      <div className="grain pointer-events-none absolute inset-0 z-[2]" />

      {/* Layer 4: thin accent baseline (architectural detail, not a halo) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent) 60%, transparent), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:pl-[8vw]">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm"
              style={{
                borderColor: "color-mix(in oklab, var(--accent) 40%, transparent)",
                background: "color-mix(in oklab, var(--accent) 12%, transparent)",
                color: "var(--accent)",
              }}
            >
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ background: "var(--accent)" }}
              />
              Apurímac · Perú · EPCM
            </motion.div>

            {/* Headline */}
            <h1
              className="mt-6 font-display font-extrabold leading-[1.05] text-foreground"
              style={{ fontSize: "clamp(42px, 6vw, 84px)" }}
            >
              <span className="block">
                {HEADLINE_LINE_1.split(" ").map((w, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.25 + i * 0.07, duration: 0.55, ease: "easeOut" }}
                    className="mr-[0.25em] inline-block"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
              <span className="block">
                {HEADLINE_LINE_2.split(" ").map((w, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 3.45 + i * 0.07,
                      duration: 0.55,
                      ease: "easeOut",
                    }}
                    className="text-gradient mr-[0.25em] inline-block"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.7, duration: 0.6 }}
              className="mt-5 max-w-[520px] text-[clamp(16px,1.8vw,20px)] leading-[1.7]"
              style={{ color: "rgba(241,240,245,0.72)" }}
            >
              Soluciones técnicas e innovadoras para los sectores de
              <span className="text-foreground"> construcción y minería</span>.
              Diseño civil, geotecnia, hidrología, ambiental y supervisión EPCM
              desde la región de Apurímac.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.0, duration: 0.6 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a href="#contacto" className="btn-pill btn-primary group">
                Cotiza tu proyecto
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a href="#servicios" className="btn-pill btn-ghost group">
                <Play size={14} />
                Ver servicios
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.3, duration: 0.6 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5"
            >
              {STATS.map((s, i) => (
                <div key={i} className="flex items-center gap-8">
                  <div>
                    <div className="font-display text-[24px] font-bold text-foreground">
                      <CountUp to={s.num} suffix={s.suffix} />
                    </div>
                    <div className="text-[12px] text-muted-foreground">{s.label}</div>
                  </div>
                  {i < STATS.length - 1 && (
                    <div className="hidden h-8 w-px bg-border md:block" />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          Scroll
        </span>
        <div className="h-8 w-px overflow-hidden bg-white/10">
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full"
            style={{ background: "var(--accent)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
