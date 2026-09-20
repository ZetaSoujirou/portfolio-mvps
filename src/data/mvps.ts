import { MVP } from "@/lib/catalog/schema";

export const sampleMVPs: MVP[] = [
  {
    id: "mvp-tienda-nicho",
    slug: "tienda-nicho",
    title: "Tienda de nicho",
    tagline: "E-commerce ligero optimizado para catálogo exclusivo y pedidos rápidos",
    niche: "ecommerce",
    tags: ["Next.js", "Tailwind CSS", "Stripe Checkout", "PostgreSQL"],
    status: "available",
    isSample: true,
    featured: true,
    price: {
      kind: "fixed",
      amountMinor: 149900, // 1.499,00 USD
      currency: "USD",
    },
    techStack: ["Next.js 15", "React 19", "Tailwind CSS", "Prisma", "PostgreSQL"],
    cover: {
      src: "/images/mvps/tienda-nicho-cover.svg",
      alt: "Captura ilustrativa de portada de Tienda de Nicho",
      width: 1200,
      height: 675,
    },
    gallery: [
      {
        src: "/images/mvps/tienda-nicho-gallery-1.svg",
        alt: "Vista del catálogo de productos de Tienda de Nicho",
        width: 1200,
        height: 675,
      },
      {
        src: "/images/mvps/tienda-nicho-gallery-2.svg",
        alt: "Detalle de producto y checkout de Tienda de Nicho",
        width: 1200,
        height: 675,
      },
    ],
    summary:
      "Base funcional para comercio electrónico enfocado en catálogos de alta rotación. Incluye panel de gestión de stock, sincronización de pedidos y diseño responsivo móvil.",
    problemsSolved: [
      "Elimina la sobrecarga y lentitud de plataformas complejas como Magento o WooCommerce.",
      "Flujo de compra directo en un paso para aumentar la tasa de conversión.",
      "Gestión de inventario centralizada y tipada sin plugins externos.",
    ],
    features: [
      "Catálogo de productos con filtros dinámicos por categoría y atributos.",
      "Ficha de producto con selector de variantes e imágenes ampliables.",
      "Carrito persistente en almacenamiento local.",
      "Panel de administración básico para carga de productos y pedidos.",
    ],
    includes: [
      "Código fuente completo sin ofuscar en repositorio Git.",
      "Esquema de base de datos relacional y scripts de migración.",
      "Documentación técnica de despliegue en Vercel o Docker.",
    ],
    excludes: [
      "Cuentas o suscripciones activas en pasarelas de pago o proveedores cloud.",
      "Personalización visual avanzada fuera del tema base entregado.",
      "Carga masiva de inventario real del comprador.",
    ],
    requirements: [
      "Cuenta de hosting compatible con Node.js (ej. Vercel, Railway).",
      "Base de datos PostgreSQL (ej. Supabase, Neon o servidor propio).",
    ],
    thirdPartyCosts: [
      "Hosting web: plan gratuito o ~20 USD/mes según tráfico.",
      "Base de datos gestionada: plan gratuito o ~25 USD/mes.",
    ],
    license: {
      mode: "non_exclusive",
      sourceCodeIncluded: true,
      resale: "not_allowed",
      summary:
        "Licencia de uso comercial no exclusiva para un único despliegue o marca del adquirente. No se autoriza la reventa directa del código fuente a terceros.",
    },
    support: {
      days: 30,
      scope: [
        "Resolución de dudas sobre instalación y despliegue.",
        "Corrección de errores atribuibles al código entregado.",
      ],
      exclusions: [
        "Desarrollo de nuevas funcionalidades no contempladas.",
        "Soporte sobre modificaciones introducidas por el comprador.",
      ],
    },
    delivery: {
      estimate: "2 a 3 días hábiles",
      conditions: [
        "Transferencia de acceso al repositorio tras confirmación del pago.",
        "Guía paso a paso de puesta en marcha remota.",
      ],
    },
    updatedAt: "2026-09-19",
    seo: {
      title: "Tienda de Nicho — MVP E-commerce para Lanzamiento Rápido",
      description:
        "Prototipo comercial de tienda online ligera construida con Next.js y PostgreSQL.",
    },
  },
  {
    id: "mvp-asistente-documental",
    slug: "asistente-documental",
    title: "Asistente documental",
    tagline: "Búsqueda semántica y respuestas automáticas sobre archivos corporativos",
    niche: "ia",
    tags: ["OpenAI API", "LangChain", "Vector Store", "FastAPI / Next.js"],
    status: "available",
    isSample: true,
    featured: true,
    price: {
      kind: "from",
      amountMinor: 99000, // Desde 990,00 USD
      currency: "USD",
    },
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "pgvector", "OpenAI API"],
    cover: {
      src: "/images/mvps/asistente-documental-cover.svg",
      alt: "Captura ilustrativa de portada de Asistente Documental",
      width: 1200,
      height: 675,
    },
    gallery: [
      {
        src: "/images/mvps/asistente-documental-gallery-1.svg",
        alt: "Interfaz de chat y consulta de documentos",
        width: 1200,
        height: 675,
      },
      {
        src: "/images/mvps/asistente-documental-gallery-2.svg",
        alt: "Panel de ingestión de PDFs y fuentes de datos",
        width: 1200,
        height: 675,
      },
    ],
    summary:
      "Plataforma de recuperación y generación aumentada (RAG) que indexa documentos PDF y responde preguntas citando las fuentes exactas del archivo.",
    problemsSolved: [
      "Reduce el tiempo de búsqueda de información en manuales y políticas extensas.",
      "Evita alucinaciones del modelo gracias a un contexto acotado y citas de página.",
      "Permite a equipos no técnicos consultar repositorios complejos en lenguaje natural.",
    ],
    features: [
      "Carga e indexación automática de archivos PDF y Markdown.",
      "Chat interactivo con citas de página y fragmentos de referencia.",
      "Control de tokens y estimación de consumo de API.",
      "Historial de conversaciones persistente por sesión.",
    ],
    includes: [
      "Código fuente completo del frontend y backend de ingestión.",
      "Configuración de base de datos vectorial con pgvector.",
      "Documentación de configuración de claves de API.",
    ],
    excludes: [
      "Suscripciones o créditos de consumo de modelos de IA (OpenAI, Anthropic).",
      "Garantías sobre la exactitud de modelos fundacionales de terceros.",
    ],
    requirements: [
      "Clave de API de OpenAI o proveedor compatible.",
      "Instancia de PostgreSQL con extensión pgvector.",
    ],
    thirdPartyCosts: [
      "Consumo de API de IA: variable según volumen de consultas.",
      "Base de datos vectorial: ~15-30 USD/mes.",
    ],
    license: {
      mode: "non_exclusive",
      sourceCodeIncluded: true,
      resale: "not_allowed",
      summary:
        "Licencia de explotación interna o comercial no exclusiva. No se permite revender la plantilla como producto comercial genérico.",
    },
    support: {
      days: 30,
      scope: [
        "Acompañamiento en el despliegue inicial y configuración de pgvector.",
        "Revisión de variables de entorno y validación de conexión con OpenAI.",
      ],
      exclusions: [
        "Ajuste fino (fine-tuning) de modelos o reentrenamiento.",
      ],
    },
    delivery: {
      estimate: "3 a 5 días hábiles",
      conditions: [
        "Entrega de repositorio tras formalización del acuerdo comercial.",
      ],
    },
    updatedAt: "2026-09-19",
    seo: {
      title: "Asistente Documental — MVP de Inteligencia Artificial para Empresas",
      description:
        "Sistema RAG para consulta semántica de documentos corporativos con citas y contexto.",
    },
  },
  {
    id: "mvp-automatizador-operaciones",
    slug: "automatizador-operaciones",
    title: "Automatizador de operaciones",
    tagline: "Orquestación de flujos de trabajo internos e integración de APIs",
    niche: "automatizacion",
    tags: ["Workflow", "Webhooks", "Node.js", "Redis"],
    status: "custom_order",
    isSample: true,
    featured: false,
    price: {
      kind: "quote",
      currency: "USD",
    },
    techStack: ["Node.js", "TypeScript", "Redis / BullMQ", "Docker", "Fastify"],
    cover: {
      src: "/images/mvps/automatizador-operaciones-cover.svg",
      alt: "Captura ilustrativa de portada de Automatizador de Operaciones",
      width: 1200,
      height: 675,
    },
    gallery: [
      {
        src: "/images/mvps/automatizador-operaciones-gallery-1.svg",
        alt: "Panel de monitoreo de tareas y reintentos",
        width: 1200,
        height: 675,
      },
    ],
    summary:
      "Arquitectura de procesamiento asíncrono para coordinar sincronizaciones de datos entre CRMs, hojas de cálculo y pasarelas de pago.",
    problemsSolved: [
      "Elimina tareas manuales repetitivas propensas a errores humanos.",
      "Garantiza reintentos y tolerancia a fallos ante caídas momentáneas de APIs externas.",
      "Centraliza logs y auditoría de eventos de integración.",
    ],
    features: [
      "Colas de procesamiento con reintentos automáticos y backoff exponencial.",
      "Endpoints para recepción segura de webhooks con validación de firmas.",
      "Dashboard básico para monitoreo de estados de ejecución.",
      "Alertas de error configurables vía webhook (Slack / Discord).",
    ],
    includes: [
      "Base de código modular con arquitectura hexagonal.",
      "Configuración Docker Compose lista para producción.",
      "Ejemplos de conectores para servicios habituales.",
    ],
    excludes: [
      "Cuentas en plataformas de terceros a integrar.",
      "Mantenimiento continuo de APIs externas que cambien su especificación.",
    ],
    requirements: [
      "Servidor VPS o contenedor Docker con al menos 1 GB de RAM.",
      "Instancia de Redis para gestión de colas.",
    ],
    thirdPartyCosts: [
      "Servidor VPS: ~5 a 15 USD/mes.",
    ],
    license: {
      mode: "to_agree",
      sourceCodeIncluded: true,
      resale: "to_agree",
      summary:
        "Condiciones de propiedad y licencia a convenir en el presupuesto según la naturaleza del encargo.",
    },
    support: {
      days: 60,
      scope: [
        "Soporte sobre la arquitectura desplegada y monitoreo de colas.",
      ],
      exclusions: [
        "Nuevos conectores no especificados en el encargo inicial.",
      ],
    },
    delivery: {
      estimate: "A convenir según alcance",
      conditions: [
        "Definición previa de especificaciones y presupuesto aprobado.",
      ],
    },
    updatedAt: "2026-09-19",
    seo: {
      title: "Automatizador de Operaciones — MVP para Integración de Procesos",
      description:
        "Motor de flujos de trabajo asíncronos y sincronización de datos para empresas.",
    },
  },
];
