import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage, type Lang } from "@/lib/language";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { SERVICE_ICONS, SERVICE_SLUGS, type ServiceId } from "@/lib/serviceData";

const links = [
  { href: "/#inicio", id: "home" },
  { href: "/#nosotros", id: "about" },
  { href: "/#servicios-menu", id: "services" },
  { href: "/proyectos", id: "projects" },
  { href: "/prensa", id: "press" },
  { href: "/#contacto", id: "contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();
  const { lang, setLang, content } = useLanguage();
  const headerHeightClass = "h-[82px] sm:h-[88px]";
  const menuTopClass = "top-[82px] sm:top-[88px]";
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

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

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
          <a href="/" className="flex items-center">
            <Logo
              className="h-[64px] w-[210px] sm:h-[72px] sm:w-[236px]"
              imageClassName="h-[228%] w-[228%]"
            />
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((l) => {
              if (l.id === "services") {
                return (
                  <div
                    key={l.href}
                    className="relative"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      type="button"
                      aria-expanded={dropdownOpen}
                      className="group relative flex items-center gap-1.5 text-[15.5px] font-bold tracking-[-0.01em] transition-colors"
                      style={{ color: solid ? "var(--navy)" : "rgba(255,255,255,0.94)" }}
                    >
                      {navLabels[l.id]}
                      <ChevronDown
                        size={15}
                        strokeWidth={2.5}
                        className={cn(
                          "transition-transform duration-200",
                          dropdownOpen && "rotate-180",
                        )}
                      />
                      <span className="absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-amber transition-transform duration-200 group-hover:scale-x-100" />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-3"
                        >
                          <div
                            className="overflow-hidden rounded-[16px] border border-border/60 bg-white shadow-[0_20px_50px_-14px_rgba(24,36,58,0.18)]"
                          >
                            <div className="h-[2px] w-full" style={{ background: "var(--gradient-accent)" }} />
                            <div className="p-2">
                              {content.services.items.map((service) => {
                                const Icon = SERVICE_ICONS[service.id as ServiceId];
                                const slug = SERVICE_SLUGS[service.id as ServiceId];

                                return (
                                  <a
                                    key={service.id}
                                    href={`/servicios/${slug}`}
                                    className="group/item flex items-center gap-3 rounded-[12px] px-3 py-2.5 transition-all duration-200 hover:bg-[color-mix(in_oklab,var(--accent)_6%,transparent)]"
                                  >
                                    <div
                                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover/item:scale-110"
                                      style={{
                                        background: "color-mix(in oklab, var(--accent) 10%, transparent)",
                                        color: "var(--accent)",
                                      }}
                                    >
                                      <Icon className="h-[15px] w-[15px]" strokeWidth={1.8} />
                                    </div>
                                    <span className="text-[13px] font-medium text-foreground/80 transition-colors group-hover/item:text-foreground">
                                      {service.title}
                                    </span>
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={l.href}
                  href={l.href}
                  className="group relative text-[15.5px] font-bold tracking-[-0.01em] transition-colors"
                  style={{ color: solid ? "var(--navy)" : "rgba(255,255,255,0.94)" }}
                >
                  {navLabels[l.id]}
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-amber transition-transform duration-200 group-hover:scale-x-100" />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LangToggle
              lang={lang}
              setLang={setLang}
              solid={solid}
              ariaLabel={content.nav.languageSelector}
            />
            <a
              href="/#contacto"
              className="hidden rounded-full bg-amber px-5 py-2.5 text-[14px] font-bold text-white shadow-sm transition-all hover:bg-amber-dark hover:shadow-md md:inline-flex"
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
            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: -14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed inset-x-0 bottom-0 ${menuTopClass} z-[90] flex flex-col overflow-hidden bg-white shadow-[0_-1px_0_rgba(24,36,58,0.06)] lg:hidden`}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" />
              <div className="pointer-events-none absolute inset-x-0 top-px h-[3px] bg-gradient-to-r from-transparent via-amber/80 to-transparent" />

              <div className="relative mx-auto flex h-full w-full max-w-[520px] flex-1 flex-col justify-between overflow-y-auto px-6 pb-[max(22px,env(safe-area-inset-bottom))] pt-6">
                <nav className="flex flex-col gap-2.5">
                {links.map((l, i) => {
                  if (l.id === "services") {
                    return (
                      <div key={l.href}>
                        <motion.button
                          type="button"
                          onClick={() => setMobileServicesOpen((v) => !v)}
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{
                            delay: 0.06 + i * 0.035,
                            duration: 0.34,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="group flex w-full items-center rounded-[18px] border border-transparent px-3 py-3.5 transition-all duration-300 active:scale-[0.98] active:border-amber/20 active:bg-amber/[0.07]"
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
                          <span className="flex-1 text-left text-[16px] font-bold tracking-tight text-foreground transition-colors group-active:text-accent">
                            {navLabels[l.id]}
                          </span>
                          <motion.span
                            animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown
                              size={15}
                              className="text-black/20 transition-all duration-300 group-active:text-accent"
                            />
                          </motion.span>
                        </motion.button>

                        <AnimatePresence initial={false}>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-1 pb-2 pl-12 pr-3">
                                {content.services.items.map((service) => {
                                  const Icon = SERVICE_ICONS[service.id as ServiceId];
                                  const slug = SERVICE_SLUGS[service.id as ServiceId];

                                  return (
                                    <a
                                      key={service.id}
                                      href={`/servicios/${slug}`}
                                      onClick={() => setOpen(false)}
                                      className="flex items-center gap-2.5 rounded-[12px] px-2.5 py-2 transition-colors active:bg-amber/[0.07]"
                                    >
                                      <Icon
                                        className="h-[14px] w-[14px] shrink-0"
                                        strokeWidth={1.8}
                                        style={{ color: "var(--accent)" }}
                                      />
                                      <span className="text-[13px] font-medium text-foreground/70">
                                        {service.title}
                                      </span>
                                    </a>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
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
                      className="group flex items-center rounded-[18px] border border-transparent px-3 py-3.5 transition-all duration-300 active:scale-[0.98] active:border-amber/20 active:bg-amber/[0.07]"
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
                      <span className="flex-1 text-[16px] font-bold tracking-tight text-foreground transition-colors group-active:text-accent">
                        {navLabels[l.id]}
                      </span>
                      <ArrowRight
                        size={15}
                        className="text-black/20 transition-all duration-300 group-active:translate-x-1 group-active:text-accent"
                      />
                    </motion.a>
                  );
                })}
                </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.27, duration: 0.38, ease: "easeOut" }}
                className="mt-10 flex flex-col gap-3 rounded-[22px] border border-black/[0.04] bg-navy/[0.035] p-2.5 shadow-[0_18px_44px_-34px_rgba(24,36,58,0.55)]"
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
                  href="/#contacto"
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
