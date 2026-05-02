import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SERVICE_ICONS, SERVICE_SLUGS, type ServiceId } from "@/lib/serviceData";

export const Route = createFileRoute("/servicios/")({
  component: ServiciosIndex,
});

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
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

function ServiciosIndex() {
  const { content } = useLanguage();
  const si = content.servicesIndex;

  useEffect(() => {
    document.title = content.meta.servicesTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", content.meta.servicesDescription);
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
                {si.overline}
              </p>
              <h1
                className="mt-3 font-display font-bold leading-[1.1] text-foreground"
                style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
              >
                {si.titlePrefix}
                <span className="text-gradient">{si.titleHighlight}</span>
                {si.titleSuffix}
              </h1>
              <p className="mt-4 max-w-xl text-[17px] leading-[1.7] text-muted-foreground">
                {si.subtitle}
              </p>
              <div className="mt-5 h-[2px] w-10" style={{ background: "var(--gradient-accent)" }} />
            </motion.div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="section-y">
          <div className="container-x">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {content.services.items.map((service, i) => {
                const Icon = SERVICE_ICONS[service.id as ServiceId];
                const slug = SERVICE_SLUGS[service.id as ServiceId];
                const heroImg = SERVICE_HERO_IMAGES[service.id as ServiceId];
                const total = content.services.items.length;
                const isLastOdd = total % 2 === 1 && i === total - 1;

                return (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    className={isLastOdd ? "md:col-span-2" : ""}
                  >
                    <Link
                      to="/servicios/$slug"
                      params={{ slug }}
                      className={`group flex flex-col overflow-hidden rounded-[20px] border border-border/60 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl sm:flex-row ${isLastOdd ? "md:max-w-none" : ""}`}
                    >
                      {/* Image */}
                      <div
                        className={`relative h-48 overflow-hidden sm:h-auto sm:shrink-0 ${isLastOdd ? "sm:w-[320px]" : "sm:w-[200px]"}`}
                      >
                        <img
                          src={heroImg}
                          alt={service.title}
                          loading={i < 4 ? "eager" : "lazy"}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0 sm:bg-gradient-to-r sm:from-transparent sm:to-black/10"
                          style={{
                            background:
                              "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.25) 100%)",
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6 sm:p-7">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                            style={{
                              background: "color-mix(in oklab, var(--accent) 10%, transparent)",
                              color: "var(--accent)",
                            }}
                          >
                            <Icon className="h-[20px] w-[20px]" strokeWidth={1.5} />
                          </div>
                          <h2 className="font-display text-[18px] font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
                            {service.title}
                          </h2>
                        </div>

                        <p className="mt-4 flex-1 text-[13.5px] leading-[1.7] text-muted-foreground line-clamp-3">
                          {service.desc}
                        </p>

                        <div
                          className="mt-5 flex items-center gap-1.5 text-[13px] font-semibold"
                          style={{ color: "var(--accent)" }}
                        >
                          {si.viewService}
                          <ArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ── CTA Banner ── */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 flex flex-col items-center justify-between gap-6 rounded-[20px] border border-border bg-surface-2 p-8 sm:flex-row sm:gap-4 sm:p-10"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "var(--gradient-accent)", color: "#fff" }}
                >
                  <Sparkles size={20} strokeWidth={2} />
                </div>
                <div>
                  <p className="font-display text-[16px] font-bold text-foreground">
                    {si.ctaTitle}
                  </p>
                  <p className="mt-1 text-[13.5px] text-muted-foreground">{si.ctaSubtitle}</p>
                </div>
              </div>
              <motion.a
                href="/#contacto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-amber px-7 py-3 text-[14px] font-bold text-white shadow-sm transition-all hover:bg-amber-dark hover:shadow-md"
              >
                {si.ctaCta}
                <ArrowUpRight size={15} />
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
