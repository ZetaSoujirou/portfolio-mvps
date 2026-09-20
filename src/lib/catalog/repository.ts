import { sampleMVPs } from "@/data/mvps";
import { MVP, MVPNiche, MVPStatus } from "./schema";

export interface MVPFilters {
  query?: string;
  niche?: MVPNiche | "todos";
  status?: MVPStatus | "todos";
  sortBy?: "price_asc" | "price_desc" | "newest";
}

/**
 * Obtiene todos los MVPs del catálogo.
 */
export async function getAllMVPs(): Promise<MVP[]> {
  return sampleMVPs;
}

/**
 * Obtiene un MVP por su slug único. Retorna null si no existe.
 */
export async function getMVPBySlug(slug: string): Promise<MVP | null> {
  const mvp = sampleMVPs.find((item) => item.slug === slug);
  return mvp ?? null;
}

/**
 * Normaliza una cadena de texto para búsqueda insensible a mayúsculas y tildes.
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Filtra y ordena los MVPs según los criterios especificados.
 */
export async function filterMVPs(filters: MVPFilters): Promise<MVP[]> {
  let list = await getAllMVPs();

  // Búsqueda por texto (título, tagline, resumen, tags, techStack)
  if (filters.query && filters.query.trim() !== "") {
    const q = normalizeText(filters.query.trim());
    list = list.filter((item) => {
      const matchTitle = normalizeText(item.title).includes(q);
      const matchTagline = normalizeText(item.tagline).includes(q);
      const matchSummary = normalizeText(item.summary).includes(q);
      const matchTags = item.tags.some((tag) => normalizeText(tag).includes(q));
      const matchStack = item.techStack.some((tech) => normalizeText(tech).includes(q));
      return matchTitle || matchTagline || matchSummary || matchTags || matchStack;
    });
  }

  // Filtro por nicho
  if (filters.niche && filters.niche !== "todos") {
    list = list.filter((item) => item.niche === filters.niche);
  }

  // Filtro por estado
  if (filters.status && filters.status !== "todos") {
    list = list.filter((item) => item.status === filters.status);
  }

  // Ordenamiento
  if (filters.sortBy) {
    if (filters.sortBy === "newest") {
      list = [...list].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    } else if (filters.sortBy === "price_asc") {
      list = [...list].sort((a, b) => {
        if (a.price.kind === "quote") return 1;
        if (b.price.kind === "quote") return -1;
        return a.price.amountMinor - b.price.amountMinor;
      });
    } else if (filters.sortBy === "price_desc") {
      list = [...list].sort((a, b) => {
        if (a.price.kind === "quote") return 1;
        if (b.price.kind === "quote") return -1;
        return b.price.amountMinor - a.price.amountMinor;
      });
    }
  }

  return list;
}
