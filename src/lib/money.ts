import { Price } from "./catalog/schema";

/**
 * Formatea un objeto Price de acuerdo con su tipo, moneda y configuración regional.
 * 
 * Reglas de negocio:
 * - USD usa 2 decimales en amountMinor (149900 = $1,499.00 USD).
 * - CLP no tiene decimales menores (149900 = $149.900 CLP); no se divide por 100.
 * - 'from' siempre antepone «Desde ».
 * - 'quote' devuelve «A cotizar».
 */
export function formatPrice(price: Price, locale: string = "es-CL"): string {
  if (price.kind === "quote") {
    return "A cotizar";
  }

  const value = price.currency === "USD" ? price.amountMinor / 100 : price.amountMinor;
  const fractionDigits = price.currency === "USD" ? 2 : 0;

  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);

  if (price.kind === "from") {
    return `Desde ${formatted}`;
  }

  return formatted;
}

/**
 * Compara dos precios para ordenamiento.
 * - Solo compara importes cuando ambas monedas son idénticas.
 * - Los precios tipo 'quote' siempre van al final.
 */
export function comparePrices(a: Price, b: Price): number {
  if (a.kind === "quote" && b.kind === "quote") return 0;
  if (a.kind === "quote") return 1;
  if (b.kind === "quote") return -1;

  if (a.currency !== b.currency) {
    // Si las monedas difieren, no se pueden comparar directamente
    return 0;
  }

  return a.amountMinor - b.amountMinor;
}
