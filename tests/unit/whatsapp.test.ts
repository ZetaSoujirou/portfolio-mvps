import { describe, it, expect } from "vitest";
import { buildWhatsAppLink } from "@/lib/whatsapp";

describe("buildWhatsAppLink", () => {
  it("returns null if phone is null, undefined, or empty", () => {
    expect(buildWhatsAppLink({ phone: null })).toBeNull();
    expect(buildWhatsAppLink({ phone: undefined })).toBeNull();
    expect(buildWhatsAppLink({ phone: "" })).toBeNull();
    expect(buildWhatsAppLink({ phone: "   " })).toBeNull();
  });

  it("normalizes phone number by removing non-digits and builds wa.me link", () => {
    const url = buildWhatsAppLink({ phone: "+56 9 1234 5678" });
    expect(url).toBe("https://wa.me/56912345678?text=Hola%2C%20quisiera%20consultar%20sobre%20tus%20proyectos%20de%20software.");
  });

  it("includes product title and canonical URL when provided", () => {
    const url = buildWhatsAppLink({
      phone: "+56 9 1234 5678",
      mvpTitle: "Tienda de nicho",
      canonicalUrl: "https://ejemplo.com/mvp/tienda-nicho",
    });

    expect(url).toContain("https://wa.me/56912345678?text=");
    expect(url).toContain("Tienda%20de%20nicho");
    expect(url).toContain("https%3A%2F%2Fejemplo.com%2Fmvp%2Ftienda-nicho");
  });

  it("returns null if phone has no valid digits", () => {
    expect(buildWhatsAppLink({ phone: "+- ()" })).toBeNull();
  });
});
