export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ComparisonItem {
  feature: string;
  mvpCatalog: string;
  customDevelopment: string;
}

export const homeContent = {
  hero: {
    badge: "Catálogo comercial de software",
    title: "Software para lanzar tu próxima idea sin empezar desde cero",
    subtitle:
      "MVPs listos para transferir, adaptar y desplegar. Adquiere una base tecnológica funcional con código fuente y ahorra meses de desarrollo inicial.",
    ctaPrimary: "Explorar catálogo",
    ctaSecondary: "Consultar proyecto",
    clarification:
      "Venta de código base y puesta en marcha asistida. El alcance de personalización y condiciones finales se acuerdan previamente.",
  },
  process: {
    title: "¿Cómo funciona el proceso de adquisición?",
    subtitle: "Un proceso transparente y asistido de inicio a fin",
    steps: [
      {
        number: "01",
        title: "Consulta y acuerdo",
        description:
          "Revisas la ficha técnica del MVP y consultas dudas. Acordamos el alcance, modalidad de licencia (exclusiva o no exclusiva), personalizaciones y precio final.",
      },
      {
        number: "02",
        title: "Pago y transferencia",
        description:
          "Formalizamos las condiciones y se realiza el pago acordado. Te entrego el repositorio de código fuente completo, documentación y credenciales de despliegue.",
      },
      {
        number: "03",
        title: "Puesta en marcha",
        description:
          "Configuramos el entorno de producción en tus propios servidores o servicios cloud, con el periodo de soporte técnico y acompañamiento pactado.",
      },
    ] as ProcessStep[],
  },
  comparison: {
    title: "¿Catálogo de MVPs vs. Desarrollo a medida desde cero?",
    subtitle: "Compara el enfoque de adquirir un MVP frente a contratar un desarrollo completo",
    items: [
      {
        feature: "Punto de partida",
        mvpCatalog: "Código fuente ya estructurado, probado y listo para desplegar.",
        customDevelopment: "Diseño y desarrollo desde cero tras semanas de análisis.",
      },
      {
        feature: "Tiempo de lanzamiento",
        mvpCatalog: "Inmediato o pocos días tras configurar variables y dominio.",
        customDevelopment: "Meses de diseño iterativo, desarrollo y correcciones.",
      },
      {
        feature: "Costos iniciales",
        mvpCatalog: "Precio cerrado y predecible por la base tecnológica existente.",
        customDevelopment: "Presupuesto variable según horas/hombre y alcances cambiantes.",
      },
      {
        feature: "Personalización",
        mvpCatalog: "Adaptable sobre la base entregada según el alcance acordado.",
        customDevelopment: "Completamente diseñado según especificación desde el día uno.",
      },
    ] as ComparisonItem[],
  },
};
