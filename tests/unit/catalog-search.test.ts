import { describe, it, expect } from "vitest";
import { normalizeText, filterAndSortMVPs, CatalogFilterParams } from "@/lib/catalog/search";
import { MVP } from "@/lib/catalog/schema";

const mockMVPs: MVP[] = [
  {
    id: "mvp-1",
    slug: "tienda-online",
    title: "Tienda Online Moderna",
    tagline: "E-commerce rápido con Next.js y Stripe",
    niche: "ecommerce",
    tags: ["ecommerce", "ventas", "stripe"],
    status: "available",
    isSample: true,
    featured: true,
    price: { kind: "fixed", amountMinor: 150000, currency: "USD" },
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "PostgreSQL"],
    cover: { src: "/images/mvps/tienda.svg", alt: "Tienda", width: 1200, height: 675 },
    gallery: [],
    summary: "Plataforma completa de comercio electrónico para marcas.",
    problemsSolved: ["Ventas lentas"],
    features: ["Checkout optimizado"],
    includes: ["Código fuente"],
    excludes: ["Hosting"],
    requirements: ["Node.js 20"],
    thirdPartyCosts: ["Stripe comisiones"],
    license: {
      mode: "non_exclusive",
      sourceCodeIncluded: true,
      resale: "not_allowed",
      summary: "Licencia no exclusiva",
    },
    support: { days: 30, scope: ["Bugfixes"], exclusions: ["Nuevas funciones"] },
    delivery: { estimate: "24-48 horas", conditions: ["Pago recibido"] },
    updatedAt: "2026-09-01T10:00:00Z",
  },
  {
    id: "mvp-2",
    slug: "asistente-ia",
    title: "Asistente Documental con IA",
    tagline: "Búsqueda semántica sobre PDFs y bases de conocimiento",
    niche: "ia",
    tags: ["ia", "rag", "documentos"],
    status: "available",
    isSample: true,
    featured: false,
    price: { kind: "from", amountMinor: 99000, currency: "USD" },
    techStack: ["Next.js", "OpenAI", "Supabase Vector", "Python"],
    cover: { src: "/images/mvps/asistente.svg", alt: "Asistente", width: 1200, height: 675 },
    gallery: [],
    summary: "Sistema RAG avanzado para análisis documental.",
    problemsSolved: ["Búsqueda manual en PDFs"],
    features: ["Embeddings vectoriales"],
    includes: ["Código fuente"],
    excludes: ["Consumo OpenAI"],
    requirements: ["API Key OpenAI"],
    thirdPartyCosts: ["OpenAI API"],
    license: {
      mode: "non_exclusive",
      sourceCodeIncluded: true,
      resale: "not_allowed",
      summary: "Licencia no exclusiva",
    },
    support: { days: 15, scope: ["Instalación"], exclusions: ["Nuevos modelos"] },
    delivery: { estimate: "24 horas", conditions: ["Pago verificado"] },
    updatedAt: "2026-09-10T12:00:00Z",
  },
  {
    id: "mvp-3",
    slug: "automatizador-crm",
    title: "Automatizador de Operaciones CRM",
    tagline: "Sincronización bidireccional entre CRM y ERP",
    niche: "automatizacion",
    tags: ["automatizacion", "crm", "erp", "webhooks"],
    status: "custom_order",
    isSample: true,
    featured: false,
    price: { kind: "quote", currency: "USD" },
    techStack: ["Node.js", "Redis", "Docker"],
    cover: { src: "/images/mvps/automatizador.svg", alt: "Automatizador", width: 1200, height: 675 },
    gallery: [],
    summary: "Flujos de integración para sincronizar pedidos y clientes.",
    problemsSolved: ["Doble carga de datos"],
    features: ["Reintentos automáticos"],
    includes: ["Código y scripts Docker"],
    excludes: ["Servidores dedicados"],
    requirements: ["Docker instalado"],
    thirdPartyCosts: ["Servidor VPS"],
    license: {
      mode: "exclusive",
      sourceCodeIncluded: true,
      resale: "not_allowed",
      summary: "Licencia exclusiva bajo encargo",
    },
    support: { days: 60, scope: ["Acompañamiento"], exclusions: ["Nuevos ERPs"] },
    delivery: { estimate: "1-2 semanas", conditions: ["Alcance acordado"] },
    updatedAt: "2026-09-15T08:00:00Z",
  },
  {
    id: "mvp-4",
    slug: "fintech-tracker",
    title: "Control Financiero Pyme",
    tagline: "Dashboard de tesorería y conciliación bancaria",
    niche: "fintech",
    tags: ["fintech", "bancos", "finanzas"],
    status: "sold",
    isSample: false,
    featured: false,
    price: { kind: "fixed", amountMinor: 250000, currency: "USD" },
    techStack: ["React", "Go", "PostgreSQL"],
    cover: { src: "/images/mvps/fintech.svg", alt: "Fintech", width: 1200, height: 675 },
    gallery: [],
    summary: "Gestión financiera empresarial en tiempo real.",
    problemsSolved: ["Descontrol de flujo de caja"],
    features: ["Gráficos interactivos"],
    includes: ["Código fuente"],
    excludes: ["API bancaria privada"],
    requirements: ["PostgreSQL 16"],
    thirdPartyCosts: ["Hosting cloud"],
    license: {
      mode: "exclusive",
      sourceCodeIncluded: true,
      resale: "not_allowed",
      summary: "Licencia vendida en exclusiva",
    },
    support: { days: 0, scope: [], exclusions: ["Sin soporte post-venta"] },
    delivery: { estimate: "Inmediata", conditions: ["Transferencia completada"] },
    updatedAt: "2026-08-20T14:00:00Z",
  },
];

describe("normalizeText", () => {
  it("converts to lowercase and strips accents/diacritics", () => {
    expect(normalizeText("Árbol")).toBe("arbol");
    expect(normalizeText("AUTOMATIZACIÓN")).toBe("automatizacion");
    expect(normalizeText("   Espacios   ")).toBe("espacios");
    expect(normalizeText("¿Cómo estás?")).toBe("como estas");
  });
});

describe("filterAndSortMVPs", () => {
  it("returns all MVPs when filter params are empty", () => {
    const result = filterAndSortMVPs(mockMVPs, {});
    expect(result).toHaveLength(4);
  });

  describe("text search (q)", () => {
    it("matches in title ignoring case and accents", () => {
      const result = filterAndSortMVPs(mockMVPs, { q: "automatizacion" });
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe("automatizador-crm");
    });

    it("matches in tagline or summary", () => {
      const result = filterAndSortMVPs(mockMVPs, { q: "semantica" });
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe("asistente-ia");
    });

    it("matches in tags", () => {
      const result = filterAndSortMVPs(mockMVPs, { q: "stripe" });
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe("tienda-online");
    });

    it("matches in techStack", () => {
      const result = filterAndSortMVPs(mockMVPs, { q: "vector" });
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe("asistente-ia");
    });

    it("returns empty array when no match found", () => {
      const result = filterAndSortMVPs(mockMVPs, { q: "inexistente12345" });
      expect(result).toHaveLength(0);
    });
  });

  describe("niche filter", () => {
    it("filters by specific niche", () => {
      const result = filterAndSortMVPs(mockMVPs, { niche: "ia" });
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe("asistente-ia");
    });

    it("returns all when niche is 'all' or empty", () => {
      const result = filterAndSortMVPs(mockMVPs, { niche: "all" });
      expect(result).toHaveLength(4);
    });
  });

  describe("status filter", () => {
    it("filters by status available", () => {
      const result = filterAndSortMVPs(mockMVPs, { status: "available" });
      expect(result).toHaveLength(2);
      expect(result.map((m) => m.slug)).toEqual(["tienda-online", "asistente-ia"]);
    });

    it("filters by status sold", () => {
      const result = filterAndSortMVPs(mockMVPs, { status: "sold" });
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe("fintech-tracker");
    });

    it("filters by status custom_order", () => {
      const result = filterAndSortMVPs(mockMVPs, { status: "custom_order" });
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe("automatizador-crm");
    });
  });

  describe("sorting", () => {
    it("sorts by price_asc (lowest to highest, quotes at the end)", () => {
      const result = filterAndSortMVPs(mockMVPs, { sort: "price_asc" });
      expect(result.map((m) => m.slug)).toEqual([
        "asistente-ia",      // 990 USD
        "tienda-online",     // 1499 USD
        "fintech-tracker",   // 2500 USD
        "automatizador-crm", // quote (al final)
      ]);
    });

    it("sorts by price_desc (highest to lowest, quotes at the end)", () => {
      const result = filterAndSortMVPs(mockMVPs, { sort: "price_desc" });
      expect(result.map((m) => m.slug)).toEqual([
        "fintech-tracker",   // 2500 USD
        "tienda-online",     // 1499 USD
        "asistente-ia",      // 990 USD
        "automatizador-crm", // quote (al final)
      ]);
    });

    it("sorts by newest (updatedAt descending)", () => {
      const result = filterAndSortMVPs(mockMVPs, { sort: "newest" });
      expect(result.map((m) => m.slug)).toEqual([
        "automatizador-crm", // 2026-09-15
        "asistente-ia",      // 2026-09-10
        "tienda-online",     // 2026-09-01
        "fintech-tracker",   // 2026-08-20
      ]);
    });
  });

  describe("combined filters", () => {
    it("filters by query, niche and status simultaneously", () => {
      const result = filterAndSortMVPs(mockMVPs, {
        q: "next.js",
        niche: "ecommerce",
        status: "available",
      });
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe("tienda-online");
    });
  });
});
