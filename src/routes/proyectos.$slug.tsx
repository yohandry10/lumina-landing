import { useEffect } from "react";
import type { ReactNode } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  MapPin,
  Target,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { getProjectCase, projectCases } from "@/lib/projectCases";

export const Route = createFileRoute("/proyectos/$slug")({
  loader: ({ params }) => {
    const project = getProjectCase(params.slug);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  component: ProjectDetail,
});

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const related = projectCases.filter((item) => item.slug !== project.slug).slice(0, 3);

  useEffect(() => {
    document.title = `${project.title} | Hanan Ingeniería`;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", project.summary);
    }
  }, [project]);

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
                hash="proyectos"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft size={14} />
                Volver a proyectos
              </Link>
            </motion.div>

            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.7fr)] lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "var(--accent)" }}
                >
                  Caso de estudio · {project.sector}
                </p>
                <h1
                  className="mt-3 font-display font-bold leading-[1.08] text-foreground"
                  style={{ fontSize: "clamp(32px, 5vw, 58px)" }}
                >
                  {project.title}
                </h1>
                <p className="mt-5 max-w-2xl text-[17px] leading-[1.75] text-muted-foreground">
                  {project.summary}
                </p>
                <div
                  className="mt-6 h-[2px] w-10"
                  style={{ background: "var(--gradient-accent)" }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="overflow-hidden rounded-[18px] border border-border bg-surface shadow-lg"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 40%, oklch(0.145 0.012 260 / 0.72) 100%)",
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
                <div className="grid grid-cols-3 gap-px bg-border">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="bg-surface px-4 py-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                        {metric.label}
                      </p>
                      <p className="mt-1 text-[14px] font-semibold text-foreground">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-y">
          <div className="container-x">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-3"
            >
              <motion.article
                variants={itemVariants}
                className="rounded-[16px] border border-border bg-surface p-6 shadow-sm lg:col-span-2"
              >
                <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                  <MapPin size={14} />
                  {project.location}, Perú
                </div>
                <h2 className="mt-5 font-display text-[28px] font-bold leading-tight text-foreground">
                  Contexto técnico
                </h2>
                <p className="mt-4 text-[15px] leading-[1.8] text-muted-foreground">
                  {project.context}
                </p>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <InfoBlock
                    icon={<Target size={18} />}
                    title="Desafío"
                    text={project.challenge}
                  />
                  <InfoBlock
                    icon={<ClipboardList size={18} />}
                    title="Solución aplicada"
                    text={project.solution}
                  />
                </div>
              </motion.article>

              <motion.aside
                variants={itemVariants}
                className="rounded-[16px] border border-border bg-surface p-6 shadow-sm"
              >
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: "var(--accent)" }}
                >
                  Alcance
                </p>
                <div className="mt-5 space-y-4">
                  {project.scope.map((item) => (
                    <div key={item} className="flex gap-3">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--accent)" }}
                      />
                      <p className="text-[13.5px] leading-[1.65] text-muted-foreground">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.aside>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3"
            >
              {project.results.map((result) => (
                <motion.div
                  key={result}
                  variants={itemVariants}
                  className="rounded-[16px] border border-border bg-surface p-6 shadow-sm"
                >
                  <p className="text-[13.5px] leading-[1.7] text-muted-foreground">{result}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-[color:var(--deep)] py-16">
          <div className="container-x">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "var(--accent)" }}
                >
                  Más proyectos
                </p>
                <h2 className="mt-3 font-display text-[32px] font-bold leading-tight text-foreground">
                  Otros casos relacionados
                </h2>
              </div>
              <Link
                to="/"
                hash="contacto"
                className="inline-flex items-center gap-2 rounded-full bg-amber px-5 py-3 text-[13px] font-semibold text-white transition-all hover:bg-amber-dark"
              >
                Solicitar cotización
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to="/proyectos/$slug"
                  params={{ slug: item.slug }}
                  className="group flex flex-col overflow-hidden rounded-[16px] border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
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
                      {item.sector}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-[17px] font-bold leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-1.5 text-[13px] text-muted-foreground">
                      <MapPin size={13} />
                      {item.location}
                    </div>
                    <span
                      className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium"
                      style={{ color: "var(--accent)" }}
                    >
                      Ver caso de estudio
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function InfoBlock({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[14px] border border-border bg-background p-5">
      <div className="flex items-center gap-2">
        <span
          className="grid h-8 w-8 place-items-center rounded-full"
          style={{
            background: "color-mix(in oklab, var(--accent) 10%, transparent)",
            color: "var(--accent)",
          }}
        >
          {icon}
        </span>
        <h3 className="font-display text-[17px] font-bold text-foreground">{title}</h3>
      </div>
      <p className="mt-3 text-[13.5px] leading-[1.7] text-muted-foreground">{text}</p>
    </div>
  );
}
