import { useEffect, useSyncExternalStore } from "react";

export type Lang = "es" | "en";

type ServiceId =
  | "civilHydraulic"
  | "hydrologicalStudies"
  | "geotechnics"
  | "generalWorks"
  | "hydrogeologicalStudies"
  | "geographicEngineering"
  | "environmentalEngineering";

type ValueId =
  | "compliance"
  | "responsibility"
  | "efficiency"
  | "ethics"
  | "innovation"
  | "commitment";
type ContactCardId = "office" | "phone" | "email";
type FooterGroupId = "services" | "company" | "contact";

type ServiceItem = {
  id: ServiceId;
  title: string;
  desc: string;
  bullets: string[];
};

type ValueItem = {
  id: ValueId;
  label: string;
};

type ProjectItem = {
  title: string;
  location: string;
  sector: string;
  img: string;
};

type ContactCard = {
  id: ContactCardId;
  title: string;
  lines: string[];
};

type FooterGroup = {
  id: FooterGroupId;
  title: string;
  links: string[];
};

type PressNote = {
  date: string;
  tag: string;
  title: string;
  summary: string;
  img: string;
};

type SiteContent = {
  meta: {
    homeTitle: string;
    homeDescription: string;
    pressTitle: string;
    pressDescription: string;
    servicesTitle: string;
    servicesDescription: string;
    projectsTitle: string;
    projectsDescription: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    press: string;
    contact: string;
    cta: string;
    mobileLocationLabel: string;
    mobileLocationCity: string;
    mobileLocationCountry: string;
    mobileConnect: string;
    mobileSocials: {
      label: string;
      short: string;
    }[];
    menuLabel: string;
    languageSelector: string;
  };
  hero: {
    eyebrow: string;
    slides: {
      titleLine1: string;
      titleHighlight: string;
      titleLine2: string;
      subtitle: string;
    }[];
    ctaServices: string;
    ctaContact: string;
    scroll: string;
  };
  services: {
    overline: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
    items: ServiceItem[];
    showMore: string;
    showLess: string;
    customTitle: string;
    customSubtitle: string;
    customCta: string;
  };
  about: {
    overline: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    body: string;
    missionTitle: string;
    missionBody: string[];
    visionTitle: string;
    visionBody: string[];
    sectorsTitle: string;
    sectors: string[];
    values: ValueItem[];
    imageAlt: string;
  };
  projects: {
    overline: string;
    title: string;
    subtitle: string;
    previousAria: string;
    nextAria: string;
    caseStudyCta: string;
    dotAriaPrefix: string;
    items: ProjectItem[];
  };
  parallax: {
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
    cta: string;
  };
  contact: {
    overline: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
    cards: ContactCard[];
    serviceOptions: string[];
    form: {
      overline: string;
      intro: string;
      nameLabel: string;
      namePlaceholder: string;
      companyLabel: string;
      companyPlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      serviceLabel: string;
      messageLabel: string;
      messagePlaceholder: string;
      privacy: string;
      submit: string;
      sent: string;
    };
  };
  map: {
    sectionAria: string;
    iframeTitle: string;
    label: string;
    sublabel: string;
  };
  footer: {
    groups: FooterGroup[];
    brandDescription: string;
    socialLabels: {
      linkedin: string;
      whatsapp: string;
      telegram: string;
      email: string;
    };
    mapActions: {
      google: string;
      waze: string;
    };
    copyright: string;
    credit: string;
    privacy: string;
    terms: string;
  };
  preloader: {
    location: string;
    topStatus: {
      survey: string;
      lock: string;
      out: string;
    };
    stageLabel: {
      survey: string;
      lock: string;
      out: string;
    };
    disciplines: string[];
    progressLabel: string;
    phases: string[];
    frontTag: string;
    readyTag: string;
  };
  servicePage: {
    backToServices: string;
    otherServices: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaCta: string;
    viewService: string;
  };
  press: {
    backHome: string;
    overline: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
    readMore: string;
    notes: PressNote[];
  };
};

const STORAGE_KEY = "lumina-lang";
let currentLang: Lang = "es";
const listeners = new Set<() => void>();

const siteContent: Record<Lang, SiteContent> = {
  es: {
    meta: {
      homeTitle: "Hanan Ingeniería — Soluciones de ingeniería civil y minera",
      homeDescription:
        "Hanan Ingeniería: geotecnia, hidrología, hidrogeología y gestión ambiental para proyectos de construcción y minería en el Perú. Desde Apurímac al país.",
      pressTitle: "Hanan Ingeniería — Notas de prensa",
      pressDescription:
        "Información actualizada sobre proyectos, logros institucionales y participación de Hanan Ingeniería en el sector de ingeniería civil y minera en el Perú.",
      servicesTitle: "Hanan Ingeniería — Servicios especializados",
      servicesDescription:
        "Servicios especializados en ingeniería civil, hidrología, geotecnia, hidrogeología, ingeniería geográfica y ambiental para proyectos de construcción y minería.",
      projectsTitle: "Hanan Ingeniería — Proyectos",
      projectsDescription:
        "Casos de estudio y proyectos realizados en ingeniería civil, minería, hidrología, geotecnia e infraestructura en Apurímac y el Perú.",
    },
    nav: {
      home: "Inicio",
      about: "Nosotros",
      services: "Servicios",
      projects: "Proyectos",
      press: "Prensa",
      contact: "Contacto",
      cta: "Solicitar cotización",
      mobileLocationLabel: "Sede Central",
      mobileLocationCity: "Abancay",
      mobileLocationCountry: "Perú",
      mobileConnect: "Conecta",
      mobileSocials: [
        { label: "LinkedIn", short: "LI" },
        { label: "Instagram", short: "IN" },
      ],
      menuLabel: "Menú",
      languageSelector: "Selector de idioma",
    },
    hero: {
      eyebrow: "Ingeniería civil y minería - Apurímac, Perú",
      slides: [
        {
          titleLine1: "Ingeniería que",
          titleHighlight: "construye",
          titleLine2: "",
          subtitle: "Diseño civil e hidráulico para infraestructura minera y obras de gran envergadura.",
        },
        {
          titleLine1: "Ingeniería que",
          titleHighlight: "protege",
          titleLine2: "",
          subtitle: "Estudios hidrológicos, geotécnicos e hidrogeológicos para proyectos seguros y sostenibles.",
        },
        {
          titleLine1: "Ingeniería que",
          titleHighlight: "transforma",
          titleLine2: "",
          subtitle: "Ingeniería geográfica y ambiental para el desarrollo responsable del territorio.",
        },
        {
          titleLine1: "Ingeniería que",
          titleHighlight: "supervisa",
          titleLine2: "",
          subtitle: "Supervisión técnica de obras civiles, geotécnicas e hidráulicas con estándares de calidad.",
        },
      ],
      ctaServices: "Ver nuestros servicios",
      ctaContact: "Contáctenos",
      scroll: "Descubre más",
    },
    services: {
      overline: "Nuestros servicios especializados",
      titlePrefix: "Servicios ",
      titleHighlight: "especializados",
      titleSuffix: " para construcción y minería",
      subtitle:
        "Desarrollamos diseño, estudios y supervisión técnica para proyectos civiles, mineros, hidráulicos, geotécnicos, hidrogeológicos, geográficos y ambientales.",
      items: [
        {
          id: "civilHydraulic",
          title: "Diseño civil e hidráulico",
          desc: "Diseño especializado para infraestructura minera, hidráulica y depósitos de disposición con enfoque técnico integral.",
          bullets: [
            "Diseño de instalación de plantas de procesamiento",
            "Diseño de revestimientos con geosintéticos",
            "Diseño de instalaciones de disposición de relaves",
            "Diseño civil de infraestructura minera",
            "Manejo de materiales excedentes",
            "Hidráulica fluvial",
            "Balance de aguas",
            "Diseño de infraestructuras hidráulicas en general",
            "Análisis de roturas de presa",
            "Estudio de sedimentos",
          ],
        },
        {
          id: "hydrologicalStudies",
          title: "Estudios hidrológicos",
          desc: "Evaluación hidrológica e hidráulica para oferta, demanda, caudales de diseño y modelamiento de eventos extremos.",
          bullets: [
            "Estudios hidrométricos y batimétricos",
            "Determinación de caudales de diseño de avenida para diferentes periodos de retorno",
            "Simulación de caudales medios y máximos",
            "Balance hídrico con fines de oferta y demanda",
            "Estudio de máximas avenidas mediante modelamiento hidráulico y transporte de sedimentos",
            "Evaluación de flujos de sedimentos hiperconcentrados",
            "Instalación de estaciones pluviométricas y climatológicas",
            "Revisión de estudios de hidrología e hidráulicos",
          ],
        },
        {
          id: "geotechnics",
          title: "Geotecnia",
          desc: "Análisis sísmico, estabilidad, cimentaciones e instrumentación para infraestructura crítica y proyectos mineros.",
          bullets: [
            "Estudio de peligro sísmico",
            "Análisis de respuesta sísmica y determinación de espectros de diseño",
            "Análisis de estabilidad física por equilibrio límite y desplazamientos por sismo",
            "Análisis numérico para el diseño de cimentaciones",
            "Análisis dinámico mediante elementos finitos y diferencias finitas",
            "Análisis de consolidación para grandes deformaciones",
            "Definición de niveles de alerta",
            "Diseño, supervisión de instalación, procesamiento en interpretación de instrumentación geotécnica",
          ],
        },
        {
          id: "generalWorks",
          title: "Obras y servicios generales",
          desc: "Supervisión y acompañamiento técnico para obras públicas, civiles y estudios de ingeniería.",
          bullets: [
            "Supervisión de obras públicas viales",
            "Supervisión de obras civiles, geotécnicas e hidráulicas",
            "Supervisión de estudios de ingeniería",
          ],
        },
        {
          id: "hydrogeologicalStudies",
          title: "Estudios hidrogeológicos",
          desc: "Análisis de flujos subterráneos y diseño de instrumentación para monitoreo hidrogeológico.",
          bullets: [
            "Simulación de flujos",
            "Hidráulica subterránea",
            "Diseño y supervisión de instalaciones de piezómetros",
          ],
        },
        {
          id: "geographicEngineering",
          title: "Ingeniería geográfica",
          desc: "Levantamiento y representación del territorio mediante topografía, cartografía, fotogrametría y modelado.",
          bullets: [
            "Catastros",
            "Cartografía",
            "Planificación territorial",
            "Levantamientos topográficos",
            "Fotogrametría, mapeo, topografía, batimetría y modelado 3D",
          ],
        },
        {
          id: "environmentalEngineering",
          title: "Ingeniería ambiental",
          desc: "Gestión ambiental, permisos y soporte biológico para la viabilidad y sostenibilidad de proyectos.",
          bullets: [
            "Instrumentos de gestión ambiental (DAAC, DIA, DAP, etc.)",
            "Permisos (PMA, ITM, etc.)",
            "Servicios biológicos (estudios de caudales ecológicos, monitoreo de áreas restauradas, etc.)",
          ],
        },
      ],
      showMore: "Mostrar más servicios",
      showLess: "Mostrar menos",
      customTitle: "¿Necesitas una solución a medida?",
      customSubtitle: "Nuestro equipo diseña paquetes personalizados para cada proyecto.",
      customCta: "Solicitar cotización",
    },
    about: {
      overline: "Quiénes somos",
      titlePrefix: "Ingeniería, construcción y ",
      titleHighlight: "gestión",
      titleSuffix: " de proyectos",
      body: "Hanan Ingeniería es una de las empresas de ingeniería, construcción y gestión de proyectos más importante de la región de Apurímac. Se especializa en sectores clave como infraestructura, minería y metales.",
      missionTitle: "Misión",
      missionBody: [
        "Nuestra misión es ofrecer soluciones técnicas e innovadoras que respondan de manera efectiva a los desafíos constructivos de nuestros clientes garantizando un uso eficiente de recursos y cumplimiento de plazos sin afectar la calidad de nuestro trabajo.",
      ],
      visionTitle: "Visión",
      visionBody: [
        "Ser reconocidos como líderes en soluciones innovadoras y sostenibles para la construcción y la minería en el Perú, generando confianza y valor en cada proyecto. Aspiramos a transformar desafíos en oportunidades de desarrollo, contribuyendo al progreso del país con excelencia, seguridad y compromiso social.",
      ],
      sectorsTitle: "Sectores",
      sectors: ["Construcción", "Minería"],
      values: [
        { id: "compliance", label: "Cumplimiento" },
        { id: "responsibility", label: "Responsabilidad" },
        { id: "efficiency", label: "Eficiencia" },
        { id: "ethics", label: "Ética" },
        { id: "innovation", label: "Innovación" },
        { id: "commitment", label: "Compromiso" },
      ],
      imageAlt: "Equipo de ingenieros",
    },
    projects: {
      overline: "Proyectos",
      title: "Trabajos realizados",
      subtitle:
        "Selección de proyectos donde nuestro equipo aportó conocimiento técnico, innovación y rigor para resolver desafíos complejos.",
      previousAria: "Anterior",
      nextAria: "Siguiente",
      caseStudyCta: "Ver caso de estudio",
      dotAriaPrefix: "Ir al proyecto",
      items: [
        {
          title: "Diseño de relavera — Mina Sur",
          location: "Apurímac",
          sector: "Minería",
          img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Análisis de estabilidad de presa",
          location: "Cusco",
          sector: "Geotecnia",
          img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Modelamiento hidráulico fluvial",
          location: "Apurímac",
          sector: "Hidrología",
          img: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Supervisión de obra vial",
          location: "Andahuaylas",
          sector: "Construcción",
          img: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Catastro y fotogrametría",
          location: "Abancay",
          sector: "Geográfica",
          img: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Estudio hidrogeológico",
          location: "Ayacucho",
          sector: "Hidrogeología",
          img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
        },
      ],
    },
    parallax: {
      titlePrefix: "¿Listo para llevar tu proyecto al ",
      titleHighlight: "siguiente nivel",
      titleSuffix: "?",
      subtitle:
        "Conversemos sobre cómo podemos aportar ingeniería de excelencia, presupuesto acorde a tu perfil y compromiso con los plazos.",
      cta: "Solicitar cotización",
    },
    contact: {
      overline: "Contacto",
      titlePrefix: "Hablemos de tu ",
      titleHighlight: "próximo proyecto",
      titleSuffix: ".",
      subtitle:
        "Cuéntanos sobre tu proyecto y nuestro equipo técnico responderá con una propuesta a la medida en menos de 48 horas.",
      cards: [
        {
          id: "office",
          title: "Oficina principal",
          lines: ["Av. Circunvalación 12M, piso 3", "Abancay · Apurímac · Perú"],
        },
        {
          id: "phone",
          title: "Teléfono",
          lines: ["+51 000 000 000", "Lun – Vie · 8:00 – 18:00"],
        },
        {
          id: "email",
          title: "Correo",
          lines: ["contacto@hananingenieria.com"],
        },
      ],
      serviceOptions: [
        "Diseño civil e hidráulico",
        "Estudios hidrológicos",
        "Geotecnia",
        "Obras y servicios generales",
        "Estudios hidrogeológicos",
        "Ingeniería geográfica",
        "Ingeniería ambiental",
      ],
      form: {
        overline: "Solicitud técnica",
        intro: "Comparte los datos clave y te respondemos con una propuesta técnica clara.",
        nameLabel: "Nombre completo",
        namePlaceholder: "Tu nombre",
        companyLabel: "Empresa / Institución",
        companyPlaceholder: "Tu empresa",
        emailLabel: "Correo",
        emailPlaceholder: "tu@correo.com",
        phoneLabel: "Teléfono",
        phonePlaceholder: "+51",
        serviceLabel: "Servicio de interés",
        messageLabel: "Cuéntanos sobre tu proyecto",
        messagePlaceholder: "Alcance, ubicación, plazos esperados...",
        privacy: "Al enviar aceptas nuestra política de privacidad. No compartimos tus datos.",
        submit: "Enviar solicitud",
        sent: "Enviado",
      },
    },
    map: {
      sectionAria: "Ubicación en mapa",
      iframeTitle: "Ubicación de Hanan Ingeniería",
      label: "Av. Circunvalación 12M, piso 3",
      sublabel: "Abancay, Apurímac, Perú",
    },
    footer: {
      groups: [
        {
          id: "services",
          title: "Servicios",
          links: [
            "Diseño civil e hidráulico",
            "Estudios hidrológicos",
            "Geotecnia",
            "Ingeniería ambiental",
          ],
        },
        {
          id: "company",
          title: "Empresa",
          links: ["Nosotros", "Misión y visión", "Sectores", "Proyectos", "Trabaja con nosotros"],
        },
        {
          id: "contact",
          title: "Contacto",
          links: ["+51 000 000 000", "contacto@hananingenieria.com", "Lun – Vie 8:00 – 18:00"],
        },
      ],
      brandDescription:
        "Soluciones de ingeniería avanzadas e innovadoras para los desafíos más complejos de la construcción y la minería, aportando excelencia técnica al desarrollo del Perú.",
      socialLabels: {
        linkedin: "LinkedIn",
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        email: "Email",
      },
      mapActions: {
        google: "Google Maps",
        waze: "Waze",
      },
      copyright: "Hanan Ingeniería — Todos los derechos reservados.",
      credit: "Trabajo realizado por PDF Comunicaciones",
      privacy: "Privacidad",
      terms: "Términos",
    },
    preloader: {
      location: "Ingeniería que construye, Perú",
      topStatus: {
        survey: "Topografía",
        lock: "Geotecnia",
        out: "Operación",
      },
      stageLabel: {
        survey: "Levantamiento topográfico en campo",
        lock: "Evaluando estabilidad estructural",
        out: "Inicio de operaciones",
      },
      disciplines: ["Geotecnia", "Hidrología", "Ambiental"],
      progressLabel: "Cargando planos",
      phases: ["Exploración", "Ingeniería", "Operación"],
      frontTag: "Tajo 01",
      readyTag: "Terreno listo",
    },
    servicePage: {
      backToServices: "Volver a servicios",
      otherServices: "Otros servicios",
      ctaTitle: "¿Necesitas una solución a medida?",
      ctaSubtitle: "Nuestro equipo diseña paquetes personalizados para cada proyecto.",
      ctaCta: "Solicitar cotización",
      viewService: "Ver servicio",
    },
    press: {
      backHome: "Volver al inicio",
      overline: "Sala de prensa",
      titlePrefix: "Notas de ",
      titleHighlight: "prensa",
      titleSuffix: "",
      subtitle:
        "Información actualizada sobre nuestros proyectos, logros institucionales y participación en el sector de ingeniería civil y minera en el Perú.",
      readMore: "Leer nota completa",
      notes: [
        {
          date: "15 de marzo de 2025",
          tag: "Proyecto",
          title:
            "Hanan Ingeniería culmina el estudio geotécnico para la presa de relaves del proyecto minero Antilla en Apurímac",
          summary:
            "La firma completó el estudio de peligro sísmico y análisis de estabilidad física de la presa de relaves del proyecto Antilla, ubicado en la provincia de Antabamba, Apurímac. El trabajo incluyó modelamiento por elementos finitos y evaluación de estabilidad bajo condiciones estáticas y pseudoestáticas, cumpliendo con los estándares del Canadian Dam Association (CDA) y la normativa peruana vigente.",
          img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
        },
        {
          date: "22 de enero de 2025",
          tag: "Institucional",
          title:
            "Hanan Ingeniería amplía su equipo técnico con especialistas en hidrogeología y gestión ambiental",
          summary:
            "Como parte de su plan de crecimiento, la empresa incorporó a tres nuevos profesionales especializados en modelamiento de flujos subterráneos, diseño de pozos y elaboración de instrumentos de gestión ambiental (DAAC, DIA, DAP). La incorporación responde a la creciente demanda de estudios hidrogeológicos y ambientales en el sector minero de la región Apurímac.",
          img: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=800&q=80",
        },
        {
          date: "8 de noviembre de 2024",
          tag: "Proyecto",
          title:
            "Concluye el modelamiento hidráulico fluvial para la defensa ribereña del río Mariño en Abancay",
          summary:
            "Hanan Ingeniería entregó el estudio hidrológico e hidráulico que contempla el cálculo de caudales de diseño para períodos de retorno de 50, 100 y 500 años, modelamiento 2D con HEC-RAS y diseño de estructuras de protección ribereña en un tramo de 4.2 km del río Mariño, en la ciudad de Abancay. El proyecto fue desarrollado para la Municipalidad Provincial de Abancay.",
          img: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=800&q=80",
        },
        {
          date: "5 de septiembre de 2024",
          tag: "Sector",
          title:
            "La ingeniería geotécnica en el Perú: Hanan Ingeniería participa en el Congreso Nacional de Ingeniería Civil 2024",
          summary:
            "El equipo técnico de la empresa presentó la ponencia «Análisis dinámico de estabilidad de depósitos de relaves en zonas de alta sismicidad» en el XXXII Congreso Nacional de Ingeniería Civil, organizado por el Colegio de Ingenieros del Perú. La presentación abordó casos de estudio reales desarrollados en la región Apurímac y Cusco, con énfasis en el uso de métodos de equilibrio límite y elementos finitos.",
          img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
        },
        {
          date: "18 de junio de 2024",
          tag: "Proyecto",
          title:
            "Supervisión de obra vial: Hanan Ingeniería acompaña la construcción del tramo Andahuaylas–Kishuará",
          summary:
            "La empresa fue contratada para la supervisión técnica del mejoramiento de la carretera Andahuaylas–Kishuará (45 km), incluyendo control de calidad de materiales, verificación de diseño geométrico y seguimiento del cronograma de obra. El proyecto es financiado por el Gobierno Regional de Apurímac y busca mejorar la conectividad vial de la provincia de Andahuaylas.",
          img: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=800&q=80",
        },
        {
          date: "2 de abril de 2024",
          tag: "Institucional",
          title:
            "Hanan Ingeniería obtiene la certificación ISO 9001:2015 para sus servicios de consultoría en geotecnia e hidrología",
          summary:
            "Tras un proceso de auditoría de seis meses, Hanan Ingeniería obtuvo la certificación ISO 9001:2015 en su modelo de gestión de calidad aplicado a los servicios de consultoría en geotecnia, hidrología e hidrogeología. La certificación valida los procesos internos de la empresa y refuerza su compromiso con la excelencia técnica y la mejora continua.",
          img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
  },
  en: {
    meta: {
      homeTitle: "Hanan Ingeniería — Civil and mining engineering solutions",
      homeDescription:
        "Hanan Ingeniería: geotechnics, hydrology, hydrogeology and environmental management for construction and mining projects in Peru. From Apurimac to the rest of the country.",
      pressTitle: "Hanan Ingeniería — Press room",
      pressDescription:
        "Up-to-date information about projects, institutional milestones and Hanan Ingeniería's participation in Peru's civil and mining engineering sector.",
      servicesTitle: "Hanan Ingeniería — Specialized services",
      servicesDescription:
        "Specialized services in civil engineering, hydrology, geotechnics, hydrogeology, geographic and environmental engineering for construction and mining projects.",
      projectsTitle: "Hanan Ingeniería — Projects",
      projectsDescription:
        "Case studies and projects in civil engineering, mining, hydrology, geotechnics and infrastructure in Apurimac and Peru.",
    },
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      projects: "Projects",
      press: "Press",
      contact: "Contact",
      cta: "Request a quote",
      mobileLocationLabel: "Headquarters",
      mobileLocationCity: "Abancay",
      mobileLocationCountry: "Peru",
      mobileConnect: "Connect",
      mobileSocials: [
        { label: "LinkedIn", short: "LI" },
        { label: "Instagram", short: "IG" },
      ],
      menuLabel: "Menu",
      languageSelector: "Language selector",
    },
    hero: {
      eyebrow: "Civil and mining engineering - Apurimac, Peru",
      slides: [
        {
          titleLine1: "Engineering that",
          titleHighlight: "builds",
          titleLine2: "",
          subtitle: "Civil and hydraulic design for mining infrastructure and large-scale construction projects.",
        },
        {
          titleLine1: "Engineering that",
          titleHighlight: "protects",
          titleLine2: "",
          subtitle: "Hydrological, geotechnical and hydrogeological studies for safe and sustainable projects.",
        },
        {
          titleLine1: "Engineering that",
          titleHighlight: "transforms",
          titleLine2: "",
          subtitle: "Geographic and environmental engineering for responsible territorial development.",
        },
        {
          titleLine1: "Engineering that",
          titleHighlight: "supervises",
          titleLine2: "",
          subtitle: "Technical supervision of civil, geotechnical and hydraulic works with quality standards.",
        },
      ],
      ctaServices: "View our services",
      ctaContact: "Contact us",
      scroll: "Discover more",
    },
    services: {
      overline: "Our specialized services",
      titlePrefix: "Specialized ",
      titleHighlight: "services",
      titleSuffix: " for construction and mining",
      subtitle:
        "We develop design, studies and technical supervision for civil, mining, hydraulic, geotechnical, hydrogeological, geographic and environmental projects.",
      items: [
        {
          id: "civilHydraulic",
          title: "Civil and hydraulic design",
          desc: "Specialized design for mining infrastructure, hydraulic works and disposal facilities with an integrated technical approach.",
          bullets: [
            "Processing plant facility design",
            "Geomembrane and geosynthetic lining design",
            "Tailings disposal facility design",
            "Civil design for mining infrastructure",
            "Excess material management",
            "River hydraulics",
            "Water balance",
            "General hydraulic infrastructure design",
            "Dam breach analysis",
            "Sediment studies",
          ],
        },
        {
          id: "hydrologicalStudies",
          title: "Hydrological studies",
          desc: "Hydrological and hydraulic evaluation for water supply, demand, design flows and extreme-event modeling.",
          bullets: [
            "Hydrometric and bathymetric studies",
            "Design flood flow determination for different return periods",
            "Average and peak flow simulation",
            "Water balance for supply and demand purposes",
            "Maximum flood studies using hydraulic modeling and sediment transport",
            "Hyperconcentrated sediment flow assessment",
            "Installation of rainfall and climate monitoring stations",
            "Review of hydrology and hydraulic studies",
          ],
        },
        {
          id: "geotechnics",
          title: "Geotechnics",
          desc: "Seismic analysis, stability, foundations and instrumentation for critical infrastructure and mining projects.",
          bullets: [
            "Seismic hazard studies",
            "Seismic response analysis and design spectrum definition",
            "Physical stability analysis using limit equilibrium and seismic displacement methods",
            "Numerical analysis for foundation design",
            "Dynamic analysis using finite elements and finite differences",
            "Consolidation analysis for large deformations",
            "Alert level definition",
            "Design, installation supervision, processing and interpretation of geotechnical instrumentation",
          ],
        },
        {
          id: "generalWorks",
          title: "Works and general services",
          desc: "Supervision and technical support for public works, civil construction and engineering studies.",
          bullets: [
            "Supervision of public road works",
            "Supervision of civil, geotechnical and hydraulic works",
            "Supervision of engineering studies",
          ],
        },
        {
          id: "hydrogeologicalStudies",
          title: "Hydrogeological studies",
          desc: "Groundwater flow analysis and instrumentation design for hydrogeological monitoring.",
          bullets: [
            "Flow simulation",
            "Subsurface hydraulics",
            "Design and supervision of piezometer installations",
          ],
        },
        {
          id: "geographicEngineering",
          title: "Geographic engineering",
          desc: "Territorial survey and representation through topography, cartography, photogrammetry and modeling.",
          bullets: [
            "Cadastre",
            "Cartography",
            "Land-use planning",
            "Topographic surveys",
            "Photogrammetry, mapping, topography, bathymetry and 3D modeling",
          ],
        },
        {
          id: "environmentalEngineering",
          title: "Environmental engineering",
          desc: "Environmental management, permitting and biological support for project viability and sustainability.",
          bullets: [
            "Environmental management instruments (DAAC, DIA, DAP, etc.)",
            "Permits (PMA, ITM, etc.)",
            "Biological services (ecological flow studies, restored-area monitoring, etc.)",
          ],
        },
      ],
      showMore: "Show more services",
      showLess: "Show less",
      customTitle: "Need a tailored solution?",
      customSubtitle: "Our team designs custom packages for each project.",
      customCta: "Request a quote",
    },
    about: {
      overline: "Who we are",
      titlePrefix: "Engineering, construction and project ",
      titleHighlight: "management",
      titleSuffix: "",
      body: "Hanan Ingeniería is one of the leading engineering, construction and project management companies in the Apurimac region. It specializes in key sectors such as infrastructure, mining and metals.",
      missionTitle: "Mission",
      missionBody: [
        "Our main mission is to provide technical and innovative solutions to complex problems, focused on the effective and efficient use of resources to meet our clients' requirements while honoring time commitments.",
        "Our mission is to offer technical and innovative solutions that respond effectively to our clients' construction challenges, ensuring efficient use of resources and compliance with deadlines without affecting the quality of our work.",
      ],
      visionTitle: "Vision",
      visionBody: [
        "To be recognized as leaders in innovative and sustainable solutions for construction and mining in Peru, generating trust and value in every project. We aspire to turn challenges into development opportunities, contributing to the country's progress with excellence, safety and social commitment.",
      ],
      sectorsTitle: "Sectors",
      sectors: ["Construction", "Mining"],
      values: [
        { id: "compliance", label: "Compliance" },
        { id: "responsibility", label: "Responsibility" },
        { id: "efficiency", label: "Efficiency" },
        { id: "ethics", label: "Ethics" },
        { id: "innovation", label: "Innovation" },
        { id: "commitment", label: "Commitment" },
      ],
      imageAlt: "Engineering team",
    },
    projects: {
      overline: "Projects",
      title: "Completed work",
      subtitle:
        "A selection of projects where our team contributed technical knowledge, innovation and rigor to solve complex challenges.",
      previousAria: "Previous",
      nextAria: "Next",
      caseStudyCta: "View case study",
      dotAriaPrefix: "Go to project",
      items: [
        {
          title: "Tailings dam design - Mina Sur",
          location: "Apurimac",
          sector: "Mining",
          img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Dam stability analysis",
          location: "Cusco",
          sector: "Geotechnics",
          img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "River hydraulic modeling",
          location: "Apurimac",
          sector: "Hydrology",
          img: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Road construction supervision",
          location: "Andahuaylas",
          sector: "Construction",
          img: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Cadastre and photogrammetry",
          location: "Abancay",
          sector: "Geospatial",
          img: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Hydrogeological study",
          location: "Ayacucho",
          sector: "Hydrogeology",
          img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
        },
      ],
    },
    parallax: {
      titlePrefix: "Ready to take your project to the ",
      titleHighlight: "next level",
      titleSuffix: "?",
      subtitle:
        "Let's discuss how we can contribute engineering excellence, a budget aligned with your profile and real commitment to deadlines.",
      cta: "Request a quote",
    },
    contact: {
      overline: "Contact",
      titlePrefix: "Let's talk about your ",
      titleHighlight: "next project",
      titleSuffix: ".",
      subtitle:
        "Tell us about your project and our technical team will reply with a tailored proposal in less than 48 hours.",
      cards: [
        {
          id: "office",
          title: "Main office",
          lines: ["Av. Circunvalación 12M, floor 3", "Abancay · Apurimac · Peru"],
        },
        {
          id: "phone",
          title: "Phone",
          lines: ["+51 000 000 000", "Mon - Fri · 8:00 - 18:00"],
        },
        {
          id: "email",
          title: "Email",
          lines: ["contacto@hananingenieria.com"],
        },
      ],
      serviceOptions: [
        "Civil and hydraulic design",
        "Hydrological studies",
        "Geotechnics",
        "Works and general services",
        "Hydrogeological studies",
        "Geographic engineering",
        "Environmental engineering",
      ],
      form: {
        overline: "Technical inquiry",
        intro: "Share the key details and we will reply with a clear technical proposal.",
        nameLabel: "Full name",
        namePlaceholder: "Your name",
        companyLabel: "Company / Institution",
        companyPlaceholder: "Your company",
        emailLabel: "Email",
        emailPlaceholder: "you@email.com",
        phoneLabel: "Phone",
        phonePlaceholder: "+51",
        serviceLabel: "Service of interest",
        messageLabel: "Tell us about your project",
        messagePlaceholder: "Scope, location, expected timeline...",
        privacy: "By submitting, you accept our privacy policy. We do not share your data.",
        submit: "Send request",
        sent: "Sent",
      },
    },
    map: {
      sectionAria: "Map location",
      iframeTitle: "Hanan Ingeniería location",
      label: "Av. Circunvalación 12M, floor 3",
      sublabel: "Abancay, Apurimac, Peru",
    },
    footer: {
      groups: [
        {
          id: "services",
          title: "Services",
          links: [
            "Civil and hydraulic design",
            "Hydrological studies",
            "Geotechnics",
            "Environmental engineering",
          ],
        },
        {
          id: "company",
          title: "Company",
          links: ["About", "Mission and vision", "Industries", "Projects", "Work with us"],
        },
        {
          id: "contact",
          title: "Contact",
          links: ["+51 000 000 000", "contacto@hananingenieria.com", "Mon - Fri 8:00 - 18:00"],
        },
      ],
      brandDescription:
        "Advanced and innovative engineering solutions for the most complex construction and mining challenges, delivering technical excellence for Peru's development.",
      socialLabels: {
        linkedin: "LinkedIn",
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        email: "Email",
      },
      mapActions: {
        google: "Google Maps",
        waze: "Waze",
      },
      copyright: "Hanan Ingeniería - All rights reserved.",
      credit: "Built by PDF Comunicaciones",
      privacy: "Privacy",
      terms: "Terms",
    },
    preloader: {
      location: "Engineering that builds, Peru",
      topStatus: {
        survey: "Topography",
        lock: "Geotechnics",
        out: "Operation",
      },
      stageLabel: {
        survey: "Field topographic survey",
        lock: "Evaluating structural stability",
        out: "Commencing operations",
      },
      disciplines: ["Geotechnics", "Hydrology", "Environmental"],
      progressLabel: "Loading blueprints",
      phases: ["Exploration", "Engineering", "Operation"],
      frontTag: "Pit 01",
      readyTag: "Site ready",
    },
    servicePage: {
      backToServices: "Back to services",
      otherServices: "Other services",
      ctaTitle: "Need a custom solution?",
      ctaSubtitle: "Our team designs customized packages for every project.",
      ctaCta: "Request a quote",
      viewService: "View service",
    },
    press: {
      backHome: "Back to home",
      overline: "Press room",
      titlePrefix: "Press ",
      titleHighlight: "notes",
      titleSuffix: "",
      subtitle:
        "Updated information about our projects, institutional milestones and participation in Peru's civil and mining engineering sector.",
      readMore: "Read full article",
      notes: [
        {
          date: "March 15, 2025",
          tag: "Project",
          title:
            "Hanan Ingeniería completes the geotechnical study for the Antilla mining project's tailings dam in Apurimac",
          summary:
            "The firm completed the seismic hazard study and physical stability analysis for the Antilla project's tailings dam in Antabamba, Apurimac. The work included finite element modeling and stability assessment under static and pseudostatic conditions, meeting Canadian Dam Association (CDA) standards and current Peruvian regulations.",
          img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
        },
        {
          date: "January 22, 2025",
          tag: "Institutional",
          title:
            "Hanan Ingeniería expands its technical team with hydrogeology and environmental management specialists",
          summary:
            "As part of its growth plan, the company added three new professionals specialized in groundwater flow modeling, well design and environmental management instruments (DAAC, DIA, DAP). The move responds to rising demand for hydrogeological and environmental studies in Apurimac's mining sector.",
          img: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=800&q=80",
        },
        {
          date: "November 8, 2024",
          tag: "Project",
          title:
            "River hydraulic modeling for the Mariño River flood protection works in Abancay reaches completion",
          summary:
            "Hanan Ingeniería delivered the hydrological and hydraulic study covering design flows for 50-, 100- and 500-year return periods, 2D HEC-RAS modeling and the design of riverbank protection structures along a 4.2 km section of the Mariño River in Abancay. The project was developed for the Provincial Municipality of Abancay.",
          img: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=800&q=80",
        },
        {
          date: "September 5, 2024",
          tag: "Industry",
          title:
            "Geotechnical engineering in Peru: Hanan Ingeniería takes part in the 2024 National Civil Engineering Congress",
          summary:
            "The company's technical team presented the paper 'Dynamic stability analysis of tailings deposits in high seismicity zones' at the 32nd National Civil Engineering Congress organized by the College of Engineers of Peru. The presentation covered real case studies developed in Apurimac and Cusco, with emphasis on limit equilibrium and finite element methods.",
          img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
        },
        {
          date: "June 18, 2024",
          tag: "Project",
          title:
            "Road work supervision: Hanan Ingeniería supports construction of the Andahuaylas-Kishuará section",
          summary:
            "The company was hired for the technical supervision of the Andahuaylas-Kishuará road upgrade (45 km), including materials quality control, geometric design verification and schedule monitoring. The project is financed by the Regional Government of Apurimac and aims to improve road connectivity in the province of Andahuaylas.",
          img: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=800&q=80",
        },
        {
          date: "April 2, 2024",
          tag: "Institutional",
          title:
            "Hanan Ingeniería earns ISO 9001:2015 certification for its geotechnical and hydrology consulting services",
          summary:
            "After a six-month audit process, Hanan Ingeniería obtained ISO 9001:2015 certification for its quality management framework applied to geotechnical, hydrology and hydrogeology consulting services. The certification validates the company's internal processes and reinforces its commitment to technical excellence and continuous improvement.",
          img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
  },
};

const flatTranslations: Record<Lang, Record<string, string>> = {
  es: {
    "nav.home": siteContent.es.nav.home,
    "nav.about": siteContent.es.nav.about,
    "nav.services": siteContent.es.nav.services,
    "nav.projects": siteContent.es.nav.projects,
    "nav.contact": siteContent.es.nav.contact,
    "nav.press": siteContent.es.nav.press,
    "nav.cta": siteContent.es.nav.cta,
    "hero.eyebrow": siteContent.es.hero.eyebrow,
    "hero.title.1": siteContent.es.hero.titleLine1,
    "hero.title.2a": siteContent.es.hero.titleHighlight,
    "hero.title.2b": siteContent.es.hero.titleLine2,
    "hero.subtitle": siteContent.es.hero.subtitle,
    "hero.cta.services": siteContent.es.hero.ctaServices,
    "hero.cta.contact": siteContent.es.hero.ctaContact,
    "hero.scroll": siteContent.es.hero.scroll,
  },
  en: {
    "nav.home": siteContent.en.nav.home,
    "nav.about": siteContent.en.nav.about,
    "nav.services": siteContent.en.nav.services,
    "nav.projects": siteContent.en.nav.projects,
    "nav.contact": siteContent.en.nav.contact,
    "nav.press": siteContent.en.nav.press,
    "nav.cta": siteContent.en.nav.cta,
    "hero.eyebrow": siteContent.en.hero.eyebrow,
    "hero.title.1": siteContent.en.hero.titleLine1,
    "hero.title.2a": siteContent.en.hero.titleHighlight,
    "hero.title.2b": siteContent.en.hero.titleLine2,
    "hero.subtitle": siteContent.en.hero.subtitle,
    "hero.cta.services": siteContent.en.hero.ctaServices,
    "hero.cta.contact": siteContent.en.hero.ctaContact,
    "hero.scroll": siteContent.en.hero.scroll,
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

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = (key: string) => flatTranslations[lang][key] ?? flatTranslations.es[key] ?? key;

  return {
    lang,
    setLang: setGlobalLang,
    t,
    content: siteContent[lang],
  };
}
