import { motion } from "framer-motion";
import { Target, Eye, Sparkles, Shield, Zap, HeartHandshake, Scale, Handshake } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Section, SectionHeading, containerVariants, itemVariants } from "./Section";

const VALUE_ICONS = {
  compliance: Shield,
  responsibility: HeartHandshake,
  efficiency: Zap,
  innovation: Sparkles,
  ethics: Scale,
  commitment: Handshake,
} as const;

export function About() {
  const { content } = useLanguage();

  return (
    <Section id="nosotros">
      <div className="mb-14">
        <SectionHeading
          overline={content.about.overline}
          title={
            <>
              {content.about.titlePrefix}
              <span className="text-gradient">{content.about.titleHighlight}</span>
              {content.about.titleSuffix}
            </>
          }
          subtitle={content.about.body}
          align="center"
        />
      </div>

      {/* Full-width Panoramic Image */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mb-12 w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-[32px] border border-border/50 shadow-md"
      >
        <img
          src="/hanna.png"
          alt={content.about.imageAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </motion.div>

      {/* Perfectly Balanced 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        {/* Left Column: Misión + Sectores */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group flex flex-col rounded-[32px] border border-border/60 bg-surface p-8 sm:p-10 shadow-sm transition-all hover:border-border hover:shadow-md"
          >
            <div className="mb-6 flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "color-mix(in oklab, var(--accent) 10%, transparent)",
                  color: "var(--accent)",
                }}
              >
                <Target size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-[24px] font-bold text-foreground">
                {content.about.missionTitle}
              </h3>
            </div>
            <div className="space-y-4">
              {content.about.missionBody.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col rounded-[32px] border border-border/40 bg-surface-2/30 p-8 sm:p-10"
          >
            <p className="mb-5 text-[12.5px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {content.about.sectorsTitle}
            </p>
            <div className="flex flex-wrap gap-3">
              {content.about.sectors.map((sector) => (
                <span
                  key={sector}
                  className="inline-flex items-center rounded-xl bg-surface px-4 py-2 text-[14.5px] font-semibold text-foreground shadow-sm ring-1 ring-border/50 transition-all hover:ring-accent/50"
                >
                  {sector}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Visión + Valores */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group flex flex-col rounded-[32px] border border-border/60 bg-surface p-8 sm:p-10 shadow-sm transition-all hover:border-border hover:shadow-md"
          >
            <div className="mb-6 flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "color-mix(in oklab, var(--accent) 10%, transparent)",
                  color: "var(--accent)",
                }}
              >
                <Eye size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-[24px] font-bold text-foreground">
                {content.about.visionTitle}
              </h3>
            </div>
            <div className="space-y-4">
              {content.about.visionBody.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col rounded-[32px] border border-border/40 bg-surface-2/30 p-8 sm:p-10"
          >
            <p className="mb-5 text-[12.5px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Valores
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              {content.about.values.map(({ id, label }) => {
                const Icon = VALUE_ICONS[id];
                return (
                  <span
                    key={label}
                    className="inline-flex h-11 w-full min-w-0 items-center gap-2 rounded-xl bg-surface px-3 text-[12.5px] font-semibold leading-none text-foreground shadow-sm ring-1 ring-border/50 transition-all hover:ring-accent/50 sm:h-auto sm:w-auto sm:px-4 sm:py-2 sm:text-[14px] sm:font-medium"
                  >
                    <Icon
                      size={15}
                      className="shrink-0"
                      style={{ color: "var(--accent)" }}
                    />
                    <span className="min-w-0 whitespace-nowrap">{label}</span>
                  </span>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
