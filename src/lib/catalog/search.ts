import { MVP } from "./schema";

export interface CatalogFilterParams {
  q?: string;
  niche?: string;
  status?: string;
  sort?: "price_asc" | "price_desc" | "newest" | string;
}

/**
 * Normaliza un texto convirtiéndolo a minúsculas, eliminando acentos/diacríticos,
 * puntuación y espacios sobrantes para comparaciones insensibles.
 */
export function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Filtra y ordena una lista de MVPs de acuerdo con los parámetros de búsqueda especificados.
 */
export function filterAndSortMVPs(
  mvps: MVP[],
  params: CatalogFilterParams = {}
): MVP[] {
  let filtered = [...mvps];

  // 1. Filtro de búsqueda textual (q)
  if (params.q) {
    const query = normalizeText(params.q);
    if (query.length > 0) {
      filtered = filtered.filter((mvp) => {
        const titleMatch = normalizeText(mvp.title).includes(query);
        const taglineMatch = normalizeText(mvp.tagline).includes(query);
        const summaryMatch = normalizeText(mvp.summary).includes(query);
        const tagMatch = mvp.tags.some((tag) => normalizeText(tag).includes(query));
        const techMatch = mvp.techStack.some((tech) =>
          normalizeText(tech).includes(query)
        );

        return titleMatch || taglineMatch || summaryMatch || tagMatch || techMatch;
      });
    }
  }

  // 2. Filtro por nicho
  if (params.niche && params.niche !== "all" && params.niche.trim() !== "") {
    filtered = filtered.filter((mvp) => mvp.niche === params.niche);
  }

  // 3. Filtro por disponibilidad/estado
  if (params.status && params.status !== "all" && params.status.trim() !== "") {
    filtered = filtered.filter((mvp) => mvp.status === params.status);
  }

  // 4. Ordenamiento
  if (params.sort) {
    filtered.sort((a, b) => {
      if (params.sort === "price_asc") {
        if (a.price.kind === "quote" && b.price.kind === "quote") return 0;
        if (a.price.kind === "quote") return 1;
        if (b.price.kind === "quote") return -1;

        return a.price.amountMinor - b.price.amountMinor;
      }

      if (params.sort === "price_desc") {
        if (a.price.kind === "quote" && b.price.kind === "quote") return 0;
        if (a.price.kind === "quote") return 1;
        if (b.price.kind === "quote") return -1;

        return b.price.amountMinor - a.price.amountMinor;
      }

      if (params.sort === "newest") {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }

      return 0;
    });
  }

  return filtered;
}
