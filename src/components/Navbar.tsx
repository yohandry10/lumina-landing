import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Logo } from "./Logo";

const LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Sectores", href: "#sectores" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.0, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 h-16 transition-[background,backdrop-filter,border-color] duration-300 ${
          scrolled ? "glass-nav" : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-full items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <Logo size={28} />
            <span
              className="font-display text-[18px] font-bold tracking-tight"
              style={{ color: scrolled ? "var(--foreground)" : "#ffffff" }}
            >
              Hanan <span style={{ color: "var(--accent)" }}>Ingeniería</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[14px] font-medium transition-colors"
                style={{
                  color: scrolled
                    ? "var(--muted-foreground)"
                    : "rgba(255,255,255,0.78)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = scrolled
                    ? "var(--foreground)"
                    : "#ffffff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = scrolled
                    ? "var(--muted-foreground)"
                    : "rgba(255,255,255,0.78)";
                }}
              >
                {l.label}
                <span
                  className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ background: "var(--accent)" }}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contacto" className="btn-pill btn-primary hidden md:inline-flex !py-2.5 !px-5 !text-[13px]">
              Cotizar proyecto
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className="relative grid h-10 w-10 place-items-center rounded-full border md:hidden"
              style={{
                borderColor: scrolled ? "var(--color-border)" : "rgba(255,255,255,0.25)",
              }}
            >
              <motion.span
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                className="absolute h-px w-5"
                style={{ background: scrolled ? "var(--foreground)" : "#ffffff" }}
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="absolute h-px w-5"
                style={{ background: scrolled ? "var(--foreground)" : "#ffffff" }}
              />
              <motion.span
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                className="absolute h-px w-5"
                style={{ background: scrolled ? "var(--foreground)" : "#ffffff" }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 backdrop-blur-xl md:hidden"
            style={{ background: "oklch(1 0 0 / 0.97)" }}
          >
            <div className="container-x flex h-full flex-col justify-center gap-6">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  className="font-display text-[28px] font-bold text-foreground"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + LINKS.length * 0.06, duration: 0.4 }}
                className="btn-pill btn-primary mt-4 w-fit"
              >
                Cotizar proyecto
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
{ /* tanstack Link kept imported intentionally to satisfy potential routing */ }
void Link;
