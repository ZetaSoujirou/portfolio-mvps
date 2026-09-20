import { homeContent } from "@/content/home";
import { Check, Info } from "lucide-react";

export function ComparisonSection() {
  return (
    <section id="comparativa" className="space-y-12 scroll-mt-20 py-8" aria-label="Comparativa de enfoques de desarrollo">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {homeContent.comparison.title}
        </h2>
        <p className="text-sm sm:text-base text-muted">
          {homeContent.comparison.subtitle}
        </p>
      </div>

      {/* Tabla comparativa para desktop y tarjetas para mobile */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Header de columnas */}
          <div className="hidden md:block p-6 bg-surface-subtle font-semibold text-xs uppercase tracking-wider text-muted">
            Criterio
          </div>
          <div className="hidden md:block p-6 bg-surface-subtle font-semibold text-xs uppercase tracking-wider text-accent">
            Adquirir MVP del catálogo
          </div>
          <div className="hidden md:block p-6 bg-surface-subtle font-semibold text-xs uppercase tracking-wider text-muted">
            Desarrollo a medida tradicional
          </div>
        </div>

        <div className="divide-y divide-border">
          {homeContent.comparison.items.map((item) => (
            <div
              key={item.feature}
              className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border"
            >
              {/* Característica */}
              <div className="p-5 font-semibold text-sm text-foreground bg-surface-subtle/40 flex items-center gap-2">
                <Info className="w-4 h-4 text-accent md:hidden" />
                {item.feature}
              </div>

              {/* MVP Catalog */}
              <div className="p-5 text-sm text-foreground flex items-start gap-2.5">
                <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="md:hidden text-xs font-semibold text-accent block mb-1">
                    Catálogo de MVPs:
                  </span>
                  <span>{item.mvpCatalog}</span>
                </div>
              </div>

              {/* Custom Dev */}
              <div className="p-5 text-sm text-muted flex items-start gap-2.5 bg-surface/30">
                <div className="w-1.5 h-1.5 rounded-full bg-muted/60 shrink-0 mt-2" />
                <div>
                  <span className="md:hidden text-xs font-semibold text-muted block mb-1">
                    A medida desde cero:
                  </span>
                  <span>{item.customDevelopment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
