import { motion, type Variants } from "framer-motion";
import {
  Layers,
  Mountain,
  Droplets,
  Compass,
  Map,
  Leaf,
  HardHat,
  Waves,
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";
import { Section, SectionHeading, containerVariants, itemVariants } from "./Section";

const SERVICES = [
  {
    Icon: Layers,
    title: "Diseño civil e hidráulico",
    desc: "Plantas de procesamiento, infraestructura minera, presas, geosintéticos y manejo de materiales excedentes.",
    bullets: ["Disposición de relaves", "Hidráulica fluvial", "Análisis de roturas"],
  },
  {
    Icon: Droplets,
    title: "Estudios hidrológicos",
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
    title: "Estudios hidrogeológicos",
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
    title: "Ingeniería ambiental",
    desc: "Instrumentos de gestión, permisos y servicios biológicos para proyectos sostenibles.",
    bullets: ["DAAC · DIA · DAP", "PMA · ITM", "Caudales ecológicos"],
  },
  {
    Icon: Compass,
    title: "Consultoría EPCM",
    desc: "Acompañamiento integral en ingeniería, procura, construcción y gestión de proyectos.",
    bullets: ["Ingeniería de detalle", "Gestión de procura", "Cierre y entrega"],
  },
];

/* ─── animation ─── */
const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

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
  return (
    <Section id="servicios">
      {/* ── header ── */}
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          overline="Servicios"
          title={
            <>
              Capacidades <span className="text-gradient">técnicas</span>{" "}
              de extremo a extremo.
            </>
          }
          subtitle="Cubrimos todo el ciclo de vida de un proyecto de ingeniería: desde estudios preliminares y diseño, hasta supervisión, construcción y cierre."
        />
        <a
          href="#contacto"
          className="group inline-flex items-center gap-2 text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Ver capacidades completas
          <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* ── cards grid ── */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {SERVICES.map(({ Icon, title, desc, bullets }, i) => (
          <motion.article
            key={i}
            variants={cardVariants}
            className="service-card group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-border bg-surface p-7 transition-all duration-300"
            whileHover={{
              y: -6,
              transition: { type: "spring", stiffness: 300, damping: 22 },
            }}
          >
            {/* hover shimmer */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: "linear-gradient(105deg, transparent 38%, color-mix(in oklab, var(--accent) 6%, transparent) 50%, transparent 62%)",
              }}
            />

            {/* number tag */}
            <span
              className="absolute right-5 top-5 font-display text-[11px] font-bold tabular-nums opacity-30"
              style={{ color: "var(--accent)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* icon */}
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

            {/* content */}
            <h3 className="mt-5 font-display text-[18px] font-bold leading-snug text-foreground">
              {title}
            </h3>
            <p className="mt-2.5 flex-1 text-[13.5px] leading-[1.7] text-muted-foreground">
              {desc}
            </p>

            {/* bullets with check icons */}
            <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2.5 text-[13px] text-muted-foreground"
                >
                  <span
                    className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: "color-mix(in oklab, var(--accent) 10%, transparent)",
                    }}
                  >
                    <Check
                      size={11}
                      strokeWidth={2.5}
                      style={{ color: "var(--accent)" }}
                    />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {/* bottom accent line on hover */}
            <div
              className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
              style={{ background: "var(--gradient-accent)" }}
            />
          </motion.article>
        ))}
      </motion.div>

      {/* ── bottom CTA strip ── */}
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
