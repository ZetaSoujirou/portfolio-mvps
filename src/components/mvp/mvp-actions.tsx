import Link from "next/link";
import { MVP } from "@/lib/catalog/schema";
import { formatPrice } from "@/lib/money";
import { siteConfig } from "@/config/site";
import { ArrowUpRight, CheckCircle2, Clock, MessageSquare, Sparkles } from "lucide-react";

interface MVPActionsProps {
  mvp: MVP;
}

export function MVPActions({ mvp }: MVPActionsProps) {
  // Configuración de CTA según disponibilidad
  let primaryCtaText = "Solicitar compra";
  let primaryCtaHref = `/#contacto?slug=${mvp.slug}`;
  let primaryCtaIcon = MessageSquare;

  if (mvp.status === "sold") {
    primaryCtaText = "Consultar una alternativa";
    primaryCtaHref = `/#contacto?slug=${mvp.slug}&type=alternative`;
  } else if (mvp.status === "custom_order") {
    primaryCtaText = "Solicitar desarrollo similar";
    primaryCtaHref = `/#contacto?slug=${mvp.slug}&type=custom`;
    primaryCtaIcon = Clock;
  }

  const PrimaryIcon = primaryCtaIcon;

  return (
    <>
      {/* Panel de acciones en Desktop */}
      <div className="rounded-xl border border-border bg-surface p-6 space-y-6">
        {/* Precio e Info de Muestra */}
        <div className="space-y-2 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold tracking-wider text-muted">
              Precio base
            </span>
            {mvp.isSample && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/30">
                <Sparkles className="w-3 h-3" />
                Ejemplo ilustrativo
              </span>
            )}
          </div>
          <div className="text-3xl font-extrabold text-foreground">
            {formatPrice(mvp.price, siteConfig.locale)}
          </div>
          <p className="text-xs text-muted">
            {mvp.price.kind === "from" && "Precio orientativo inicial. El costo final depende del alcance."}
            {mvp.price.kind === "fixed" && "Precio cerrado por la base tecnológica tal como se describe."}
            {mvp.price.kind === "quote" && "Proyecto bajo encargo. Cotización personalizada según requerimientos."}
          </p>
        </div>

        {/* Estado y Disponibilidad */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted">Estado del proyecto:</span>
          <span className="font-semibold capitalize flex items-center gap-1.5">
            {mvp.status === "available" && (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Disponible para entrega</span>
              </>
            )}
            {mvp.status === "sold" && (
              <span className="text-zinc-400">Vendido (Disponible para desarrollo similar)</span>
            )}
            {mvp.status === "custom_order" && (
              <>
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-400">Desarrollo bajo encargo</span>
              </>
            )}
          </span>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3 pt-2">
          <Link
            href={primaryCtaHref}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-background font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-accent/10 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <PrimaryIcon className="w-4 h-4" />
            {primaryCtaText}
          </Link>

          {mvp.liveDemoUrl && (
            <a
              href={mvp.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-subtle border border-border text-foreground font-semibold text-xs hover:bg-surface-hover hover:border-border-strong transition-all focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
              Ver demostración interactiva
            </a>
          )}
        </div>

        <div className="pt-4 border-t border-border/60 text-[11px] text-muted space-y-1.5">
          <p>• Transparencia comercial: cierre y formalización asistidos.</p>
          <p>• Sin cargos automáticos en la tarjeta.</p>
        </div>
      </div>

      {/* Barra de acción fija en móviles (Mobile Sticky Bar) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-surface/95 border-t border-border backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-2xl">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div>
            <span className="text-[10px] text-muted block uppercase tracking-wider font-semibold">
              Precio
            </span>
            <span className="text-base font-bold text-foreground">
              {formatPrice(mvp.price, siteConfig.locale)}
            </span>
          </div>

          <Link
            href={primaryCtaHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-background font-bold text-xs hover:opacity-90 transition-opacity shadow-sm"
          >
            <PrimaryIcon className="w-3.5 h-3.5" />
            {primaryCtaText}
          </Link>
        </div>
      </div>
    </>
  );
}
