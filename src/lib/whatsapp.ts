interface WhatsAppLinkParams {
  phone?: string | null;
  mvpTitle?: string;
  canonicalUrl?: string;
}

/**
 * Normaliza el número telefónico internacional y construye un enlace seguro a wa.me.
 * Retorna null si el teléfono no está configurado o no contiene dígitos válidos.
 */
export function buildWhatsAppLink({
  phone,
  mvpTitle,
  canonicalUrl,
}: WhatsAppLinkParams): string | null {
  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return null;
  }

  // Elimina todo lo que no sea dígito
  const cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.length < 7) {
    return null;
  }

  let text = "Hola, quisiera consultar sobre tus proyectos de software.";
  if (mvpTitle) {
    text = `Hola, me interesa consultar por el proyecto "${mvpTitle}".`;
    if (canonicalUrl) {
      text += ` Ficha: ${canonicalUrl}`;
    }
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
