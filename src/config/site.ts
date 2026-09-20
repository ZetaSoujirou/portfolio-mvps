export interface SiteConfig {
  brandName: string;
  locale: string;
  siteUrl: string;
  whatsappNumber: string | null;
  publicEmail: string | null;
  socials: {
    github?: string | null;
    linkedin?: string | null;
    x?: string | null;
  };
  features: {
    analyticsEnabled: boolean;
  };
}

export const siteConfig: SiteConfig = {
  brandName: "Zeta Studio",
  locale: "es-CL",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://zetastudio.cl",
  // Contactos no configurados permanecen explícitamente en null
  whatsappNumber: null,
  publicEmail: null,
  socials: {
    github: null,
    linkedin: null,
    x: null,
  },
  features: {
    analyticsEnabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
  },
};
