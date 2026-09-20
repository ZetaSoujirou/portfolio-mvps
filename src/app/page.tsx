import { Suspense } from "react";
import { getAllMVPs } from "@/lib/catalog/repository";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { CatalogSection } from "@/components/catalog/catalog-section";
import { ProcessSection } from "@/components/home/process-section";
import { ComparisonSection } from "@/components/home/comparison-section";
import { FaqSection } from "@/components/home/faq-section";
import { ContactSection } from "@/components/contact/contact-section";

function CatalogLoadingFallback() {
  return (
    <div className="space-y-8 animate-pulse py-8">
      <div className="h-8 bg-surface rounded w-1/4" />
      <div className="h-12 bg-surface rounded w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-80 bg-surface rounded-xl border border-border" />
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  const mvps = await getAllMVPs();

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-24">
        {/* Hero */}
        <HeroSection />

        {/* Catálogo Interactivo con Filtros y Sincronización en URL */}
        <Suspense fallback={<CatalogLoadingFallback />}>
          <CatalogSection initialMVPs={mvps} />
        </Suspense>

        {/* Proceso de Compra y Transferencia */}
        <ProcessSection />

        {/* Comparativa con Desarrollo a Medida */}
        <ComparisonSection />

        {/* Preguntas Frecuentes */}
        <FaqSection />

        {/* Formulario y Canales de Contacto */}
        <ContactSection mvps={mvps} />
      </main>

      <Footer />
    </div>
  );
}
