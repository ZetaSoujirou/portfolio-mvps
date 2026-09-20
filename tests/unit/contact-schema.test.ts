import { describe, it, expect } from "vitest";
import { contactFormSchema } from "@/lib/contact/schema";

describe("contactFormSchema", () => {
  const validData = {
    name: "Juan Pérez",
    email: "juan@ejemplo.com",
    message: "Hola, me gustaría consultar por la adquisición de este proyecto.",
    honeypot: "",
    timestamp: Date.now() - 5000, // 5 segundos atrás
  };

  it("validates correct form data", () => {
    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("fails if name is too short or empty", () => {
    const result = contactFormSchema.safeParse({ ...validData, name: "A" });
    expect(result.success).toBe(false);
  });

  it("fails if email is invalid", () => {
    const result = contactFormSchema.safeParse({ ...validData, email: "no-email" });
    expect(result.success).toBe(false);
  });

  it("fails if message is too short", () => {
    const result = contactFormSchema.safeParse({ ...validData, message: "Hola" });
    expect(result.success).toBe(false);
  });

  it("fails if honeypot is filled", () => {
    const result = contactFormSchema.safeParse({ ...validData, honeypot: "bot-data" });
    expect(result.success).toBe(false);
  });

  it("fails if timestamp is too recent (< 3 seconds ago)", () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      timestamp: Date.now() - 1000, // solo 1 segundo atrás
    });
    expect(result.success).toBe(false);
  });

  it("accepts optional slug", () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      slug: "tienda-nicho",
    });
    expect(result.success).toBe(true);
  });
});
