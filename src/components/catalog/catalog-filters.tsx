import { Search, X, RotateCcw, SlidersHorizontal } from "lucide-react";

export interface FilterState {
  q: string;
  niche: string;
  status: string;
  sort: string;
}

interface CatalogFiltersProps {
  filters: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

const niches = [
  { id: "all", label: "Todos" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "ia", label: "Inteligencia Artificial" },
  { id: "automatizacion", label: "Automatización" },
  { id: "fintech", label: "Fintech" },
  { id: "salud", label: "Salud" },
  { id: "otros", label: "Otros" },
];

const statuses = [
  { id: "all", label: "Todos los estados" },
  { id: "available", label: "Disponibles" },
  { id: "custom_order", label: "Bajo encargo" },
  { id: "sold", label: "Vendidos" },
];

const sortOptions = [
  { id: "newest", label: "Más recientes" },
  { id: "price_asc", label: "Precio: menor a mayor" },
  { id: "price_desc", label: "Precio: mayor a menor" },
];

export function CatalogFilters({
  filters,
  onFilterChange,
  onReset,
  totalCount,
  filteredCount,
}: CatalogFiltersProps) {
  const hasActiveFilters = Boolean(
    filters.q ||
      (filters.niche && filters.niche !== "all") ||
      (filters.status && filters.status !== "all") ||
      (filters.sort && filters.sort !== "newest")
  );

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda y controles superiores */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Input de búsqueda */}
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
            <Search className="w-4 h-4" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={filters.q}
            onChange={(e) => onFilterChange({ q: e.target.value })}
            placeholder="Buscar por título, tecnología, etiquetas..."
            className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted/60 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            aria-label="Buscar en el catálogo de MVPs"
          />
          {filters.q && (
            <button
              type="button"
              onClick={() => onFilterChange({ q: "" })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-foreground transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Selectores de Estado y Orden */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Selector de Estado */}
          <div className="flex items-center gap-2">
            <label htmlFor="filter-status" className="sr-only">
              Filtrar por estado
            </label>
            <select
              id="filter-status"
              value={filters.status || "all"}
              onChange={(e) => onFilterChange({ status: e.target.value })}
              className="px-3 py-2 rounded-lg bg-surface border border-border text-xs text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
            >
              {statuses.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de Orden */}
          <div className="flex items-center gap-2">
            <label htmlFor="filter-sort" className="sr-only">
              Ordenar por
            </label>
            <select
              id="filter-sort"
              value={filters.sort || "newest"}
              onChange={(e) => onFilterChange({ sort: e.target.value })}
              className="px-3 py-2 rounded-lg bg-surface border border-border text-xs text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pestañas de Nicho (Pills horizontales) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <span className="text-xs text-muted font-medium mr-1 flex items-center gap-1 shrink-0">
          <SlidersHorizontal className="w-3 h-3 text-accent" />
          Nicho:
        </span>
        {niches.map((n) => {
          const isActive = (filters.niche || "all") === n.id;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => onFilterChange({ niche: n.id })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-accent ${
                isActive
                  ? "bg-accent text-background font-semibold shadow-sm"
                  : "bg-surface border border-border text-muted hover:text-foreground hover:bg-surface-hover"
              }`}
            >
              {n.label}
            </button>
          );
        })}
      </div>

      {/* Barra de estado: contador y reset */}
      <div className="flex items-center justify-between text-xs text-muted border-t border-border/60 pt-3">
        <span>
          Mostrando <strong className="text-foreground">{filteredCount}</strong> de{" "}
          <strong className="text-foreground">{totalCount}</strong> proyectos
        </span>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-accent hover:underline font-medium focus:outline-none"
          >
            <RotateCcw className="w-3 h-3" />
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}
