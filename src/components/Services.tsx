import { motion } from "framer-motion";
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

export function Services() {
  return (
    <Section id="servicios">
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {SERVICES.map(({ Icon, title, desc, bullets }, i) => (
          <motion.article
            key={i}
            variants={itemVariants}
            className="card-base flex h-full flex-col"
          >
            <div className="icon-tile">
              <Icon size={22} strokeWidth={1.6} />
            </div>
            <h3 className="mt-6 font-display text-[20px] font-bold text-foreground">
              {title}
            </h3>
            <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground">
              {desc}
            </p>
            <ul className="mt-5 space-y-2 border-t border-border pt-5">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
