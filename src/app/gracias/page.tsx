import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Consulta Recibida",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GraciasPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
          ¡Consulta recibida con éxito!
        </h1>

        <p className="text-muted text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
          Tu mensaje ha sido registrado correctamente por nuestro sistema. Revisaremos los requerimientos técnicos y el alcance indicado para responderte con los siguientes pasos a la brevedad.
        </p>

        <div className="p-4 rounded-xl border border-border bg-surface text-xs text-muted max-w-md mb-8">
          <p>
            Nota: Si la consulta es urgente y configuraste un canal directo, también puedes contactarnos vía WhatsApp o responder directamente al correo una vez recibido.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-background font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-accent/10"
        >
          <span>Regresar al catálogo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </main>

      <Footer />
    </div>
  );
}
