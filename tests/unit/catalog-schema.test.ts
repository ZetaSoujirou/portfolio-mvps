import { describe, it, expect } from "vitest";
import { mvpSchema } from "@/lib/catalog/schema";
import { sampleMVPs } from "@/data/mvps";

describe("Catalog MVP Schema (Zod)", () => {
  it("validates all sample MVPs successfully", () => {
    for (const mvp of sampleMVPs) {
      const result = mvpSchema.safeParse(mvp);
      expect(result.success).toBe(true);
    }
  });

  it("fails if slug contains invalid uppercase or spaces", () => {
    const invalidMVP = {
      ...sampleMVPs[0],
      slug: "Tienda De Nicho",
    };
    const result = mvpSchema.safeParse(invalidMVP);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("URL-safe");
    }
  });

  it("fails if amountMinor is negative", () => {
    const invalidMVP = {
      ...sampleMVPs[0],
      price: {
        kind: "fixed" as const,
        amountMinor: -500,
        currency: "USD" as const,
      },
    };
    const result = mvpSchema.safeParse(invalidMVP);
    expect(result.success).toBe(false);
  });

  it("fails if required fields are missing", () => {
    const { title, ...missingTitle } = sampleMVPs[0];
    const result = mvpSchema.safeParse(missingTitle);
    expect(result.success).toBe(false);
  });

  it("ensures all sample MVPs have unique slugs and IDs", () => {
    const slugs = sampleMVPs.map((m) => m.slug);
    const ids = sampleMVPs.map((m) => m.id);
    expect(new Set(slugs).size).toBe(sampleMVPs.length);
    expect(new Set(ids).size).toBe(sampleMVPs.length);
  });
});
