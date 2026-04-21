import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage, type Lang } from "@/lib/language";
import { cn } from "@/lib/utils";

const links = [
  { href: "#inicio", key: "nav.home" },
  { href: "#nosotros", key: "nav.about" },
  { href: "#sectores", key: "nav.sectors" },
  { href: "#servicios", key: "nav.services" },
  { href: "#proyectos", key: "nav.projects" },
  { href: "#contacto", key: "nav.contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100] transition-[background,box-shadow,color,backdrop-filter] duration-300"
        style={{
          background: open
            ? "transparent"
            : solid
              ? "color-mix(in oklab, white 84%, transparent)"
              : "linear-gradient(180deg, rgba(15, 26, 42, 0.32) 0%, rgba(15, 26, 42, 0.12) 58%, transparent 100%)",
          backdropFilter: open ? "none" : (solid ? "saturate(180%) blur(16px)" : "none"),
          WebkitBackdropFilter: open ? "none" : (solid ? "saturate(180%) blur(16px)" : "none"),
          boxShadow: !open && solid
            ? "0 1px 0 color-mix(in oklab, var(--line) 88%, transparent), 0 10px 28px -18px rgba(24, 36, 58, 0.32)"
            : "none",
          color: open ? "white" : (solid ? "var(--navy)" : "rgba(255,255,255,0.94)"),
          textShadow: (open || solid) ? "none" : "0 1px 2px rgba(11, 18, 31, 0.18)",
        }}
      >
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 md:px-10 lg:px-12">
          <a href="#inicio" className="flex items-baseline gap-2">
            <span className="font-display text-[20px] font-bold tracking-tight">HANAN</span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.26em] opacity-80 sm:inline">
              INGENIERIA
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[14px] font-semibold transition-colors"
                style={{ color: solid ? "var(--navy)" : "rgba(255,255,255,0.94)" }}
              >
                {t(l.key)}
                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-amber transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LangToggle lang={lang} setLang={setLang} solid={solid} />
            <a
              href="#contacto"
              className="hidden rounded-full bg-amber px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-amber-dark hover:shadow-md md:inline-flex"
            >
              {t("nav.cta")}
            </a>
            <button
              className="group relative z-[110] flex h-12 w-12 items-center justify-center rounded-full border bg-white/10 backdrop-blur-md transition-all lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={open}
              style={{
                borderColor: open ? "rgba(255,255,255,0.2)" : (solid ? "rgba(24, 36, 58, 0.12)" : "rgba(255,255,255,0.18)"),
                backgroundColor: open ? "rgba(255,255,255,0.1)" : (solid ? "rgba(255,255,255,0.8)" : "rgba(10, 20, 34, 0.3)"),
                color: open ? "white" : (solid ? "var(--navy)" : "white"),
              }}
            >
              <div className="relative h-5 w-6">
                <span
                  className={cn(
                    "absolute h-[2px] w-full bg-current transition-all duration-300 ease-out",
                    open ? "top-2.5 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute top-2.5 h-[2px] bg-current transition-all duration-200 ease-out",
                    open ? "w-0 opacity-0" : "w-full opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute h-[2px] w-full bg-current transition-all duration-300 ease-out",
                    open ? "top-2.5 -rotate-45" : "top-5"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-navy lg:hidden"
            style={{
              backgroundColor: "#0d141f",
              backgroundImage: "radial-gradient(circle at 50% -20%, #1f304b 0%, #0d141f 80%)",
            }}
          >
            {/* Ambient Watermark Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.03, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
            >
              <span className="font-display text-[20vw] font-bold tracking-tighter text-white">
                HANAN
              </span>
            </motion.div>

            {/* Background texture layer */}
            <div className="grain pointer-events-none absolute inset-0 opacity-[0.08]" />
            
            <div className="flex flex-1 flex-col justify-between overflow-y-auto px-8 pb-10 pt-28">
              <nav className="flex flex-col gap-6">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: 0.2 + i * 0.08,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative flex flex-col"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-display text-[11px] font-bold tracking-[0.3em] text-amber">
                        0{i + 1}
                      </span>
                      <div className="h-[1px] w-6 bg-white/10 transition-all group-hover:w-12 group-hover:bg-amber" />
                    </div>
                    <span className="font-display text-[44px] font-bold leading-tight tracking-tight text-white transition-all group-hover:translate-x-2 sm:text-[52px]">
                      {t(l.key)}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                className="mt-12 flex flex-col gap-8 rounded-[32px] border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl"
              >
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                      {lang === "es" ? "Sede Central" : "Headquarters"}
                    </p>
                    <p className="text-[13px] font-medium leading-relaxed text-white/70">
                      Miraflores, Lima<br />
                      Perú
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                      {lang === "es" ? "Conecta" : "Connect"}
                    </p>
                    <div className="flex gap-4">
                      {["LinkedIn", "Instagram"].map((social) => (
                        <a
                          key={social}
                          href="#"
                          className="text-[12px] font-bold text-white/50 transition-colors hover:text-amber"
                        >
                          {social === "LinkedIn" ? "LI" : "IN"}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-amber px-6 py-5 text-white transition-all hover:shadow-[0_20px_40px_-15px_rgba(231,146,30,0.4)]"
                >
                  <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-black/20 to-transparent transition-transform duration-300 group-hover:translate-y-0" />
                  <span className="relative z-10 font-display text-[18px] font-bold">
                    {t("nav.cta")}
                  </span>
                  <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-transform duration-300 group-hover:translate-x-2">
                    <ArrowRight size={18} />
                  </div>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LangToggle({
  lang,
  setLang,
  solid,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  solid: boolean;
}) {
  return (
    <div
      className="inline-grid grid-cols-2 items-center rounded-full border p-1"
      style={{
        borderColor: solid ? "rgba(24, 36, 58, 0.10)" : "rgba(255,255,255,0.14)",
        backgroundColor: solid ? "rgba(248, 250, 252, 0.96)" : "rgba(10, 20, 34, 0.38)",
        backdropFilter: "blur(14px) saturate(160%)",
        WebkitBackdropFilter: "blur(14px) saturate(160%)",
        boxShadow: solid
          ? "0 8px 18px -16px rgba(24, 36, 58, 0.34)"
          : "inset 0 0 0 1px rgba(255,255,255,0.03)",
      }}
      aria-label="Language selector"
    >
      {(["es", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className="min-w-[42px] rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200"
          style={{
            backgroundColor: lang === l ? "var(--amber)" : "transparent",
            color: lang === l
              ? "white"
              : solid
                ? "rgba(31, 48, 75, 0.74)"
                : "rgba(255,255,255,0.82)",
            boxShadow: lang === l ? "0 10px 18px -14px rgba(231, 146, 30, 0.9)" : "none",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
