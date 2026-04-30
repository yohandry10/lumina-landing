import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Section, SectionHeading, itemVariants } from "./Section";

const MotionLink = motion.create(Link);
const PREVIEW_COUNT = 3;

export function PressPreview() {
  const { content } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const notes = content.press.notes.slice(0, PREVIEW_COUNT);
  const preview = content.pressPreview;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateState = () => {
      const firstSlide = track.querySelector<HTMLElement>("[data-slide]");
      const gap = parseFloat(getComputedStyle(track).columnGap || "0");
      const step = firstSlide ? firstSlide.getBoundingClientRect().width + gap : 1;
      const maxScroll = track.scrollWidth - track.clientWidth;

      setActive(Math.round(track.scrollLeft / step));
      setCanScrollPrev(track.scrollLeft > 4);
      setCanScrollNext(track.scrollLeft < maxScroll - 4);
    };

    updateState();
    track.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);

    return () => {
      track.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, []);

  const scrollBySlide = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;

    const firstSlide = track.querySelector<HTMLElement>("[data-slide]");
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    const step = firstSlide ? firstSlide.getBoundingClientRect().width + gap : track.clientWidth;

    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const scrollToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.querySelectorAll<HTMLElement>("[data-slide]")[index];
    slide?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  return (
    <Section id="noticias">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
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

        <div className="flex shrink-0 gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => scrollBySlide(-1)}
            disabled={!canScrollPrev}
            aria-label={preview.previousAria}
            className="grid h-12 w-12 place-items-center rounded-full border border-border bg-surface text-foreground shadow-sm transition-all hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollBySlide(1)}
            disabled={!canScrollNext}
            aria-label={preview.nextAria}
            className="grid h-12 w-12 place-items-center rounded-full border border-border bg-surface text-foreground shadow-sm transition-all hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative"
      >
        <div
          ref={trackRef}
          className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible"
        >
          {notes.map((note, i) => (
            <motion.article
              key={i}
              data-slide
              variants={itemVariants}
              className="group flex min-w-0 shrink-0 basis-[86vw] snap-start flex-col overflow-hidden rounded-[20px] border border-border/60 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg sm:basis-[360px] lg:basis-auto"
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
        </div>

        <div className="mt-8 flex justify-center gap-2 lg:hidden">
          {notes.map((_, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => scrollToSlide(i)}
              animate={{
                width: i === active ? 24 : 8,
                opacity: i === active ? 1 : 0.35,
              }}
              transition={{ duration: 0.25 }}
              className="h-2 rounded-full"
              style={{
                background: i === active ? "var(--gradient-accent)" : "var(--muted-foreground)",
              }}
              aria-label={`${preview.dotAriaPrefix} ${i + 1}`}
            />
          ))}
        </div>
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
