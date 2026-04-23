import { motion } from "framer-motion";
import { Target, Eye, Sparkles, Shield, Zap, HeartHandshake } from "lucide-react";
import { Section, containerVariants, itemVariants } from "./Section";

const VALUES = [
  { Icon: Shield, label: "Cumplimiento" },
  { Icon: HeartHandshake, label: "Responsabilidad" },
  { Icon: Zap, label: "Eficiencia" },
  { Icon: Sparkles, label: "Innovación" },
];

export function About() {
  return (
    <Section id="nosotros">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        {/* Left: image collage */}
        <div className="lg:col-span-5">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative aspect-[4/5] w-full"
          >
            <motion.div
              variants={itemVariants}
              className="absolute inset-0 overflow-hidden rounded-2xl border border-border"
            >
              <img
                src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1200&q=80"
                alt="Equipo de ingenieros"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, oklch(0.145 0.012 260 / 0.6) 100%)",
                }}
              />
            </motion.div>

            {/* decorative outline */}
            <div
              className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-2xl"
              style={{ border: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)" }}
            />
          </motion.div>
        </div>

        {/* Right: content */}
        <div className="lg:col-span-7">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={itemVariants}
              className="text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "var(--accent)" }}
            >
              Quiénes somos
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="mt-3 font-display font-bold leading-[1.1] text-foreground"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Ingeniería de <span className="text-gradient">vanguardia</span> para el desarrollo del
              Perú
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-2xl text-[17px] leading-[1.7] text-muted-foreground"
            >
              Hanan Ingeniería se especializa en el diseño de infraestructura minera, geotecnia,
              hidráulica, hidrología y gestión ambiental. Desarrollamos soluciones integrales e
              innovadoras que responden con precisión a los retos de la construcción y la minería en
              el Perú, asegurando altos estándares de seguridad, calidad y sostenibilidad, además
              del estricto cumplimiento de plazos y normativas técnicas.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              <div className="card-base !p-6">
                <div className="flex items-center gap-3">
                  <div className="icon-tile !h-10 !w-10">
                    <Target size={18} />
                  </div>
                  <h3 className="font-display text-[18px] font-bold">Misión</h3>
                </div>
                <p className="mt-4 text-[14px] leading-[1.65] text-muted-foreground">
                  Soluciones técnicas e innovadoras a desafíos constructivos, con uso eficiente de
                  recursos y cumplimiento de plazos sin afectar la calidad.
                </p>
              </div>
              <div className="card-base !p-6">
                <div className="flex items-center gap-3">
                  <div className="icon-tile !h-10 !w-10">
                    <Eye size={18} />
                  </div>
                  <h3 className="font-display text-[18px] font-bold">Visión</h3>
                </div>
                <p className="mt-4 text-[14px] leading-[1.65] text-muted-foreground">
                  Ser líderes en soluciones innovadoras y sostenibles para construcción y minería en
                  el Perú, transformando desafíos en oportunidades de desarrollo.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
              {VALUES.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface)] px-4 py-2 text-[13px] font-medium text-foreground"
                >
                  <Icon size={14} style={{ color: "var(--accent)" }} />
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
