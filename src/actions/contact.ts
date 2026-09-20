"use server";

import { headers } from "next/headers";
import { contactFormSchema, ContactFormData } from "@/lib/contact/schema";
import { checkRateLimit } from "@/lib/contact/rate-limit";
import { sendContactEmail } from "@/lib/contact/send";
import { getMVPBySlug } from "@/lib/catalog/repository";

export type ContactActionResult =
  | { success: true }
  | {
      success: false;
      error: "VALIDATION_ERROR";
      fieldErrors: Record<string, string[]>;
    }
  | { success: false; error: "RATE_LIMITED"; message: string }
  | { success: false; error: "CONFIG_ERROR"; message: string }
  | { success: false; error: "SERVER_ERROR"; message: string };

export async function submitContactForm(
  data: unknown
): Promise<ContactActionResult> {
  // 1. Obtener IP del cliente para el limitador de tasa
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  const clientIp =
    forwardedFor?.split(",")[0]?.trim() || realIp || "127.0.0.1";

  // 2. Validación Zod de los datos de entrada
  const parseResult = contactFormSchema.safeParse(data);
  if (!parseResult.success) {
    const fieldErrors = parseResult.error.flatten().fieldErrors;
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: fieldErrors as Record<string, string[]>,
    };
  }

  const formData: ContactFormData = parseResult.data;

  // 3. Verificación de Honeypot anti-bot
  if (formData.honeypot && formData.honeypot.trim() !== "") {
    return {
      success: false,
      error: "VALIDATION_ERROR",
      fieldErrors: { honeypot: ["Detección de bot."] },
    };
  }

  // 4. Verificación de Rate Limit
  const rateLimit = await checkRateLimit(clientIp);
  if (!rateLimit.success) {
    return {
      success: false,
      error: "RATE_LIMITED",
      message:
        "Has alcanzado el límite máximo de envíos permitidos recientemente. Por favor, espera unos minutos antes de intentar de nuevo.",
    };
  }

  // 5. Revalidación del slug en el servidor (si se especificó uno)
  if (formData.slug && formData.slug.trim() !== "") {
    const mvpExists = await getMVPBySlug(formData.slug);
    if (!mvpExists) {
      return {
        success: false,
        error: "VALIDATION_ERROR",
        fieldErrors: {
          slug: ["El proyecto seleccionado no existe en el catálogo."],
        },
      };
    }
  }

  // 6. Envío real mediante el servicio de correo
  const sendResult = await sendContactEmail(formData);
  if (!sendResult.success) {
    if (sendResult.error === "CREDENTIALS_MISSING") {
      return {
        success: false,
        error: "CONFIG_ERROR",
        message: sendResult.message || "Servicio de correo no configurado.",
      };
    }

    return {
      success: false,
      error: "SERVER_ERROR",
      message:
        sendResult.message ||
        "No se pudo enviar la consulta. Intenta nuevamente más tarde.",
    };
  }

  return { success: true };
}
