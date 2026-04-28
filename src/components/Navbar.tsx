import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage, type Lang } from "@/lib/language";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const links = [
  { href: "#inicio", id: "home" },
  { href: "#nosotros", id: "about" },
  { href: "#servicios", id: "services" },
  { href: "#proyectos", id: "projects" },
  { href: "/prensa", id: "press" },
  { href: "#contacto", id: "contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, content } = useLanguage();
  const headerHeightClass = "h-[82px] sm:h-[88px]";
  const menuTopClass = "top-[94px] sm:top-[100px]";
  const navLabels = {
    home: content.nav.home,
    about: content.nav.about,
    services: content.nav.services,
    projects: content.nav.projects,
    press: content.nav.press,
    contact: content.nav.contact,
  } as const;

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

  const solid = true;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100] border-b border-black/6 transition-[background,box-shadow,color,backdrop-filter] duration-300"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "saturate(180%) blur(16px)",
          WebkitBackdropFilter: "saturate(180%) blur(16px)",
          boxShadow: open
            ? "0 18px 44px -30px rgba(24, 36, 58, 0.35)"
            : scrolled
              ? "0 18px 36px -28px rgba(24, 36, 58, 0.28)"
              : "0 10px 24px -26px rgba(24, 36, 58, 0.2)",
          color: "var(--navy)",
          textShadow: "none",
        }}
      >
        <div
          className={`mx-auto flex max-w-[1320px] items-center justify-between px-6 md:px-10 lg:px-12 ${headerHeightClass}`}
        >
          <a href="#inicio" className="flex items-center">
            <Logo
              className="h-[64px] w-[210px] sm:h-[72px] sm:w-[236px]"
              imageClassName="h-[228%] w-[228%]"
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[14px] font-semibold transition-colors"
                style={{ color: solid ? "var(--navy)" : "rgba(255,255,255,0.94)" }}
              >
                {navLabels[l.id]}
                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-amber transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LangToggle
              lang={lang}
              setLang={setLang}
              solid={solid}
              ariaLabel={content.nav.languageSelector}
            />
            <a
              href="#contacto"
              className="hidden rounded-full bg-amber px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-amber-dark hover:shadow-md md:inline-flex"
            >
              {content.nav.cta}
            </a>
            <button
              className="group relative z-[110] flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 active:scale-95 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={content.nav.menuLabel}
              aria-expanded={open}
              style={{
                borderColor: open
                  ? "rgba(231, 146, 30, 0.28)"
                  : solid
                    ? "rgba(24, 36, 58, 0.12)"
                    : "rgba(255,255,255,0.18)",
                backgroundColor: open
                  ? "rgba(255,255,255,0.98)"
                  : solid
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(10, 20, 34, 0.3)",
                color: open ? "var(--navy)" : solid ? "var(--navy)" : "white",
                boxShadow: open
                  ? "0 14px 30px -18px rgba(24, 36, 58, 0.55), inset 0 0 0 1px rgba(231, 146, 30, 0.08)"
                  : "0 10px 22px -18px rgba(24, 36, 58, 0.45)",
              }}
            >
              <div className="relative flex h-[18px] w-[18px] flex-col items-center justify-between">
                <span
                  className={cn(
                    "absolute left-0 h-[2px] w-full origin-center rounded-full bg-current transition-all duration-300 ease-out",
                    open ? "top-2 rotate-45 scale-x-110" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-2 h-[2px] rounded-full bg-current transition-all duration-200 ease-out",
                    open ? "w-0 opacity-0" : "w-full opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-[2px] w-full origin-center rounded-full bg-current transition-all duration-300 ease-out",
                    open ? "top-2 -rotate-45 scale-x-110" : "top-4",
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>
      <div aria-hidden="true" className={headerHeightClass} />

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label={content.nav.menuLabel}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[80] bg-navy/45 backdrop-blur-[5px] lg:hidden"
            />
            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: -20, scale: 0.96, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, scale: 0.97, filter: "blur(8px)" }}
              transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed inset-x-4 ${menuTopClass} z-[90] flex max-h-[min(520px,calc(100dvh-122px))] flex-col overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_34px_90px_-44px_rgba(6,14,25,0.88)] lg:hidden`}
            >
              <div className="pointer-events-none absolute inset-x-5 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-transparent via-amber to-transparent" />
              <div className="relative mx-auto mt-3 h-1 w-10 rounded-full bg-black/10" />

              <div className="relative flex flex-1 flex-col overflow-y-auto px-4 pb-4 pt-3">
                <nav className="flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{
                      delay: 0.06 + i * 0.035,
                      duration: 0.34,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group flex items-center rounded-[18px] border border-transparent px-3 py-2.5 transition-all duration-300 active:scale-[0.98] active:border-amber/20 active:bg-amber/[0.07]"
                  >
                    <span
                      className="mr-3 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black tabular-nums"
                      style={{
                        background: "color-mix(in oklab, var(--accent) 10%, white)",
                        color: "var(--accent)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="flex-1 text-[15px] font-semibold tracking-tight text-foreground transition-colors group-active:text-accent">
                      {navLabels[l.id]}
                    </span>
                    <ArrowRight
                      size={15}
                      className="text-black/20 transition-all duration-300 group-active:translate-x-1 group-active:text-accent"
                    />
                  </motion.a>
                ))}
                </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.27, duration: 0.38, ease: "easeOut" }}
                className="mt-3 flex flex-col gap-3 rounded-[20px] bg-navy/[0.035] p-2.5"
              >
                <div className="flex items-center justify-between rounded-2xl border border-black/[0.05] bg-white px-3.5 py-2.5">
                  <div className="flex flex-col">
                    <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-foreground/35">
                      {content.nav.mobileLocationLabel}
                    </p>
                    <p className="text-[12px] font-semibold text-foreground/70">
                      {content.nav.mobileLocationCity}, {content.nav.mobileLocationCountry}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {content.nav.mobileSocials.map((social) => (
                      <a
                        key={social.label}
                        href="#"
                        aria-label={social.label}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-black/8 text-[10px] font-bold text-foreground/40 transition-colors hover:border-accent/30 hover:text-accent"
                      >
                        {social.short}
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-white shadow-[0_16px_34px_-20px_rgba(231,146,30,0.9)] transition-all duration-300 active:scale-[0.99] hover:shadow-[0_12px_28px_-8px_rgba(231,146,30,0.5)]"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  <span className="text-[14px] font-bold">
                    {content.nav.cta}
                  </span>
                  <ArrowRight size={15} />
                </a>
              </motion.div>
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function LangToggle({
  lang,
  setLang,
  solid,
  ariaLabel,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  solid: boolean;
  ariaLabel: string;
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
      aria-label={ariaLabel}
    >
      {(["es", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className="min-w-[42px] rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200"
          style={{
            backgroundColor: lang === l ? "var(--amber)" : "transparent",
            color:
              lang === l ? "white" : solid ? "rgba(31, 48, 75, 0.74)" : "rgba(255,255,255,0.82)",
            boxShadow: lang === l ? "0 10px 18px -14px rgba(231, 146, 30, 0.9)" : "none",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
