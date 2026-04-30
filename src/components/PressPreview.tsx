import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Calendar, ArrowUpRight, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Section, SectionHeading, containerVariants, itemVariants } from "./Section";

const PREVIEW_COUNT = 3;
const MotionLink = motion.create(Link);

export function PressPreview() {
  const { content } = useLanguage();
  const notes = content.press.notes.slice(0, PREVIEW_COUNT);
  const preview = content.pressPreview;

  return (
    <Section id="noticias">
      <div className="mb-12">
        <SectionHeading
          overline={preview.overline}
          title={
            <>
              {preview.titlePrefix}
              <span className="text-gradient">{preview.titleHighlight}</span>
              {preview.titleSuffix}
            </>
          }
          subtitle={preview.subtitle}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {notes.map((note, i) => (
          <motion.article
            key={i}
            variants={itemVariants}
            className="group flex flex-col overflow-hidden rounded-[20px] border border-border/60 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={note.img}
                alt={note.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Calendar size={12} />
                  {note.date}
                </span>
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--accent)" }}
                >
                  {note.tag}
                </span>
              </div>
              <h3 className="mt-3 font-display text-[16px] font-bold leading-snug text-foreground line-clamp-2">
                {note.title}
              </h3>
              <p className="mt-3 flex-1 text-[13px] leading-[1.7] text-muted-foreground line-clamp-3">
                {note.summary}
              </p>
              <div className="mt-4 border-t border-border/50 pt-4">
                <Link
                  to="/prensa"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors"
                  style={{ color: "var(--accent)" }}
                >
                  {preview.readMore}
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-10 flex justify-center"
      >
        <MotionLink
          to="/prensa"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-7 py-3 text-[14px] font-semibold text-foreground shadow-sm transition-all hover:border-accent/40 hover:shadow-md"
        >
          {preview.viewAll}
          <ArrowRight size={15} />
        </MotionLink>
      </motion.div>
    </Section>
  );
}
