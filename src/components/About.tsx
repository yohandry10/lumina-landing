import { motion } from "framer-motion";
import { Target, Eye, Sparkles, Shield, Zap, HeartHandshake, Scale, Handshake } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Section, containerVariants, itemVariants } from "./Section";

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
                alt={content.about.imageAlt}
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
              {content.about.overline}
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="mt-3 font-display font-bold leading-[1.1] text-foreground"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              {content.about.titlePrefix}
              <span className="text-gradient">{content.about.titleHighlight}</span>
              {content.about.titleSuffix}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-2xl text-[17px] leading-[1.7] text-muted-foreground"
            >
              {content.about.body}
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
                  <h3 className="font-display text-[18px] font-bold">{content.about.missionTitle}</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {content.about.missionBody.map((paragraph) => (
                    <p key={paragraph} className="text-[14px] leading-[1.65] text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <div className="card-base !p-6">
                <div className="flex items-center gap-3">
                  <div className="icon-tile !h-10 !w-10">
                    <Eye size={18} />
                  </div>
                  <h3 className="font-display text-[18px] font-bold">{content.about.visionTitle}</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {content.about.visionBody.map((paragraph) => (
                    <p key={paragraph} className="text-[14px] leading-[1.65] text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {content.about.sectorsTitle}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {content.about.sectors.map((sector) => (
                  <div
                    key={sector}
                    className="inline-flex items-center rounded-full border border-border bg-[color:var(--surface)] px-4 py-2 text-[13px] font-medium text-foreground"
                  >
                    {sector}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
              {content.about.values.map(({ id, label }) => {
                const Icon = VALUE_ICONS[id];

                return (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface)] px-4 py-2 text-[13px] font-medium text-foreground"
                  >
                    <Icon size={14} style={{ color: "var(--accent)" }} />
                    {label}
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
