import { z } from "zod";

export const contactFormSchema = z
  .object({
    name: z
      .string({ required_error: "El nombre es obligatorio." })
      .trim()
      .min(2, "El nombre debe tener al menos 2 caracteres.")
      .max(100, "El nombre no puede exceder 100 caracteres."),
    email: z
      .string({ required_error: "El correo electrónico es obligatorio." })
      .trim()
      .email("Ingresa una dirección de correo electrónico válida.")
      .max(255, "El correo electrónico es demasiado largo."),
    slug: z.string().trim().optional(),
    message: z
      .string({ required_error: "El mensaje es obligatorio." })
      .trim()
      .min(10, "El mensaje debe tener al menos 10 caracteres.")
      .max(2000, "El mensaje no puede exceder 2000 caracteres."),
    honeypot: z
      .string()
      .max(0, "Detección de envío automatizado.")
      .optional()
      .or(z.literal("")),
    timestamp: z
      .number({ required_error: "Marca de tiempo requerida." })
      .refine(
        (ts) => {
          const now = Date.now();
          // Debe haberse generado al menos 3 segundos antes y hace menos de 1 hora
          return ts <= now - 3000 && ts >= now - 3600000;
        },
        {
          message: "Envío demasiado rápido o sesión expirada.",
        }
      ),
  });

export type ContactFormData = z.infer<typeof contactFormSchema>;
