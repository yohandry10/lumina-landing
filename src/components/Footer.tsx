import { motion } from "framer-motion";
import { Mail, ArrowRight, Globe, MessageCircle, Send } from "lucide-react";
import { useLanguage, type Lang } from "@/lib/language";
import { Logo } from "./Logo";
import { GOOGLE_MAPS_URL, MAP_SECTION_ID, WAZE_URL } from "../lib/location";

const SOCIAL_ICONS = [Globe, MessageCircle, Send, Mail] as const;
const SOCIAL_KEYS = ["linkedin", "whatsapp", "telegram", "email"] as const;
const MAP_ACTIONS = [
  { id: "google", href: GOOGLE_MAPS_URL, icon: "/maps.png" },
  { id: "waze", href: WAZE_URL, icon: "/waze.svg" },
] as const;

function getFooterHref(groupId: string, label: string) {
  if (groupId !== "contact") return "#";
  if (label.includes("@")) return `mailto:${label}`;
  if (label.startsWith("+")) return `tel:${label.replace(/\s+/g, "")}`;
  return null;
}

export function Footer() {
  const { lang, setLang, content } = useLanguage();
  const socialLabels = [
    content.footer.socialLabels.linkedin,
    content.footer.socialLabels.whatsapp,
    content.footer.socialLabels.telegram,
    content.footer.socialLabels.email,
  ];

  return (
    <footer style={{ background: "#0d141f" }} className="relative overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1f304b_0%,transparent_70%)] opacity-40" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="container-x relative z-10 py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.22fr)_repeat(3,minmax(0,1fr))] lg:gap-10">
          <div className="min-w-0">
            <div className="relative isolate inline-flex max-w-full">
              <div className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(231,146,30,0.2),transparent_62%)] opacity-75 blur-3xl" />
              <a
                href="#top"
                className="relative inline-flex w-full max-w-[300px] items-center overflow-hidden rounded-[22px] border border-white/75 bg-white px-3 py-3 text-navy shadow-[0_28px_70px_-34px_rgba(0,0,0,0.55)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,248,251,0.98))]" />
                <Logo
                  className="relative h-[78px] w-[250px] sm:h-[86px] sm:w-[272px]"
                  imageClassName="h-[212%] w-[212%] [filter:drop-shadow(0_10px_24px_rgba(15,23,42,0.12))]"
                />
              </a>
            </div>
            <p className="mt-5 max-w-[19rem] text-[14px] leading-relaxed text-white/60">
              {content.footer.brandDescription}
            </p>
            <div className="mt-8 flex gap-3">
              {SOCIAL_ICONS.map((Icon, index) => {
                const href =
                  SOCIAL_KEYS[index] === "email" ? "mailto:contacto@hananingenieria.com" : "#";

                return (
                  <a
                    key={SOCIAL_KEYS[index]}
                    href={href}
                    aria-label={socialLabels[index]}
                    className="group grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:border-amber/50 hover:bg-amber/10 hover:text-amber"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {content.footer.groups.map((group) => (
            <div key={group.id}>
              <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-amber">
                {group.title}
              </h4>
              <ul className="mt-6 space-y-4">
                {group.id === "contact" ? (
                  <li className="pt-2">
                    <a
                      href={`#${MAP_SECTION_ID}`}
                      className="group inline-flex flex-col items-start text-left text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-white"
                    >
                      <span className="inline-flex items-center text-[14px] font-medium">
                        {content.map.label}
                        <ArrowRight
                          size={12}
                          className="ml-0 w-0 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-3 group-hover:opacity-100 group-hover:text-amber"
                        />
                      </span>
                      <span className="mt-1 text-[13px] text-white/38">{content.map.sublabel}</span>
                    </a>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {MAP_ACTIONS.map(({ id, href, icon }) => {
                        const label =
                          id === "google"
                            ? content.footer.mapActions.google
                            : content.footer.mapActions.waze;

                        return (
                          <a
                            key={id}
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
                        );
                      })}
                    </div>
                  </li>
                ) : null}
                {group.links.map((label) => {
                  const href = getFooterHref(group.id, label);

                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          className="group inline-flex items-center text-[14px] text-white/50 transition-all duration-300 hover:translate-x-1 hover:text-white"
                        >
                          {label}
                          <ArrowRight
                            size={12}
                            className="ml-0 w-0 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-3 group-hover:opacity-100 group-hover:text-amber"
                          />
                        </a>
                      ) : (
                        <span className="inline-flex items-center text-[14px] text-white/50">
                          {label}
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
          <div className="space-y-2">
            <p className="text-[13px] text-white/40">
              © {new Date().getFullYear()} {content.footer.copyright}
            </p>
            <a
              href="mailto:elbuenpr@gmail.com"
              className="inline-flex text-[13px] text-white/40 transition-colors hover:text-white"
            >
              {content.footer.credit}
            </a>
          </div>
          <div className="flex items-center gap-6 text-[13px] text-white/40">
            <a href="#" className="hover:text-white transition-colors">
              {content.footer.privacy}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {content.footer.terms}
            </a>
            <FooterLangToggle
              lang={lang}
              setLang={setLang}
              ariaLabel={content.nav.languageSelector}
            />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterLangToggle({
  lang,
  setLang,
  ariaLabel,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  ariaLabel: string;
}) {
  return (
    <div
      className="inline-grid grid-cols-2 items-center rounded-full border p-1"
      style={{
        borderColor: "rgba(255,255,255,0.08)",
        backgroundColor: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(14px) saturate(160%)",
        WebkitBackdropFilter: "blur(14px) saturate(160%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
      }}
      aria-label={ariaLabel}
    >
      {(["es", "en"] as Lang[]).map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => setLang(value)}
          aria-pressed={lang === value}
          className="min-w-[42px] cursor-pointer rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200"
          style={{
            backgroundColor: lang === value ? "var(--amber)" : "transparent",
            color: lang === value ? "white" : "rgba(255,255,255,0.74)",
            boxShadow: lang === value ? "0 10px 18px -14px rgba(231, 146, 30, 0.9)" : "none",
          }}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
