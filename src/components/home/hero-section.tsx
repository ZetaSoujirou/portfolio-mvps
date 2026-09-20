import { homeContent } from "@/content/home";
import { ArrowDown, Code2, ShieldCheck, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="text-center space-y-8 max-w-4xl mx-auto pt-12 pb-6 px-4">
      {/* Badge superior */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-surface border border-accent/30 text-accent shadow-sm">
        <Sparkles className="w-3.5 h-3.5" />
        <span>{homeContent.hero.badge}</span>
      </div>

      {/* Titular principal */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
        {homeContent.hero.title}
      </h1>

      {/* Subtítulo honesto */}
      <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
        {homeContent.hero.subtitle}
      </p>

      {/* Acciones principales */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <a
          href="#catalogo"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-background font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-accent/10"
        >
          {homeContent.hero.ctaPrimary}
          <ArrowDown className="w-4 h-4" />
        </a>
        <a
          href="#proceso"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface border border-border text-foreground font-semibold text-sm hover:bg-surface-hover hover:border-border-strong transition-all"
        >
          {homeContent.hero.ctaSecondary}
        </a>
      </div>

      {/* Aclaración sobre el modelo de negocio */}
      <p className="text-xs text-muted/80 max-w-xl mx-auto italic pt-2">
        {homeContent.hero.clarification}
      </p>

      {/* Micro-destacados de confianza */}
      <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto border-t border-border/60 text-left">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-surface/40 border border-border/40">
          <Code2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-semibold text-foreground block">Código fuente transferible</span>
            <span className="text-muted">Sin ataduras propietarias ni suscripciones sorpresa.</span>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg bg-surface/40 border border-border/40">
          <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-semibold text-foreground block">Cierre asistido y seguro</span>
            <span className="text-muted">Validamos alcance, personalización y puesta en marcha.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
