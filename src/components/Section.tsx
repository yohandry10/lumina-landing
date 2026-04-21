import { motion, type Variants } from "framer-motion";
import type { PropsWithChildren } from "react";

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Section({
  id,
  className = "",
  children,
}: PropsWithChildren<{ id?: string; className?: string }>) {
  return (
    <motion.section
      id={id}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`section-y relative ${className}`}
    >
      <div className="container-x">{children}</div>
    </motion.section>
  );
}

export function SectionHeading({
  overline,
  title,
  subtitle,
  align = "left",
  invert = false,
}: {
  overline: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  const isCenter = align === "center";
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}
    >
      <motion.p
        variants={itemVariants}
        className="text-[11px] font-semibold uppercase tracking-[0.22em]"
        style={{ color: "var(--accent)" }}
      >
        {overline}
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className={`mt-3 font-display font-bold leading-[1.1] ${
          invert ? "text-foreground" : "text-foreground"
        }`}
        style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-xl text-[17px] leading-[1.7] text-muted-foreground"
          style={isCenter ? { marginInline: "auto" } : undefined}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        variants={itemVariants}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className={`mt-5 h-[2px] w-10 ${isCenter ? "mx-auto" : ""}`}
        style={{ background: "var(--gradient-accent)", originX: 0 }}
      />
    </motion.div>
  );
}
