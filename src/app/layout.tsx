import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.brandName} — Catálogo Comercial de MVPs`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description:
    "Catálogo comercial de MVPs y software listo para lanzar. Acelera tu salida al mercado con código fuente completo y puesta en marcha asistida.",
  robots: {
    index: false, // Fase de desarrollo / proyectos de muestra en noindex
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} dark`}>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
