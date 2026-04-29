import {
  HardHat,
  Droplets,
  Mountain,
  Compass,
  Waves,
  Map,
  Leaf,
  type LucideIcon,
} from "lucide-react";

export type ServiceId =
  | "civilHydraulic"
  | "hydrologicalStudies"
  | "geotechnics"
  | "generalWorks"
  | "hydrogeologicalStudies"
  | "geographicEngineering"
  | "environmentalEngineering";

export const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  civilHydraulic: HardHat,
  hydrologicalStudies: Droplets,
  geotechnics: Mountain,
  generalWorks: Compass,
  hydrogeologicalStudies: Waves,
  geographicEngineering: Map,
  environmentalEngineering: Leaf,
};

export const SERVICE_SLUGS: Record<ServiceId, string> = {
  civilHydraulic: "diseno-civil-hidraulico",
  hydrologicalStudies: "estudios-hidrologicos",
  geotechnics: "geotecnia",
  generalWorks: "obras-servicios-generales",
  hydrogeologicalStudies: "estudios-hidrogeologicos",
  geographicEngineering: "ingenieria-geografica",
  environmentalEngineering: "ingenieria-ambiental",
};

const SLUG_TO_ID = Object.fromEntries(
  Object.entries(SERVICE_SLUGS).map(([id, slug]) => [slug, id]),
) as Record<string, ServiceId>;

export function getServiceIdBySlug(slug: string): ServiceId | undefined {
  return SLUG_TO_ID[slug];
}

export function getServiceSlug(id: ServiceId): string {
  return SERVICE_SLUGS[id];
}

export function getServiceIcon(id: ServiceId): LucideIcon {
  return SERVICE_ICONS[id];
}
