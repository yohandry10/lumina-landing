export type ProjectCase = {
  slug: string;
  title: string;
  location: string;
  sector: string;
  img: string;
  summary: string;
  context: string;
  challenge: string;
  solution: string;
  scope: string[];
  results: string[];
  metrics: {
    label: string;
    value: string;
  }[];
};

export const projectCases: ProjectCase[] = [
  {
    slug: "diseno-relavera-mina-sur",
    title: "Diseño de relavera — Mina Sur",
    location: "Apurímac",
    sector: "Minería",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
    summary:
      "Evaluación técnica y diseño conceptual de una relavera para operación minera en sierra sur, priorizando estabilidad, drenaje y control ambiental.",
    context:
      "En proyectos mineros de Apurímac, la topografía accidentada, la estacionalidad de lluvias y la sensibilidad social exigen soluciones que integren seguridad geotécnica, operación responsable y claridad documental para revisión técnica.",
    challenge:
      "El principal reto fue ordenar criterios de diseño para una instalación expuesta a pendientes pronunciadas, variación hídrica estacional y exigencias de monitoreo permanente.",
    solution:
      "Se planteó una alternativa de disposición con zonificación geotécnica, sistema de drenaje, criterios de recrecimiento y lineamientos de instrumentación para control operativo.",
    scope: [
      "Revisión de información topográfica, geológica e hidrológica disponible.",
      "Definición de criterios de estabilidad física para etapa inicial y crecimiento.",
      "Planteamiento de drenaje superficial y manejo de aguas de contacto.",
      "Memoria técnica con recomendaciones para ingeniería de detalle.",
    ],
    results: [
      "Base técnica ordenada para evaluación interna y coordinación con especialistas.",
      "Identificación temprana de riesgos de filtración, erosión y estabilidad.",
      "Mejor trazabilidad de criterios para permisos, revisión técnica y toma de decisiones.",
    ],
    metrics: [
      { label: "Enfoque", value: "Geotecnia" },
      { label: "Entorno", value: "Sierra sur" },
      { label: "Prioridad", value: "Seguridad" },
    ],
  },
  {
    slug: "analisis-estabilidad-presa",
    title: "Análisis de estabilidad de presa",
    location: "Cusco",
    sector: "Geotecnia",
    img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1600&q=80",
    summary:
      "Diagnóstico geotécnico para revisar condiciones de estabilidad y comportamiento de una estructura de retención en zona altoandina.",
    context:
      "Las presas en la sierra peruana deben responder a cambios de nivel, lluvias intensas y variaciones de material, además de sostener operación segura durante periodos críticos.",
    challenge:
      "Se necesitaba una lectura clara del comportamiento estructural con información de campo limitada y condiciones variables de humedad.",
    solution:
      "Se consolidaron escenarios de análisis, parámetros conservadores y recomendaciones de control para reducir incertidumbre técnica antes de intervenciones mayores.",
    scope: [
      "Inspección visual y revisión de antecedentes técnicos.",
      "Identificación de mecanismos probables de falla.",
      "Evaluación de condiciones drenadas y no drenadas.",
      "Recomendaciones para monitoreo y mantenimiento preventivo.",
    ],
    results: [
      "Priorización de acciones correctivas según criticidad.",
      "Criterios técnicos para programar mantenimiento sin detener operación clave.",
      "Informe entendible para equipos técnicos, operadores y responsables de gestión.",
    ],
    metrics: [
      { label: "Riesgo", value: "Estabilidad" },
      { label: "Región", value: "Cusco" },
      { label: "Salida", value: "Informe" },
    ],
  },
  {
    slug: "modelamiento-hidraulico-fluvial",
    title: "Modelamiento hidráulico fluvial",
    location: "Apurímac",
    sector: "Hidrología",
    img: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1600&q=80",
    summary:
      "Modelamiento de cauce para estimar zonas de inundación, velocidades y niveles de agua en temporada de avenidas.",
    context:
      "En quebradas y ríos de Apurímac, los eventos de lluvia pueden activar crecidas rápidas que afectan caminos, defensas ribereñas, captaciones y áreas de expansión urbana.",
    challenge:
      "El proyecto requería traducir información hidrológica dispersa en criterios claros para diseño y prevención.",
    solution:
      "Se desarrolló un modelo hidráulico con escenarios de caudal, lectura de secciones críticas y recomendaciones para obras de protección y gestión de fajas marginales.",
    scope: [
      "Procesamiento de información topográfica e hidrológica.",
      "Definición de caudales de análisis por escenario.",
      "Identificación de puntos de desborde y erosión lateral.",
      "Recomendaciones para defensas, badenes y obras de cruce.",
    ],
    results: [
      "Mapa técnico de zonas vulnerables para priorización de intervención.",
      "Criterios de diseño para reducir exposición de infraestructura.",
      "Mejor soporte para coordinación con municipalidades y entidades sectoriales.",
    ],
    metrics: [
      { label: "Modelo", value: "Fluvial" },
      { label: "Uso", value: "Prevención" },
      { label: "Clima", value: "Avenidas" },
    ],
  },
  {
    slug: "supervision-obra-vial",
    title: "Supervisión de obra vial",
    location: "Andahuaylas",
    sector: "Construcción",
    img: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1600&q=80",
    summary:
      "Acompañamiento técnico para control de calidad, avance físico y cumplimiento de especificaciones en una intervención vial.",
    context:
      "La infraestructura vial provincial exige control permanente porque las condiciones de cantera, clima y logística impactan directamente en plazo, costo y seguridad.",
    challenge:
      "El frente de obra requería decisiones rápidas sin perder trazabilidad documental ni control de calidad.",
    solution:
      "Se ordenó una rutina de supervisión con reportes, verificación de metrados, control de materiales y coordinación diaria con residencia de obra.",
    scope: [
      "Control de avance físico y compatibilidad con expediente técnico.",
      "Verificación de materiales, compactación y procesos constructivos.",
      "Registro fotográfico y reportes de campo.",
      "Alertas tempranas sobre interferencias y desviaciones.",
    ],
    results: [
      "Mejor control de partidas críticas y reducción de retrabajos.",
      "Información clara para valorizaciones y toma de decisiones.",
      "Coordinación más fluida entre supervisión, contratista y entidad.",
    ],
    metrics: [
      { label: "Control", value: "Calidad" },
      { label: "Zona", value: "Andahuaylas" },
      { label: "Gestión", value: "Obra" },
    ],
  },
  {
    slug: "catastro-fotogrametria",
    title: "Catastro y fotogrametría",
    location: "Abancay",
    sector: "Geográfica",
    img: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1600&q=80",
    summary:
      "Levantamiento geoespacial para actualizar información territorial, identificar ocupación y producir insumos cartográficos confiables.",
    context:
      "En ciudades intermedias como Abancay, contar con cartografía actualizada permite mejorar la gestión urbana, ordenar inversiones y reducir conflictos por información imprecisa.",
    challenge:
      "El área de trabajo mezclaba pendientes, expansión urbana y referencias prediales heterogéneas.",
    solution:
      "Se combinó captura fotogramétrica, control en campo y procesamiento GIS para generar productos técnicos utilizables por equipos de gestión y diseño.",
    scope: [
      "Plan de vuelo y captura de imágenes de alta resolución.",
      "Puntos de control y validación de campo.",
      "Ortomosaico, modelos de superficie e información vectorial.",
      "Entrega de capas organizadas para uso técnico e institucional.",
    ],
    results: [
      "Base cartográfica más precisa para planeamiento e ingeniería.",
      "Reducción de vacíos de información en zonas de expansión.",
      "Insumos listos para expedientes, catastro y análisis territorial.",
    ],
    metrics: [
      { label: "Producto", value: "GIS" },
      { label: "Ciudad", value: "Abancay" },
      { label: "Captura", value: "Drone" },
    ],
  },
  {
    slug: "estudio-hidrogeologico",
    title: "Estudio hidrogeológico",
    location: "Ayacucho",
    sector: "Hidrogeología",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    summary:
      "Caracterización hidrogeológica para evaluar disponibilidad, vulnerabilidad y condiciones de aprovechamiento de agua subterránea.",
    context:
      "En zonas altoandinas de Ayacucho, el agua subterránea puede ser clave para consumo, riego o soporte productivo, pero requiere evaluación responsable para evitar sobreexplotación.",
    challenge:
      "El equipo debía interpretar condiciones de recarga, litología y flujo con información parcial y alta sensibilidad social sobre el uso del agua.",
    solution:
      "Se definió un modelo conceptual hidrogeológico, zonas de interés, riesgos de vulnerabilidad y recomendaciones para monitoreo y aprovechamiento sostenible.",
    scope: [
      "Reconocimiento hidrogeológico y revisión de fuentes existentes.",
      "Caracterización de unidades permeables y zonas de recarga.",
      "Análisis de vulnerabilidad y condiciones de uso.",
      "Recomendaciones para monitoreo, captación y gestión preventiva.",
    ],
    results: [
      "Modelo conceptual claro para decisiones de inversión y permisos.",
      "Identificación de zonas con mayor potencial y restricciones.",
      "Criterios para proteger fuentes y sostener disponibilidad en el tiempo.",
    ],
    metrics: [
      { label: "Recurso", value: "Agua" },
      { label: "Región", value: "Ayacucho" },
      { label: "Criterio", value: "Sostenible" },
    ],
  },
];

export function getProjectCase(slug: string) {
  return projectCases.find((project) => project.slug === slug);
}
