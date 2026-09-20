import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { siteConfig } from "@/config/site";
import { mvpSchema } from "@/lib/catalog/schema";
import { getAllMVPs } from "@/lib/catalog/repository";

describe("Security and Secret Leakage Check", () => {
  it("ensures no server secrets use NEXT_PUBLIC_ prefix in .env.example", () => {
    const envExamplePath = path.resolve(process.cwd(), ".env.example");
    const content = fs.readFileSync(envExamplePath, "utf-8");
    const lines = content.split("\n");

    const forbiddenSecretKeywords = [
      "RESEND_API_KEY",
      "UPSTASH_REDIS_REST_TOKEN",
      "RATE_LIMIT_SALT",
    ];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const [key] = trimmed.split("=");
      if (key.startsWith("NEXT_PUBLIC_")) {
        for (const secret of forbiddenSecretKeywords) {
          expect(key).not.toContain(secret);
        }
      }
    }
  });

  it("verifies siteConfig does not contain secret tokens or private keys", () => {
    const keys = Object.keys(siteConfig);
    const forbiddenKeys = [
      "secret",
      "token",
      "password",
      "apiKey",
      "privateKey",
    ];

    for (const key of keys) {
      for (const forbidden of forbiddenKeys) {
        expect(key.toLowerCase()).not.toContain(forbidden);
      }
    }
  });
});

describe("Extensibility: Brand & Catalog", () => {
  it("allows adding a new valid MVP conforming to schema", () => {
    const newMVP = {
      id: "mvp-test-custom",
      slug: "test-custom-mvp",
      title: "Plataforma de Reservas Médicas",
      tagline: "Sistema de gestión de citas y telemedicina para clínicas",
      niche: "salud" as const,
      tags: ["salud", "citas", "telemedicina"],
      status: "available" as const,
      isSample: false,
      featured: true,
      price: {
        kind: "fixed" as const,
        amountMinor: 180000,
        currency: "USD" as const,
      },
      techStack: ["Next.js", "PostgreSQL", "WebRTC"],
      cover: {
        src: "/images/mvps/test.svg",
        alt: "Reservas",
        width: 1200,
        height: 675,
      },
      gallery: [],
      summary: "Software especializado para la administración de agendas médicas.",
      problemsSolved: ["Ausentismo de pacientes"],
      features: ["Recordatorios automáticos", "Videollamada encriptada"],
      includes: ["Código fuente completo", "Esquema de base de datos"],
      excludes: ["Servicios de mensajería SMS"],
      requirements: ["Node.js 20", "PostgreSQL 16"],
      thirdPartyCosts: ["Servidor de señalización WebRTC"],
      license: {
        mode: "exclusive" as const,
        sourceCodeIncluded: true,
        resale: "not_allowed" as const,
        summary: "Licencia exclusiva comercial",
      },
      support: {
        days: 30,
        scope: ["Puesta en marcha"],
        exclusions: ["Nuevos módulos"],
      },
      delivery: {
        estimate: "24-48 horas",
        conditions: ["Pago completado"],
      },
      updatedAt: "2026-09-20T00:00:00Z",
    };

    const parsed = mvpSchema.safeParse(newMVP);
    expect(parsed.success).toBe(true);
  });

  it("ensures all existing MVPs in repository are valid against the schema", async () => {
    const mvps = await getAllMVPs();
    expect(mvps.length).toBeGreaterThanOrEqual(3);

    for (const mvp of mvps) {
      const result = mvpSchema.safeParse(mvp);
      expect(result.success).toBe(true);
    }
  });
});
