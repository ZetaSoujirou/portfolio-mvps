import { SearchX, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-border border-dashed bg-surface/50 p-12 text-center flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto my-8">
      <div className="w-12 h-12 rounded-full bg-surface-subtle border border-border flex items-center justify-center text-muted">
        <SearchX className="w-6 h-6 text-accent" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-foreground">
          No se encontraron proyectos
        </h3>
        <p className="text-sm text-muted">
          No hay resultados que coincidan con los filtros o término de búsqueda aplicado. Intenta ajustar los criterios.
        </p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-surface border border-border text-foreground hover:bg-surface-hover hover:border-border-strong transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <RotateCcw className="w-3.5 h-3.5 text-accent" />
        Limpiar todos los filtros
      </button>
    </div>
  );
}
