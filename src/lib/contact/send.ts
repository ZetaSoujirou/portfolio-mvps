import { ContactFormData } from "./schema";

export interface SendEmailResult {
  success: boolean;
  error?: "CREDENTIALS_MISSING" | "SEND_FAILED";
  message?: string;
}

/**
 * Envía un correo de consulta comercial mediante el API de Resend.
 * Trata todos los campos como texto plano sin renderizar HTML arbitrario.
 * Devuelve un error explícito si las variables del servidor no están configuradas.
 */
export async function sendContactEmail(
  data: ContactFormData
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !fromEmail || !toEmail) {
    return {
      success: false,
      error: "CREDENTIALS_MISSING",
      message:
        "El servicio de mensajería por correo no se encuentra configurado en este entorno. Por favor, comunícate directamente mediante los canales alternativos indicados.",
    };
  }

  const subject = `Nueva consulta comercial: ${data.name}${
    data.slug ? ` [Proyecto: ${data.slug}]` : ""
  }`;

  const textContent = [
    `Nueva consulta recibida a través del catálogo:`,
    `--------------------------------------------------`,
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    data.slug ? `Proyecto de interés: ${data.slug}` : `Proyecto: Consulta general`,
    `--------------------------------------------------`,
    `Mensaje:`,
    data.message,
    `--------------------------------------------------`,
    `Fecha: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: data.email,
        subject,
        text: textContent,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        success: false,
        error: "SEND_FAILED",
        message:
          "El proveedor de correo no pudo procesar la solicitud en este momento. Por favor, intenta nuevamente más tarde o utiliza otro canal de contacto.",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "SEND_FAILED",
      message:
        "Ocurrió un error al intentar comunicar con el servidor de correo.",
    };
  }
}
