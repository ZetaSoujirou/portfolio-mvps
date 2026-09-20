"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MVP } from "@/lib/catalog/schema";
import { submitContactForm } from "@/actions/contact";
import { trackEvent } from "@/lib/analytics";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

interface ContactFormProps {
  mvps: MVP[];
  preselectedSlug?: string;
}

export function ContactForm({ mvps, preselectedSlug }: ContactFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Campos del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [slug, setSlug] = useState(preselectedSlug || "");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [timestamp, setTimestamp] = useState<number>(0);

  // Estados de validación y error
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // Inicializa timestamp en cliente
  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  // Sincroniza si cambia el preselectedSlug
  useEffect(() => {
    if (preselectedSlug) {
      setSlug(preselectedSlug);
    }
  }, [preselectedSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;

    setGeneralError(null);
    setFieldErrors({});

    startTransition(async () => {
      const result = await submitContactForm({
        name,
        email,
        slug: slug || undefined,
        message,
        honeypot,
        timestamp,
      });

      if (result.success) {
        trackEvent("submit_lead", {
          slug: slug || undefined,
          ctaLocation: "contact_form",
        });
        router.push("/gracias");
      } else {
        if (result.error === "VALIDATION_ERROR") {
          setFieldErrors(result.fieldErrors);
          setGeneralError("Por favor revisa los campos marcados en rojo.");
        } else if (result.error === "RATE_LIMITED") {
          setGeneralError(result.message);
        } else if (result.error === "CONFIG_ERROR") {
          setGeneralError(result.message);
        } else {
          setGeneralError(result.message || "Ocurrió un error inesperado.");
        }
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-xl mx-auto"
      noValidate
      aria-label="Formulario de contacto comercial"
    >
      {/* Mensaje de Error General */}
      {generalError && (
        <div
          role="alert"
          className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-xs sm:text-sm flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{generalError}</p>
        </div>
      )}

      {/* Campo Honeypot Oculto (Anti-bots) */}
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="website_hp">No llenar este campo</label>
        <input
          id="website_hp"
          type="text"
          name="website_hp"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Nombre */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-foreground">
          Nombre completo <span className="text-accent">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isPending}
          placeholder="Ej. Ana Morales"
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
          className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
        />
        {fieldErrors.name && (
          <p id="name-error" className="text-xs text-red-400">
            {fieldErrors.name[0]}
          </p>
        )}
      </div>

      {/* Correo Electrónico */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-foreground">
          Correo electrónico profesional <span className="text-accent">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isPending}
          placeholder="ejemplo@empresa.com"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
          className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
        />
        {fieldErrors.email && (
          <p id="email-error" className="text-xs text-red-400">
            {fieldErrors.email[0]}
          </p>
        )}
      </div>

      {/* Proyecto de Interés (Opcional) */}
      <div className="space-y-1.5">
        <label htmlFor="slug" className="text-xs font-semibold uppercase tracking-wider text-foreground">
          Proyecto de interés (Opcional)
        </label>
        <select
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          disabled={isPending}
          className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
        >
          <option value="">Consulta general / Otro proyecto</option>
          {mvps.map((m) => (
            <option key={m.slug} value={m.slug}>
              {m.title} ({m.niche})
            </option>
          ))}
        </select>
      </div>

      {/* Mensaje */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-foreground">
          Detalles de tu consulta o requerimiento <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={isPending}
          placeholder="Cuéntanos sobre tu caso de uso, dudas sobre el código, adaptaciones necesarias o plazos previstos..."
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 resize-y"
        />
        {fieldErrors.message && (
          <p id="message-error" className="text-xs text-red-400">
            {fieldErrors.message[0]}
          </p>
        )}
        <p className="text-[11px] text-muted text-right">
          {message.length} / 2000 caracteres
        </p>
      </div>

      {/* Aviso de Privacidad */}
      <p className="text-xs text-muted leading-relaxed">
        Al enviar este formulario aceptas el tratamiento de tus datos para responder a tu consulta conforme a nuestra{" "}
        <Link href="/privacidad" className="text-accent underline hover:text-foreground">
          Política de Privacidad
        </Link>
        . No enviamos correos comerciales ni publicidad no solicitada.
      </p>

      {/* Botón de Envío */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-background font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-accent/10 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Enviando consulta...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Enviar consulta comercial</span>
          </>
        )}
      </button>
    </form>
  );
}
