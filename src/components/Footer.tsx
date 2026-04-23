import { motion } from "framer-motion";
import { Mail, ArrowRight, Globe, MessageCircle, Send } from "lucide-react";
import { Logo } from "./Logo";
import {
  GOOGLE_MAPS_URL,
  MAP_LABEL,
  MAP_SECTION_ID,
  MAP_SUBLABEL,
  WAZE_URL,
} from "../lib/location";

const GROUPS = [
  {
    title: "Servicios",
    links: ["Geotecnia", "Hidrología", "Hidrogeología", "Ambiental"],
  },
  {
    title: "Empresa",
    links: ["Nosotros", "Misión y visión", "Sectores", "Proyectos", "Trabaja con nosotros"],
  },
  {
    title: "Contacto",
    links: ["+51 000 000 000", "informes@hananingenieria.com", "Lun – Vie 8:00 – 18:00"],
  },
];

const SOCIAL = [
  { Icon: Globe, href: "#", label: "LinkedIn" },
  { Icon: MessageCircle, href: "#", label: "WhatsApp" },
  { Icon: Send, href: "#", label: "Telegram" },
  { Icon: Mail, href: "mailto:informes@hananingenieria.com", label: "Email" },
];

const MAP_ACTIONS = [
  {
    label: "Google Maps",
    href: GOOGLE_MAPS_URL,
    icon: "/maps.png",
  },
  {
    label: "Waze",
    href: WAZE_URL,
    icon: "/waze.svg",
  },
];

function getFooterHref(groupTitle: string, label: string) {
  if (groupTitle !== "Contacto") return "#";
  if (label.includes("@")) return `mailto:${label}`;
  if (label.startsWith("+")) return `tel:${label.replace(/\s+/g, "")}`;
  return null;
}

export function Footer() {
  return (
    <footer style={{ background: "#0d141f" }} className="relative overflow-hidden text-white">
      {/* Subtle radial glow to tie in with the menu style */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1f304b_0%,transparent_70%)] opacity-40" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="container-x relative z-10 py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.22fr)_repeat(3,minmax(0,1fr))] lg:gap-10">
          {/* Brand col */}
          <div className="min-w-0">
            <div className="relative isolate inline-flex max-w-full">
              <div className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(231,146,30,0.2),transparent_62%)] opacity-75 blur-3xl" />
              <a
                href="#top"
                className="relative inline-flex w-full max-w-[300px] items-center overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.05] px-3 py-3 text-white shadow-[0_30px_70px_-42px_rgba(0,0,0,0.95)] backdrop-blur-xl"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.12),transparent_68%)]" />
                <Logo
                  className="relative h-[78px] w-[250px] sm:h-[86px] sm:w-[272px]"
                  imageClassName="h-[216%] w-[216%] [filter:brightness(1.42)_contrast(1.06)_saturate(1.08)_drop-shadow(0_0_26px_rgba(231,146,30,0.22))]"
                />
              </a>
            </div>
            <p className="mt-5 max-w-[19rem] text-[14px] leading-relaxed text-white/60">
              Soluciones de ingeniería avanzadas e innovadoras para los desafíos más complejos de la
              construcción y la minería, aportando excelencia técnica al desarrollo del Perú.
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
              <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-amber">
                {g.title}
              </h4>
              <ul className="mt-6 space-y-4">
                {g.title === "Contacto" ? (
                  <li className="pt-2">
                    <a
                      href={`#${MAP_SECTION_ID}`}
                      className="group inline-flex flex-col items-start text-left text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-white"
                    >
                      <span className="inline-flex items-center text-[14px] font-medium">
                        {MAP_LABEL}
                        <ArrowRight
                          size={12}
                          className="ml-0 w-0 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-3 group-hover:opacity-100 group-hover:text-amber"
                        />
                      </span>
                      <span className="mt-1 text-[13px] text-white/38">{MAP_SUBLABEL}</span>
                    </a>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {MAP_ACTIONS.map(({ label, href, icon }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[12px] font-semibold text-white/68 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/45 hover:bg-white/[0.08] hover:text-white"
                        >
                          <span className="grid h-6 w-6 place-items-center rounded-full bg-white">
                            <img src={icon} alt={label} className="h-3.5 w-3.5" loading="lazy" />
                          </span>
                          {label}
                        </a>
                      ))}
                    </div>
                  </li>
                ) : null}
                {g.links.map((l) => {
                  const href = getFooterHref(g.title, l);

                  return (
                    <li key={l}>
                      {href ? (
                        <a
                          href={href}
                          className="group inline-flex items-center text-[14px] text-white/50 transition-all duration-300 hover:translate-x-1 hover:text-white"
                        >
                          {l}
                          <ArrowRight
                            size={12}
                            className="ml-0 w-0 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-3 group-hover:opacity-100 group-hover:text-amber"
                          />
                        </a>
                      ) : (
                        <span className="inline-flex items-center text-[14px] text-white/50">
                          {l}
                        </span>
                      )}
                    </li>
                  );
                })}
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
            <a href="#" className="hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Términos
            </a>
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
