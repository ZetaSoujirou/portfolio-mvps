import { MVP } from "@/lib/catalog/schema";
import {
  AlertCircle,
  Check,
  Clock,
  Code2,
  DollarSign,
  FileCheck,
  HelpCircle,
  Layers,
  Server,
  Shield,
  Truck,
  X,
} from "lucide-react";

interface MVPDetailsProps {
  mvp: MVP;
}

export function MVPDetails({ mvp }: MVPDetailsProps) {
  return (
    <div className="space-y-12 text-foreground">
      {/* 1. Resumen y Problemas que Resuelve */}
      <section className="space-y-6" aria-label="Problemas y solución">
        <div className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight">
            Resumen del proyecto
          </h2>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            {mvp.summary}
          </p>
        </div>

        {mvp.problemsSolved.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Problemas que resuelve
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {mvp.problemsSolved.map((problem, i) => (
                <li
                  key={i}
                  className="p-3 rounded-lg bg-surface border border-border text-xs sm:text-sm text-muted flex items-start gap-2.5"
                >
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 2. Funcionalidades Principales */}
      {mvp.features.length > 0 && (
        <section className="space-y-4" aria-label="Características principales">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-accent" />
            Características principales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mvp.features.map((feature, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-border bg-surface flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                <p className="text-sm text-foreground leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Qué Incluye vs Qué NO Incluye */}
      <section className="space-y-4" aria-label="Alcance y exclusiones">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-accent" />
          Alcance de la entrega
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Incluye */}
          <div className="p-5 rounded-xl border border-emerald-500/20 bg-surface space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Qué incluye la adquisición
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted">
              {mvp.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* No Incluye */}
          <div className="p-5 rounded-xl border border-zinc-700 bg-surface space-y-3">
            <h3 className="text-sm font-bold text-zinc-400 flex items-center gap-2">
              <X className="w-4 h-4 text-zinc-500" />
              Qué NO incluye (Límites claros)
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted">
              {mvp.excludes.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-zinc-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Stack Tecnológico y Requisitos */}
      <section className="space-y-6" aria-label="Especificaciones técnicas">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Code2 className="w-5 h-5 text-accent" />
          Especificaciones técnicas
        </h2>

        {/* Stack */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Tecnologías utilizadas
          </h3>
          <div className="flex flex-wrap gap-2">
            {mvp.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-surface border border-border text-xs font-mono text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Requisitos y Costos de Terceros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Requisitos */}
          <div className="p-5 rounded-xl border border-border bg-surface space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Server className="w-4 h-4 text-accent" />
              Requisitos de despliegue
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted">
              {mvp.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Costos de Terceros */}
          <div className="p-5 rounded-xl border border-border bg-surface space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-accent" />
              Costos recurrentes de terceros
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted">
              {mvp.thirdPartyCosts.map((cost, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>{cost}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-muted/70 pt-1 italic">
              * Estos costos se abonan directamente a cada proveedor externo de infraestructura o servicios.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Licencia, Soporte y Entrega */}
      <section className="space-y-4" aria-label="Condiciones comerciales">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" />
          Licencia, entrega y soporte
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Licencia */}
          <div className="p-5 rounded-xl border border-border bg-surface space-y-3">
            <h3 className="text-sm font-bold text-foreground">
              Modalidad de Licencia
            </h3>
            <div className="space-y-1.5 text-xs text-muted">
              <p>
                <strong className="text-foreground">Tipo:</strong>{" "}
                {mvp.license.mode === "exclusive" && "Exclusiva"}
                {mvp.license.mode === "non_exclusive" && "No exclusiva"}
                {mvp.license.mode === "to_agree" && "A convenir"}
              </p>
              <p>
                <strong className="text-foreground">Código fuente:</strong>{" "}
                {mvp.license.sourceCodeIncluded ? "Incluido completo" : "No incluido"}
              </p>
              <p>
                <strong className="text-foreground">Reventa:</strong>{" "}
                {mvp.license.resale === "allowed" && "Permitida"}
                {mvp.license.resale === "not_allowed" && "No permitida"}
                {mvp.license.resale === "to_agree" && "A convenir"}
              </p>
            </div>
            <p className="text-xs text-muted/90 pt-1 border-t border-border/60">
              {mvp.license.summary}
            </p>
          </div>

          {/* Entrega */}
          <div className="p-5 rounded-xl border border-border bg-surface space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Truck className="w-4 h-4 text-accent" />
              Tiempo de entrega
            </h3>
            <p className="text-lg font-bold text-accent font-mono">
              {mvp.delivery.estimate}
            </p>
            <ul className="space-y-1 text-xs text-muted">
              {mvp.delivery.conditions.map((cond, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5" />
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div className="p-5 rounded-xl border border-border bg-surface space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-accent" />
              Soporte técnico
            </h3>
            <p className="text-xs text-muted">
              {mvp.support.days
                ? `${mvp.support.days} días de acompañamiento técnico post-entrega.`
                : "Sin periodo de soporte posterior pactado."}
            </p>
            {mvp.support.scope.length > 0 && (
              <div className="space-y-1 text-xs text-muted">
                <span className="font-semibold text-foreground block">Incluye:</span>
                <p>{mvp.support.scope.join(", ")}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
