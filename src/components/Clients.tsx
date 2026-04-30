import { motion } from "framer-motion";
import { Section, SectionHeading, itemVariants } from "./Section";
import { useLanguage } from "@/lib/language";

const CLIENT_LOGOS = [
  { src: "/logos/autlan.png", name: "Autlan" },
  { src: "/logos/barrick.png", name: "Barrick" },
  { src: "/logos/codelco.png", name: "Codelco" },
  { src: "/logos/collahuasi.png", name: "Collahuasi" },
  { src: "/logos/descarga.png", name: "Cliente" },
  { src: "/logos/eramet.png", name: "Eramet" },
  { src: "/logos/fmc.png", name: "FMC" },
  { src: "/logos/minsur.png", name: "Minsur" },
  { src: "/logos/orla.png", name: "Orla" },
  { src: "/logos/pe%C3%B1a.png", name: "Peña" },
  { src: "/logos/pe%C3%B1oles.png", name: "Peñoles" },
  { src: "/logos/posco.svg", name: "Posco" },
  { src: "/logos/raura.png", name: "Raura" },
  { src: "/logos/riotinto.png", name: "Rio Tinto" },
  { src: "/logos/tecpetrol.png", name: "Tecpetrol" },
  { src: "/logos/yanacocha.png", name: "Yanacocha" },
  { src: "/logos/ypf.png", name: "YPF" },
  { src: "/logos/zijin.png", name: "Zijin" },
] as const;

export function Clients() {
  const { lang } = useLanguage();
  const copy =
    lang === "es"
      ? {
          overline: "Confianza técnica",
          title: "Nuestros clientes",
          subtitle:
            "Acompañamos proyectos para compañías de minería, energía e infraestructura con soporte técnico especializado.",
        }
      : {
          overline: "Technical trust",
          title: "Our clients",
          subtitle:
            "We support mining, energy and infrastructure projects with specialized technical expertise.",
        };

  return (
    <Section id="clientes" className="overflow-hidden bg-[color:var(--deep)]">
      <SectionHeading overline={copy.overline} title={copy.title} subtitle={copy.subtitle} />

      <div className="relative mt-12 -mx-4 overflow-hidden py-2 sm:-mx-8 lg:-mx-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[color:var(--deep)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[color:var(--deep)] to-transparent" />

        <div className="clients-marquee flex w-max gap-3 will-change-transform">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="flex h-[86px] w-[166px] shrink-0 items-center justify-center rounded-[4px] border border-border/45 bg-white px-5 shadow-sm"
            >
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                className="max-h-[54px] max-w-[128px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
