import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { submitContactForm } from "@/actions/contact";

// Mock de next/headers
vi.mock("next/headers", () => ({
  headers: async () => ({
    get: (header: string) => {
      if (header === "x-forwarded-for") return "192.168.1.50";
      return null;
    },
  }),
}));

describe("submitContactForm Server Action", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  const validPayload = {
    name: "Carlos Mendoza",
    email: "carlos@techcorp.com",
    message: "Quisiera solicitar información para adquirir la base de código de este MVP.",
    honeypot: "",
    timestamp: Date.now() - 5000,
  };

  it("fails with VALIDATION_ERROR if honeypot is filled", async () => {
    const result = await submitContactForm({
      ...validPayload,
      honeypot: "spam_bot_content",
    });

    expect(result.success).toBe(false);
    if (!result.success && result.error === "VALIDATION_ERROR") {
      expect(result.fieldErrors.honeypot).toBeDefined();
    }
  });

  it("fails with VALIDATION_ERROR if submitted too quickly (< 3 seconds)", async () => {
    const result = await submitContactForm({
      ...validPayload,
      timestamp: Date.now() - 1000,
    });

    expect(result.success).toBe(false);
    if (!result.success && result.error === "VALIDATION_ERROR") {
      expect(result.fieldErrors.timestamp).toBeDefined();
    }
  });

  it("fails with VALIDATION_ERROR if slug does not exist in catalog", async () => {
    const result = await submitContactForm({
      ...validPayload,
      slug: "slug-inexistente-xyz",
    });

    expect(result.success).toBe(false);
    if (!result.success && result.error === "VALIDATION_ERROR") {
      expect(result.fieldErrors.slug).toBeDefined();
    }
  });

  it("returns CONFIG_ERROR if Resend credentials are not set", async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_FROM_EMAIL;
    delete process.env.CONTACT_EMAIL_TO;

    const result = await submitContactForm(validPayload);

    expect(result.success).toBe(false);
    if (!result.success && result.error === "CONFIG_ERROR") {
      expect(result.message).toContain("no se encuentra configurado");
    }
  });

  it("returns success if Resend API returns 200 OK", async () => {
    process.env.RESEND_API_KEY = "re_test_key_123";
    process.env.RESEND_FROM_EMAIL = "contacto@mimarcatech.com";
    process.env.CONTACT_EMAIL_TO = "ventas@mimarcatech.com";

    // Mock global fetch para Resend
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "email_123" }),
    });
    global.fetch = mockFetch;

    const result = await submitContactForm(validPayload);

    expect(result.success).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
      })
    );
  });
});
