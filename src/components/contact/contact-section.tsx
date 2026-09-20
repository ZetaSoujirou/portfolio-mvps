import { MVP } from "@/lib/catalog/schema";
import { siteConfig } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { ContactForm } from "./contact-form";
import { Mail, MessageCircle, ShieldCheck } from "lucide-react";

interface ContactSectionProps {
  mvps: MVP[];
}

export function ContactSection({ mvps }: ContactSectionProps) {
  const whatsappUrl = buildWhatsAppLink({
    phone: siteConfig.whatsappNumber,
  });

  return (
    <section id="contacto" className="space-y-12 scroll-mt-20 py-8" aria-label="Contacto y consultas comerciales">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Consulta o Solicita un Proyecto
        </h2>
        <p className="text-sm sm:text-base text-muted">
          Ponte en contacto para coordinar alcance, resolver dudas técnicas o solicitar la transferencia de cualquiera de nuestros MVPs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Canales Directos e Información */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl border border-border bg-surface space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent" />
              Cierre comercial transparente
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Cada proyecto se transfiere con acuerdo por escrito de licencia, repositorio de código fuente y sesión de acompañamiento para la puesta en marcha.
            </p>
          </div>

          {/* WhatsApp Directo si está configurado */}
          {whatsappUrl && (
            <div className="p-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <MessageCircle className="w-5 h-5" />
                <span>Conversación directa por WhatsApp</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                ¿Prefieres consultar directamente por chat? Inicia una conversación sin compromiso.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-background font-bold text-xs hover:bg-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Abrir WhatsApp
              </a>
            </div>
          )}

          {/* Email Directo si está configurado */}
          {siteConfig.publicEmail && (
            <div className="p-6 rounded-xl border border-border bg-surface space-y-2">
              <span className="text-xs text-muted font-semibold uppercase tracking-wider block">
                Correo electrónico directo
              </span>
              <a
                href={`mailto:${siteConfig.publicEmail}`}
                className="text-sm font-mono text-accent hover:underline flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {siteConfig.publicEmail}
              </a>
            </div>
          )}
        </div>

        {/* Formulario de Contacto */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl border border-border bg-surface">
          <ContactForm mvps={mvps} />
        </div>
      </div>
    </section>
  );
}
