import Link from "next/link";
import Image from "next/image";
import { MVP } from "@/lib/catalog/schema";
import { formatPrice } from "@/lib/money";
import { siteConfig } from "@/config/site";
import { ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";

interface MVPCardProps {
  mvp: MVP;
}

const statusConfig = {
  available: {
    label: "Disponible",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: CheckCircle2,
  },
  sold: {
    label: "Vendido",
    className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/30",
    icon: null,
  },
  custom_order: {
    label: "Bajo encargo",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: Clock,
  },
} as const;

export function MVPCard({ mvp }: MVPCardProps) {
  const status = statusConfig[mvp.status];
  const StatusIcon = status.icon;

  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-surface p-4 transition-all duration-200 hover:border-border-strong hover:bg-surface-hover hover:shadow-lg hover:shadow-accent/5">
      {/* Portada */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-surface-subtle border border-border mb-4">
        <Image
          src={mvp.cover.src}
          alt={mvp.cover.alt}
          width={mvp.cover.width}
          height={mvp.cover.height}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badge de muestra */}
        {mvp.isSample && (
          <span className="absolute top-2.5 left-2.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-surface/90 text-accent border border-accent/40 backdrop-blur-sm shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Proyecto de ejemplo
          </span>
        )}

        {/* Badge de estado */}
        <span
          className={`absolute top-2.5 right-2.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full border backdrop-blur-sm flex items-center gap-1 ${status.className}`}
        >
          {StatusIcon && <StatusIcon className="w-3 h-3" />}
          {status.label}
        </span>
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Nicho y tags */}
          <div className="flex items-center justify-between text-xs">
            <span className="uppercase font-mono font-semibold tracking-wider text-accent">
              {mvp.niche}
            </span>
          </div>

          {/* Título */}
          <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
            <Link href={`/mvp/${mvp.slug}`} className="focus:outline-none focus:underline">
              <span className="absolute inset-0 z-10" aria-hidden="true" />
              {mvp.title}
            </Link>
          </h3>

          {/* Tagline */}
          <p className="text-sm text-muted line-clamp-2 leading-relaxed">
            {mvp.tagline}
          </p>

          {/* Stack técnico resumido */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {mvp.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-subtle text-muted border border-border"
              >
                {tech}
              </span>
            ))}
            {mvp.techStack.length > 3 && (
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded text-muted/70">
                +{mvp.techStack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer de la tarjeta con precio y CTA */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <div>
            <span className="text-[11px] text-muted uppercase font-medium tracking-wider block">
              Precio
            </span>
            <span className="text-base font-bold text-foreground">
              {formatPrice(mvp.price, siteConfig.locale)}
            </span>
          </div>

          <span className="text-xs text-accent font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Ver ficha
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
