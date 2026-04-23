import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

export const Route = createFileRoute("/prensa")({
  component: Prensa,
});

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Prensa() {
  const { content } = useLanguage();

  useEffect(() => {
    document.title = content.meta.pressTitle;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", content.meta.pressDescription);
    }
  }, [content]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-[color:var(--deep)] pb-20 pt-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--accent) 15%, transparent), transparent 60%)",
            }}
          />
          <div className="grain pointer-events-none absolute inset-0 opacity-[0.04]" />

          <div className="container-x relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft size={14} />
                {content.press.backHome}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 max-w-3xl"
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--accent)" }}
              >
                {content.press.overline}
              </p>
              <h1
                className="mt-3 font-display font-bold leading-[1.1] text-foreground"
                style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
              >
                {content.press.titlePrefix}
                <span className="text-gradient">{content.press.titleHighlight}</span>
                {content.press.titleSuffix}
              </h1>
              <p className="mt-4 max-w-xl text-[17px] leading-[1.7] text-muted-foreground">
                {content.press.subtitle}
              </p>
              <div className="mt-5 h-[2px] w-10" style={{ background: "var(--gradient-accent)" }} />
            </motion.div>
          </div>
        </section>

        <section className="section-y">
          <div className="container-x">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {content.press.notes.map((note, i) => (
                <motion.article
                  key={i}
                  variants={itemVariants}
                  className="group flex flex-col overflow-hidden rounded-[16px] border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={note.img}
                      alt={note.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 40%, oklch(0.145 0.012 260 / 0.7) 100%)",
                      }}
                    />
                    <span
                      className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur-md"
                      style={{
                        background: "color-mix(in oklab, var(--accent) 18%, transparent)",
                        color: "var(--accent)",
                        border: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)",
                      }}
                    >
                      {note.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                      <Calendar size={12} />
                      {note.date}
                    </div>
                    <h3 className="mt-3 font-display text-[17px] font-bold leading-snug text-foreground">
                      {note.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[13.5px] leading-[1.7] text-muted-foreground">
                      {note.summary}
                    </p>
                    <div className="mt-5 border-t border-border pt-4">
                      <span
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors"
                        style={{ color: "var(--accent)" }}
                      >
                        {content.press.readMore}
                        <ArrowUpRight
                          size={13}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
