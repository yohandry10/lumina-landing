import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { projectCases } from "@/lib/projectCases";

export const Route = createFileRoute("/proyectos/")({
  component: Proyectos,
});

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function Proyectos() {
  const { content } = useLanguage();

  useEffect(() => {
    document.title = content.meta.projectsTitle;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", content.meta.projectsDescription);
    }
  }, [content]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main>
        {/* ── Hero ── */}
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
                {content.nav.home}
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
                {content.projects.overline}
              </p>
              <h1
                className="mt-3 font-display font-bold leading-[1.1] text-foreground"
                style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
              >
                {content.projects.title}
              </h1>
              <p className="mt-4 max-w-xl text-[17px] leading-[1.7] text-muted-foreground">
                {content.projects.subtitle}
              </p>
              <div className="mt-5 h-[2px] w-10" style={{ background: "var(--gradient-accent)" }} />
            </motion.div>
          </div>
        </section>

        {/* ── Projects grid ── */}
        <section className="section-y">
          <div className="container-x">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {content.projects.items.map((project, i) => {
                const projectCase = projectCases[i];
                if (!projectCase) return null;

                return (
                  <motion.div key={projectCase.slug} variants={itemVariants}>
                    <Link
                      to="/proyectos/$slug"
                      params={{ slug: projectCase.slug }}
                      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border/50 bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-border hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.08)]"
                    >
                      <div className="relative h-52 overflow-hidden sm:h-48">
                        <img
                          src={project.img}
                          alt={project.title}
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
                          {project.sector}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="font-display text-[18px] font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
                          {project.title}
                        </h3>
                        <div className="mt-3 flex items-center gap-1.5 text-[13px] text-muted-foreground">
                          <MapPin size={13} />
                          {project.location}
                        </div>
                        <p className="mt-3 flex-1 text-[13px] leading-[1.65] text-muted-foreground">
                          {projectCase.summary}
                        </p>
                        <div className="mt-5 border-t border-border/40 pt-4">
                          <span
                            className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors"
                            style={{ color: "var(--accent)" }}
                          >
                            {content.projects.caseStudyCta}
                            <ArrowRight
                              size={13}
                              className="transition-transform group-hover:translate-x-0.5"
                            />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
