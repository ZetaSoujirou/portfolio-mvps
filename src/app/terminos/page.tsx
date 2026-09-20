import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { legalContent } from "@/content/legal";
import { siteConfig } from "@/config/site";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: `Términos y Condiciones | ${siteConfig.brandName}`,
  description: "Términos y condiciones generales de contratación y uso del catálogo.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/terminos`,
  },
};

export default function TerminosPage() {
  const { terminos, disclaimer } = legalContent;

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-10">
        {/* Banner informativo de borrador */}
        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-3 text-amber-300 text-xs sm:text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            <strong>Aviso de Borrador:</strong> {disclaimer}
          </p>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {terminos.title}
          </h1>
          <p className="text-xs font-mono text-muted">
            Última actualización: {terminos.lastUpdated}
          </p>
        </div>

        <div className="space-y-8 text-muted text-sm sm:text-base leading-relaxed divide-y divide-border">
          {terminos.sections.map((section, idx) => (
            <section key={idx} className={idx > 0 ? "pt-8 space-y-3" : "space-y-3"}>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                {section.title}
              </h2>
              <p>{section.content}</p>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
