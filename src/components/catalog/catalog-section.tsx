"use client";

import { useState, useEffect, useTransition, useCallback, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MVP } from "@/lib/catalog/schema";
import { filterAndSortMVPs } from "@/lib/catalog/search";
import { CatalogFilters, FilterState } from "./catalog-filters";
import { MVPCard } from "./mvp-card";
import { EmptyState } from "./empty-state";

interface CatalogSectionProps {
  initialMVPs: MVP[];
}

export function CatalogSection({ initialMVPs }: CatalogSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Lee el estado inicial desde la URL
  const urlQ = searchParams.get("q") ?? "";
  const urlNiche = searchParams.get("niche") ?? "all";
  const urlStatus = searchParams.get("status") ?? "all";
  const urlSort = searchParams.get("sort") ?? "newest";

  // Estado local para input inmediato
  const [searchInput, setSearchInput] = useState(urlQ);

  // Sincroniza estado local si cambia la URL externamente (ej. navegación Atrás/Adelante)
  useEffect(() => {
    setSearchInput(urlQ);
  }, [urlQ]);

  // Actualiza la URL sincronizando los searchParams sin recarga completa
  const updateURL = useCallback(
    (newParams: Partial<FilterState>) => {
      const current = new URLSearchParams(searchParams.toString());

      if (newParams.q !== undefined) {
        if (newParams.q.trim()) {
          current.set("q", newParams.q.trim());
        } else {
          current.delete("q");
        }
      }

      if (newParams.niche !== undefined) {
        if (newParams.niche && newParams.niche !== "all") {
          current.set("niche", newParams.niche);
        } else {
          current.delete("niche");
        }
      }

      if (newParams.status !== undefined) {
        if (newParams.status && newParams.status !== "all") {
          current.set("status", newParams.status);
        } else {
          current.delete("status");
        }
      }

      if (newParams.sort !== undefined) {
        if (newParams.sort && newParams.sort !== "newest") {
          current.set("sort", newParams.sort);
        } else {
          current.delete("sort");
        }
      }

      const queryString = current.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}#catalogo` : `${pathname}#catalogo`;

      startTransition(() => {
        router.replace(targetUrl, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  // Debounce para la búsqueda textual (300 ms)
  useEffect(() => {
    if (searchInput === urlQ) return;

    const timer = setTimeout(() => {
      updateURL({ q: searchInput });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, urlQ, updateURL]);

  // Manejador de cambios directos desde filtros
  const handleFilterChange = useCallback(
    (updates: Partial<FilterState>) => {
      if (updates.q !== undefined) {
        setSearchInput(updates.q);
      }
      if (
        updates.niche !== undefined ||
        updates.status !== undefined ||
        updates.sort !== undefined
      ) {
        updateURL(updates);
      }
    },
    [updateURL]
  );

  // Limpiar todos los filtros
  const handleReset = useCallback(() => {
    setSearchInput("");
    startTransition(() => {
      router.replace(`${pathname}#catalogo`, { scroll: false });
    });
  }, [pathname, router]);

  // Filtra y ordena los MVPs según los parámetros activos en la URL
  const filteredMVPs = useMemo(() => {
    return filterAndSortMVPs(initialMVPs, {
      q: searchInput || urlQ,
      niche: urlNiche,
      status: urlStatus,
      sort: urlSort,
    });
  }, [initialMVPs, searchInput, urlQ, urlNiche, urlStatus, urlSort]);

  const currentFilters: FilterState = {
    q: searchInput,
    niche: urlNiche,
    status: urlStatus,
    sort: urlSort,
  };

  return (
    <section id="catalogo" className="space-y-8 scroll-mt-20" aria-label="Catálogo de MVPs">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Catálogo de MVPs
          </h2>
          <p className="text-sm text-muted mt-1">
            Explora las soluciones tecnológicas listas para ser transferidas e integradas en tu negocio.
          </p>
        </div>
      </div>

      {/* Controles de búsqueda y filtros */}
      <CatalogFilters
        filters={currentFilters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        totalCount={initialMVPs.length}
        filteredCount={filteredMVPs.length}
      />

      {/* Grid de MVPs o estado vacío */}
      {filteredMVPs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMVPs.map((mvp) => (
            <MVPCard key={mvp.id} mvp={mvp} />
          ))}
        </div>
      ) : (
        <EmptyState onReset={handleReset} />
      )}
    </section>
  );
}
