import { useState } from "react";
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
import { Section, SectionHeading, itemVariants } from "./Section";

const SERVICES = [
  {
    Icon: Droplets,
    title: "Hidrología",
    desc: "Modelamiento hidráulico, caudales de diseño, balance hídrico y transporte de sedimentos.",
    bullets: ["Máximas avenidas", "Estaciones pluviométricas", "Flujos hiperconcentrados"],
  },
  {
    Icon: Mountain,
    title: "Geotecnia",
    desc: "Peligro sísmico, estabilidad física, diseño de cimentaciones y análisis dinámico avanzado.",
    bullets: ["Elementos finitos", "Equilibrio límite", "Instrumentación geotécnica"],
  },
  {
    Icon: HardHat,
    title: "Obras y servicios generales",
    desc: "Supervisión integral de obras públicas viales, civiles, geotécnicas e hidráulicas.",
    bullets: ["Supervisión EPCM", "Control de calidad", "Cierre de obra"],
  },
  {
    Icon: Waves,
    title: "Hidrogeología",
    desc: "Simulación de flujos subterráneos, hidráulica subterránea y supervisión de piezómetros.",
    bullets: ["Modelamiento", "Diseño de pozos", "Monitoreo"],
  },
  {
    Icon: Map,
    title: "Ingeniería geográfica",
    desc: "Catastros, cartografía, planificación territorial, fotogrametría y modelado 3D.",
    bullets: ["LiDAR & drones", "Topografía", "Batimetría"],
  },
  {
    Icon: Leaf,
    title: "Ambiental",
    desc: "Instrumentos de gestión, permisos y servicios biológicos para proyectos sostenibles.",
    bullets: ["DAAC · DIA · DAP", "PMA · ITM", "Caudales ecológicos"],
  },
  {
    Icon: Compass,
    title: "Consultoría EPCM",
    desc: "Acompañamiento integral en ingeniería, procura, construcción y gestión de proyectos.",
    bullets: ["Ingeniería de detalle", "Gestión de procura", "Cierre y entrega"],
  },
] as const;

const MIN_VISIBLE_SERVICES = 4;

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
  const [expanded, setExpanded] = useState(false);
  const visibleServices = expanded ? SERVICES : SERVICES.slice(0, MIN_VISIBLE_SERVICES);

  return (
    <Section id="servicios">
      <SectionHeading
        overline="Servicios"
        title={
          <>
            Soluciones de ingeniería <span className="text-gradient">integrales</span> de principio
            a fin
          </>
        }
        subtitle="Cubrimos todas las etapas de ingeniería, desde la etapa conceptual, prefactibilidad, factibilidad, básica hasta la ingeniería de detalle."
      />

      <motion.div layout className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence initial={false}>
          {visibleServices.map(({ Icon, title, desc, bullets }, i) => (
            <motion.article
              layout
              key={title}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="service-card group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-border bg-surface p-7 transition-all duration-300"
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 300, damping: 22 },
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 38%, color-mix(in oklab, var(--accent) 6%, transparent) 50%, transparent 62%)",
                }}
              />

              <span
                className="absolute right-5 top-5 font-display text-[11px] font-bold tabular-nums opacity-30"
                style={{ color: "var(--accent)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "color-mix(in oklab, var(--accent) 8%, transparent)",
                  borderColor: "color-mix(in oklab, var(--accent) 18%, transparent)",
                  color: "var(--accent)",
                }}
              >
                <Icon size={22} strokeWidth={1.6} />
              </div>

              <h3 className="mt-5 font-display text-[18px] font-bold leading-snug text-foreground">
                {title}
              </h3>
              <p className="mt-2.5 flex-1 text-[13.5px] leading-[1.7] text-muted-foreground">
                {desc}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                {bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-2.5 text-[13px] text-muted-foreground"
                  >
                    <span
                      className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: "color-mix(in oklab, var(--accent) 10%, transparent)",
                      }}
                    >
                      <Check size={11} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: "var(--gradient-accent)" }}
              />
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {SERVICES.length > MIN_VISIBLE_SERVICES && (
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <motion.button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 rounded-full border border-border bg-surface px-6 py-3 text-[14px] font-semibold text-foreground transition-colors hover:bg-surface-2"
          >
            {expanded ? "Mostrar menos" : "Mostrar más servicios"}
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
              ¿Necesitas una solución a medida?
            </p>
            <p className="text-[13px] text-muted-foreground">
              Nuestro equipo diseña paquetes personalizados para cada proyecto.
            </p>
          </div>
        </div>
        <motion.a
          href="#contacto"
          className="btn-pill btn-primary gap-2 text-[14px]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Solicitar cotización
          <ArrowUpRight size={15} />
        </motion.a>
      </motion.div>
    </Section>
  );
}
