import { z } from "zod";

// Validadores base
const urlSafeSlugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isoDateRegex = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?$/;

export const imageAssetSchema = z.object({
  src: z.string().min(1, "La ruta de la imagen no puede estar vacía"),
  alt: z.string().min(1, "El texto alternativo es obligatorio"),
  width: z.number().int().positive("El ancho debe ser un entero positivo"),
  height: z.number().int().positive("El alto debe ser un entero positivo"),
});

export const videoDemoSchema = z.discriminatedUnion("provider", [
  z.object({
    provider: z.enum(["youtube", "vimeo", "loom"]),
    url: z.string().url("Debe ser una URL válida"),
    poster: imageAssetSchema,
    transcript: z.string().optional(),
  }),
  z.object({
    provider: z.literal("file"),
    url: z.string().min(1, "La ruta del video no puede estar vacía"),
    mimeType: z.enum(["video/mp4", "video/webm"]),
    poster: imageAssetSchema,
    captionsUrl: z.string().optional(),
    transcript: z.string().optional(),
  }),
]);

export const priceSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.enum(["fixed", "from"]),
    amountMinor: z.number().int().nonnegative("El importe menor debe ser un entero no negativo"),
    currency: z.enum(["USD", "CLP"]),
  }),
  z.object({
    kind: z.literal("quote"),
    currency: z.enum(["USD", "CLP"]),
  }),
]);

export const mvpSchema = z.object({
  id: z.string().min(1, "El ID no puede estar vacío"),
  slug: z
    .string()
    .min(1, "El slug no puede estar vacío")
    .regex(urlSafeSlugRegex, "El slug debe ser URL-safe (solo letras minúsculas, números y guiones)"),
  title: z.string().min(1, "El título es obligatorio"),
  tagline: z.string().min(1, "El subtítulo/tagline es obligatorio"),
  niche: z.enum(["ecommerce", "ia", "automatizacion", "fintech", "salud", "otros"]),
  tags: z.array(z.string().min(1)).min(1, "Debe incluir al menos una etiqueta"),
  status: z.enum(["available", "sold", "custom_order"]),
  isSample: z.boolean(),
  featured: z.boolean(),
  price: priceSchema,
  techStack: z.array(z.string().min(1)).min(1, "Debe incluir al menos una tecnología en el stack"),
  cover: imageAssetSchema,
  gallery: z.array(imageAssetSchema).default([]),
  video: videoDemoSchema.optional(),
  liveDemoUrl: z.string().url("Debe ser una URL válida").optional(),
  summary: z.string().min(10, "El resumen debe tener al menos 10 caracteres"),
  problemsSolved: z.array(z.string().min(1)).min(1, "Debe declarar al menos un problema resuelto"),
  features: z.array(z.string().min(1)).min(1, "Debe declarar al menos una funcionalidad"),
  includes: z.array(z.string().min(1)).min(1, "Debe declarar qué incluye"),
  excludes: z.array(z.string().min(1)).min(1, "Debe declarar qué excluye"),
  requirements: z.array(z.string().min(1)).default([]),
  thirdPartyCosts: z.array(z.string().min(1)).default([]),
  license: z.object({
    mode: z.enum(["exclusive", "non_exclusive", "to_agree"]),
    sourceCodeIncluded: z.boolean(),
    resale: z.enum(["allowed", "not_allowed", "to_agree"]),
    summary: z.string().min(1, "El resumen de licencia es obligatorio"),
  }),
  support: z.object({
    days: z.number().int().nonnegative().nullable(),
    scope: z.array(z.string().min(1)),
    exclusions: z.array(z.string().min(1)),
  }),
  delivery: z.object({
    estimate: z.string().min(1, "El plazo estimado de entrega es obligatorio"),
    conditions: z.array(z.string().min(1)),
  }),
  updatedAt: z
    .string()
    .regex(isoDateRegex, "updatedAt debe ser una fecha en formato ISO (ej. YYYY-MM-DD o YYYY-MM-DDTHH:mm:ssZ)"),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: imageAssetSchema.optional(),
    })
    .optional(),
});

// Tipos TypeScript inferidos del esquema Zod
export type ImageAsset = z.infer<typeof imageAssetSchema>;
export type VideoDemo = z.infer<typeof videoDemoSchema>;
export type Price = z.infer<typeof priceSchema>;
export type MVP = z.infer<typeof mvpSchema>;
export type MVPNiche = MVP["niche"];
export type MVPStatus = MVP["status"];
