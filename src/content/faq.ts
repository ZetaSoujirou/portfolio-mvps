export interface FAQItem {
  question: string;
  answer: string;
}

export const faqContent: FAQItem[] = [
  {
    question: "¿Qué recibo exactamente al adquirir un MVP?",
    answer:
      "Recibes el repositorio completo de código fuente con su historial, documentación técnica de arquitectura e instalación, instrucciones de despliegue y soporte durante el periodo pactado para ayudarte a configurarlo en tu propia infraestructura.",
  },
  {
    question: "¿Incluye el código fuente completo?",
    answer:
      "Sí, salvo que la ficha del producto indique expresamente lo contrario. La entrega incluye el código sin ofuscar para que puedas continuar su desarrollo de forma independiente o con tu equipo técnico.",
  },
  {
    question: "¿Cuál es la diferencia entre licencia exclusiva y no exclusiva?",
    answer:
      "Una licencia exclusiva transfiere los derechos comerciales completos del software para que seas el único titular y no pueda venderse a otros compradores. Una licencia no exclusiva te otorga el derecho de uso y explotación comercial, pero el vendedor conserva el derecho de comercializar la base a otros clientes.",
  },
  {
    question: "¿Cómo se gestiona el pago?",
    answer:
      "No existe un checkout automático en esta web. Tras contactar y validar que el proyecto cumple tus expectativas, acordamos los términos por escrito y el pago se realiza mediante transferencia bancaria u otro método seguro coordinado previamente.",
  },
  {
    question: "¿Qué costos adicionales de terceros debo considerar?",
    answer:
      "Cada ficha técnica detalla los costos de servicios de terceros indispensables para operar el sistema (por ejemplo, hosting en Vercel/AWS, base de datos en Supabase, APIs de IA o proveedores de email como Resend). Estos costos corren por cuenta del comprador directamente con los proveedores.",
  },
  {
    question: "¿Puedo solicitar adaptaciones o nuevas funcionalidades?",
    answer:
      "Sí. Durante la fase de consulta inicial podemos acordar una cotización adicional para incorporar las integraciones o ajustes que tu modelo de negocio requiera antes de la entrega.",
  },
];
