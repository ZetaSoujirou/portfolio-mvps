export type AnalyticsEvent =
  | "view_mvp"
  | "click_whatsapp"
  | "click_live_demo"
  | "play_demo_video"
  | "open_demo_video"
  | "submit_lead";

export interface AnalyticsPayload {
  slug?: string;
  ctaLocation?: string;
}

/**
 * Registra un evento de analítica respetando la configuración y privacidad.
 * Solo se procesa si NEXT_PUBLIC_ANALYTICS_ENABLED está configurado en "true".
 *
 * REGLA ESTRICTA: Solo se permiten propiedades 'slug' y 'ctaLocation'.
 * Prohibido enviar nombres, correos, mensajes, números o IPs.
 */
export function trackEvent(
  event: AnalyticsEvent,
  payload: AnalyticsPayload = {}
): void {
  const isEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
  if (!isEnabled) {
    return;
  }

  // Sanitización de propiedades permitidas
  const cleanData: Record<string, string> = {};
  if (payload.slug) cleanData.slug = payload.slug;
  if (payload.ctaLocation) cleanData.ctaLocation = payload.ctaLocation;

  // Integración opcional con proveedores de analítica (ej. va de Vercel Analytics o similar)
  if (typeof window !== "undefined" && (window as unknown as { va?: (name: string, data: Record<string, string>) => void }).va) {
    (window as unknown as { va: (name: string, data: Record<string, string>) => void }).va(
      event,
      cleanData
    );
  }
}
