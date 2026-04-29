import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import {
  SERVICE_ICONS,
  SERVICE_SLUGS,
  getServiceIdBySlug,
  type ServiceId,
} from "@/lib/serviceData";

export const Route = createFileRoute("/servicios/$slug")({
  loader: ({ params }) => {
    const serviceId = getServiceIdBySlug(params.slug);
    if (!serviceId) {
      throw notFound();
    }
    return { serviceId, slug: params.slug };
  },
  component: ServiceDetail,
});

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SERVICE_HERO_IMAGES: Record<ServiceId, string> = {
  civilHydraulic: "/minero.jpg",
  hydrologicalStudies: "/hidrauligco.png",
  geotechnics: "/geotecnia.jpg",
  generalWorks: "/obras.jpg",
  hydrogeologicalStudies: "/hidrologico.jpg",
  geographicEngineering: "/geografica.jpg",
  environmentalEngineering: "/ingeneria-ambental.jpg",
};

function ServiceDetail() {
  const { serviceId } = Route.useLoaderData();
  const { content } = useLanguage();

  const service = content.services.items.find((s) => s.id === serviceId)!;
  const Icon = SERVICE_ICONS[serviceId];
  const heroImage = SERVICE_HERO_IMAGES[serviceId];
  const otherServices = content.services.items.filter((s) => s.id !== serviceId);

  useEffect(() => {
    document.title = `${service.title} | Hanan Ingeniería`;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", service.desc);
    }
  }, [service]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-[color:var(--deep)] pb-24 pt-16">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${heroImage}')`,
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[rgba(11,18,30,0.68)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/15" />
          <div className="grain pointer-events-none absolute inset-0 opacity-[0.08]" />

          <div className="container-x relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-white/75 transition-colors hover:text-white"
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
              <div className="flex items-center gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm"
                  style={{
                    background: "color-mix(in oklab, var(--accent) 12%, transparent)",
                    color: "var(--accent)",
                  }}
                >
                  <Icon className="h-[30px] w-[30px]" strokeWidth={1.5} />
                </div>
              </div>
              <h1
                className="mt-6 font-display font-bold leading-[1.1] text-white"
                style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
              >
                {service.title}
              </h1>
              <p className="mt-4 max-w-xl text-[17px] leading-[1.7] text-white/78">
                {service.desc}
              </p>
              <div
                className="mt-5 h-[2px] w-10"
                style={{ background: "var(--gradient-accent)" }}
              />
            </motion.div>
          </div>
        </section>

        {/* ── Bullets / capabilities ── */}
        <section className="section-y">
          <div className="container-x">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.p
                variants={itemVariants}
                className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--accent)" }}
              >
                {content.services.overline}
              </motion.p>
              <motion.h2
                variants={itemVariants}
                className="mt-3 font-display text-[28px] font-bold leading-tight text-foreground"
              >
                {service.title}
              </motion.h2>

              <motion.div
                variants={containerVariants}
                className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                {service.bullets.map((bullet, i) => (
                  <motion.div
                    key={bullet}
                    variants={itemVariants}
                    className="group flex items-start gap-4 rounded-[16px] border border-border/50 bg-surface p-5 transition-all duration-300 hover:border-border hover:shadow-sm"
                  >
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: "color-mix(in oklab, var(--accent) 12%, transparent)",
                      }}
                    >
                      <Check size={12} strokeWidth={3} style={{ color: "var(--accent)" }} />
                    </span>
                    <span className="text-[14.5px] leading-[1.65] text-muted-foreground transition-colors group-hover:text-foreground/90">
                      {bullet}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── CTA banner ── */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-surface-2 p-8 sm:flex-row sm:gap-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "var(--gradient-accent)", color: "#fff" }}
                >
                  <Sparkles size={18} strokeWidth={2} />
                </div>
                <div>
                  <p className="font-display text-[15px] font-bold text-foreground">
                    {content.servicePage.ctaTitle}
                  </p>
                  <p className="text-[13px] text-muted-foreground">
                    {content.servicePage.ctaSubtitle}
                  </p>
                </div>
              </div>
              <motion.a
                href="/#contacto"
                className="btn-pill btn-primary gap-2 text-[14px]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {content.servicePage.ctaCta}
                <ArrowUpRight size={15} />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ── Other services ── */}
        <section className="bg-[color:var(--deep)] py-16">
          <div className="container-x">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "var(--accent)" }}
                >
                  {content.servicePage.otherServices}
                </p>
                <h2 className="mt-3 font-display text-[32px] font-bold leading-tight text-foreground">
                  {content.services.titlePrefix}
                  <span className="text-gradient">{content.services.titleHighlight}</span>
                </h2>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-[13px] font-semibold text-foreground transition-all hover:bg-surface-2"
              >
                {content.nav.home}
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherServices.slice(0, 3).map((s) => {
                const SIcon = SERVICE_ICONS[s.id as ServiceId];
                const slug = SERVICE_SLUGS[s.id as ServiceId];

                return (
                  <Link
                    key={s.id}
                    to="/servicios/$slug"
                    params={{ slug }}
                    className="group flex flex-col overflow-hidden rounded-[16px] border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex flex-1 flex-col p-6">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{
                          background: "color-mix(in oklab, var(--accent) 10%, transparent)",
                          color: "var(--accent)",
                        }}
                      >
                        <SIcon className="h-[22px] w-[22px]" strokeWidth={1.5} />
                      </div>
                      <h3 className="mt-4 font-display text-[17px] font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
                        {s.title}
                      </h3>
                      <p className="mt-2 flex-1 text-[13px] leading-[1.65] text-muted-foreground">
                        {s.desc}
                      </p>
                      <span
                        className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium"
                        style={{ color: "var(--accent)" }}
                      >
                        {content.servicePage.viewService}
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
