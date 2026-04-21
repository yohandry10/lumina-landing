import { motion } from "framer-motion";
import { Mail, ArrowRight, Globe, MessageCircle, Send } from "lucide-react";
import { Logo } from "./Logo";

const GROUPS = [
  {
    title: "Servicios",
    links: ["Diseño civil e hidráulico", "Geotecnia", "Hidrología", "Hidrogeología", "Ambiental"],
  },
  {
    title: "Empresa",
    links: ["Nosotros", "Misión y visión", "Sectores", "Proyectos", "Trabaja con nosotros"],
  },
  {
    title: "Contacto",
    links: ["Abancay, Apurímac", "+51 000 000 000", "informes@hananingenieria.com", "Lun – Vie 8:00 – 18:00"],
  },
];

const SOCIAL = [
  { Icon: Globe, href: "#", label: "LinkedIn" },
  { Icon: MessageCircle, href: "#", label: "WhatsApp" },
  { Icon: Send, href: "#", label: "Telegram" },
  { Icon: Mail, href: "mailto:informes@hananingenieria.com", label: "Email" },
];

export function Footer() {
  return (
    <footer style={{ background: "#0d141f" }} className="relative overflow-hidden text-white">
      {/* Subtle radial glow to tie in with the menu style */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1f304b_0%,transparent_70%)] opacity-40" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="container-x relative z-10 py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand col */}
          <div>
            <a href="#top" className="flex items-center gap-2.5 text-white">
              <Logo size={28} />
              <span className="font-display text-[20px] font-bold tracking-tight">
                HANAN <span className="text-amber">INGENIERÍA</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/60">
              Soluciones técnicas e innovadoras a problemas complejos de construcción y minería.
              Desde Apurímac, al servicio del Perú.
            </p>
            <div className="mt-8 flex gap-3">
              {SOCIAL.map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="group grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:border-amber/50 hover:bg-amber/10 hover:text-amber"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {GROUPS.map((g) => (
            <div key={g.title}>
              <h4
                className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-amber"
              >
                {g.title}
              </h4>
              <ul className="mt-6 space-y-4">
                {g.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="group inline-flex items-center text-[14px] text-white/50 transition-all duration-300 hover:translate-x-1 hover:text-white"
                    >
                      {l}
                      <ArrowRight
                        size={12}
                        className="ml-0 w-0 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-3 group-hover:opacity-100 group-hover:text-amber"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/5 pt-10 sm:flex-row sm:items-center"
        >
          <p className="text-[13px] text-white/40">
            © {new Date().getFullYear()} Hanan Ingeniería S.A.C. — Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-[13px] text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[11px] font-bold text-white/60">
              <span className="text-amber">ES</span>
              <span className="opacity-20">/</span>
              <span>EN</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
