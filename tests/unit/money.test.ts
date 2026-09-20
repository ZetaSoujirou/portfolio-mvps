import { describe, it, expect } from "vitest";
import { formatPrice, comparePrices } from "@/lib/money";
import { Price } from "@/lib/catalog/schema";

describe("Money formatting (formatPrice)", () => {
  it("formats USD fixed price with 2 decimals from minor units", () => {
    const price: Price = {
      kind: "fixed",
      amountMinor: 149900, // 1499.00 USD
      currency: "USD",
    };
    const formatted = formatPrice(price, "en-US");
    expect(formatted).toBe("$1,499.00");
  });

  it("formats USD 'from' price with 'Desde ' prefix", () => {
    const price: Price = {
      kind: "from",
      amountMinor: 99000, // 990.00 USD
      currency: "USD",
    };
    const formatted = formatPrice(price, "en-US");
    expect(formatted).toBe("Desde $990.00");
  });

  it("formats CLP without dividing by 100", () => {
    const price: Price = {
      kind: "fixed",
      amountMinor: 149900, // 149.900 CLP
      currency: "CLP",
    };
    const formatted = formatPrice(price, "es-CL");
    // es-CL format for CLP uses $149.900 or similar
    expect(formatted.replace(/\s/g, " ")).toContain("149.900");
  });

  it("returns 'A cotizar' for quote kinds", () => {
    const price: Price = {
      kind: "quote",
      currency: "USD",
    };
    expect(formatPrice(price)).toBe("A cotizar");
  });
});

describe("Price comparison (comparePrices)", () => {
  it("sorts fixed prices correctly in same currency", () => {
    const cheap: Price = { kind: "fixed", amountMinor: 5000, currency: "USD" };
    const expensive: Price = { kind: "fixed", amountMinor: 15000, currency: "USD" };
    expect(comparePrices(cheap, expensive)).toBeLessThan(0);
    expect(comparePrices(expensive, cheap)).toBeGreaterThan(0);
  });

  it("always places quote prices at the end", () => {
    const fixed: Price = { kind: "fixed", amountMinor: 5000, currency: "USD" };
    const quote: Price = { kind: "quote", currency: "USD" };
    expect(comparePrices(fixed, quote)).toBeLessThan(0);
    expect(comparePrices(quote, fixed)).toBeGreaterThan(0);
    expect(comparePrices(quote, quote)).toBe(0);
  });
});
