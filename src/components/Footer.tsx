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
    <footer style={{ background: "var(--deep)" }} className="border-t border-border">
      <div className="container-x py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand col */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <Logo size={28} />
              <span className="font-display text-[18px] font-bold tracking-tight">
                Hanan <span className="text-gradient">Ingeniería</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted-foreground">
              Soluciones técnicas e innovadoras a problemas complejos de construcción y minería.
              Desde Apurímac, al servicio del Perú.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL.map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="group grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-[color-mix(in_oklab,var(--accent)_50%,transparent)] hover:bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] hover:text-[color:var(--accent)]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {GROUPS.map((g) => (
            <div key={g.title}>
              <h4
                className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: "var(--accent)" }}
              >
                {g.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {g.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="group inline-flex items-center text-[14px] text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:text-foreground"
                    >
                      {l}
                      <ArrowRight
                        size={12}
                        className="ml-0 w-0 opacity-0 transition-all duration-200 group-hover:ml-1.5 group-hover:w-3 group-hover:opacity-100"
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
          className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center"
        >
          <p className="text-[13px] text-muted-foreground">
            © {new Date().getFullYear()} Hanan Ingeniería S.A.C. — Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-[13px] text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacidad</a>
            <span className="opacity-30">·</span>
            <a href="#" className="hover:text-foreground">Términos</a>
            <span className="opacity-30">·</span>
            <span>ES / EN</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
