import { motion } from "framer-motion";
import { Section, SectionHeading, containerVariants, itemVariants } from "./Section";

const SECTORS = [
  {
    title: "Minería",
    img: "https://images.unsplash.com/photo-1605106702734-205df224ecce?auto=format&fit=crop&w=1200&q=80",
    desc: "Diseño e ingeniería para pequeña, mediana y gran minería metálica y no metálica.",
    items: ["Relaveras y geosintéticos", "Cierre de minas", "Hidráulica minera", "Geotecnia"],
  },
  {
    title: "Construcción",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    desc: "Infraestructura civil para sector privado, municipalidades y gobiernos regionales.",
    items: ["Obras viales", "Edificaciones", "Saneamiento", "Estructuras"],
  },
  {
    title: "Hídrico & Ambiental",
    img: "https://images.unsplash.com/photo-1467533003447-e295ff1b0435?auto=format&fit=crop&w=1200&q=80",
    desc: "Estudios, modelamiento y permisos para proyectos hídricos y ambientales sostenibles.",
    items: ["Hidrología", "Caudales ecológicos", "DAAC / DIA", "Hidrogeología"],
  },
];

export function Sectors() {
  return (
    <Section id="sectores" className="bg-[color:var(--deep)]">
      <SectionHeading
        overline="Sectores"
        title={
          <>
            Donde aportamos <span className="text-gradient">valor real</span>.
          </>
        }
        subtitle="Nos especializamos en sectores clave para el desarrollo del país, con un equipo técnico y multidisciplinario."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {SECTORS.map((s, i) => (
          <motion.article
            key={i}
            variants={itemVariants}
            className="card-base group flex h-full flex-col !p-0"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={s.img}
                alt={s.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, oklch(0.145 0.012 260 / 0.85) 100%)",
                }}
              />
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <h3 className="font-display text-[26px] font-bold text-foreground">
                  {s.title}
                </h3>
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
                  style={{
                    background: "color-mix(in oklab, var(--accent) 18%, transparent)",
                    color: "var(--accent)",
                    border: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)",
                  }}
                >
                  Especialidad
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-7">
              <p className="text-[14px] leading-[1.65] text-muted-foreground">
                {s.desc}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-border pt-5">
                {s.items.map((it) => (
                  <div
                    key={it}
                    className="flex items-center gap-2 text-[13px] text-muted-foreground"
                  >
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ background: "var(--accent-2)" }}
                    />
                    {it}
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
