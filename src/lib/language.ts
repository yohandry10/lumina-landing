import { useEffect, useSyncExternalStore } from "react";

export type Lang = "es" | "en";

const STORAGE_KEY = "lumina-lang";
let currentLang: Lang = "es";
const listeners = new Set<() => void>();

const translations: Record<Lang, Record<string, string>> = {
  es: {
    "nav.home": "Inicio",
    "nav.about": "Nosotros",
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.cta": "Solicitar cotizacion",
    "hero.eyebrow": "Ingenieria civil y mineria - Apurimac, Peru",
    "hero.title.1": "Ingenieria que",
    "hero.title.2a": "construye",
    "hero.title.2b": "",
    "hero.subtitle": "Soluciones especializadas en ingenieria para el rubro civil y minero.",
    "hero.cta.services": "Ver nuestros servicios",
    "hero.cta.contact": "Contactenos",
    "hero.scroll": "Descubre mas",
    "stats.projects": "Proyectos ejecutados",
    "stats.years": "Anos de experiencia",
    "stats.specs": "Especialidades tecnicas",
    "stats.region": "Region Apurimac & mas",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.cta": "Request a quote",
    "hero.eyebrow": "Civil and mining engineering - Apurimac, Peru",
    "hero.title.1": "Engineering that",
    "hero.title.2a": "builds",
    "hero.title.2b": "",
    "hero.subtitle": "Specialized engineering solutions for the civil and mining sector.",
    "hero.cta.services": "View our services",
    "hero.cta.contact": "Contact us",
    "hero.scroll": "Discover more",
    "stats.projects": "Projects delivered",
    "stats.years": "Years of experience",
    "stats.specs": "Technical specialties",
    "stats.region": "Apurimac region & more",
  },
};

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function isLang(value: string | null): value is Lang {
  return value === "es" || value === "en";
}

function readStoredLang(): Lang | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return isLang(raw) ? raw : null;
  } catch {
    return null;
  }
}

function setGlobalLang(nextLang: Lang) {
  if (nextLang === currentLang) return;

  currentLang = nextLang;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLang);
    } catch {
      // Ignore storage write issues (private mode, policies, etc.).
    }
  }

  emitChange();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return currentLang;
}

export function useLanguage() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  useEffect(() => {
    const stored = readStoredLang();
    if (stored && stored !== currentLang) {
      currentLang = stored;
      emitChange();
    }
  }, []);

  const t = (key: string) => translations[lang][key] ?? translations.es[key] ?? key;

  return {
    lang,
    setLang: setGlobalLang,
    t,
  };
}
