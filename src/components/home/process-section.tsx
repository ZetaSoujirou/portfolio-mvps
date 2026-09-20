import { homeContent } from "@/content/home";
import { MessageSquareText, Handshake, Rocket } from "lucide-react";

const stepIcons = [MessageSquareText, Handshake, Rocket];

export function ProcessSection() {
  return (
    <section id="proceso" className="space-y-12 scroll-mt-20 py-8" aria-label="Cómo funciona el proceso de adquisición">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {homeContent.process.title}
        </h2>
        <p className="text-sm sm:text-base text-muted">
          {homeContent.process.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {homeContent.process.steps.map((step, index) => {
          const Icon = stepIcons[index] || MessageSquareText;
          return (
            <div
              key={step.number}
              className="relative flex flex-col rounded-xl border border-border bg-surface p-6 space-y-4 hover:border-border-strong transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-black text-accent/30 tracking-tight">
                  {step.number}
                </span>
                <div className="w-10 h-10 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-accent">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
