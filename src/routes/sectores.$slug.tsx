import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

const VALID_SLUGS = ["construccion", "mineria"] as const;

const SECTOR_HERO_IMAGES: Record<string, string> = {
  construccion: "/portada.png",
  mineria: "/minero.jpg",
};

export const Route = createFileRoute("/sectores/$slug")({
  loader: ({ params }) => {
    if (!VALID_SLUGS.includes(params.slug as (typeof VALID_SLUGS)[number])) {
      throw notFound();
    }
    return { slug: params.slug };
  },
  component: SectorDetail,
});

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function SectorDetail() {
  const { slug } = Route.useLoaderData();
  const { content } = useLanguage();

  const sector = content.sectorPage.sectors.find((s) => s.slug === slug)!;
  const heroImage = SECTOR_HERO_IMAGES[slug];

  useEffect(() => {
    document.title = `${sector.title} | Hanan Ingeniería`;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", sector.subtitle);
    }
  }, [sector]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-[color:var(--deep)] pb-32 pt-24 sm:pb-40 sm:pt-28 lg:pb-48 lg:pt-32">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[rgba(11,18,30,0.62)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/10" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
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
                {content.sectorPage.backHome}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-10 max-w-3xl"
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--accent)" }}
              >
                {content.nav.sectors}
              </p>
              <h1
                className="mt-4 font-display font-bold leading-[1.08] text-white"
                style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
              >
                {sector.title}
              </h1>
              <p className="mt-4 max-w-xl text-[18px] leading-[1.7] text-white/80">
                {sector.subtitle}
              </p>
              <div className="mt-6 h-[2px] w-12" style={{ background: "var(--gradient-accent)" }} />
            </motion.div>
          </div>
        </section>

        {/* ── Description ── */}
        <section className="section-y">
          <div className="container-x">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="mx-auto max-w-3xl"
            >
              {sector.description.map((paragraph) => (
                <motion.p
                  key={paragraph}
                  variants={itemVariants}
                  className="mt-6 first:mt-0 text-[16px] leading-[1.8] text-muted-foreground"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Highlights / capabilities ── */}
        <section className="bg-surface-2/40 py-16 sm:py-20">
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
                {sector.title}
              </motion.p>
              <motion.h2
                variants={itemVariants}
                className="mt-3 font-display text-[28px] font-bold leading-tight text-foreground"
              >
                {sector.subtitle}
              </motion.h2>

              <motion.div
                variants={containerVariants}
                className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                {sector.highlights.map((highlight) => (
                  <motion.div
                    key={highlight}
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
                      {highlight}
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
                    {content.sectorPage.ctaTitle}
                  </p>
                  <p className="text-[13px] text-muted-foreground">
                    {content.sectorPage.ctaSubtitle}
                  </p>
                </div>
              </div>
              <motion.a
                href="/#contacto"
                className="btn-pill btn-primary gap-2 text-[14px]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {content.sectorPage.ctaCta}
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
