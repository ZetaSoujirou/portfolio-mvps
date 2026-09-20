import { siteConfig } from "../src/config/site";
import { sampleMVPs } from "../src/data/mvps";

async function main() {
  console.log("🚀 Comprobando checklist técnico de prelanzamiento (check:launch)...\n");

  const warnings: string[] = [];
  const blockers: string[] = [];

  // 1. Marca provisional
  if (siteConfig.brandName.includes("[MI_MARCA_TECH]")) {
    blockers.push("El nombre de marca sigue siendo provisional: '[MI_MARCA_TECH]'.");
  }

  // 2. Dominio canónico
  if (siteConfig.siteUrl.includes("localhost")) {
    blockers.push(`El dominio canónico configurado es de desarrollo: ${siteConfig.siteUrl}`);
  }

  // 3. Contactos
  if (!siteConfig.whatsappNumber) {
    warnings.push("WhatsApp no está configurado (enlace wa.me deshabilitado).");
  }
  if (!siteConfig.publicEmail) {
    warnings.push("Email público no está configurado.");
  }

  // 4. Variables de servidor para contacto
  if (!process.env.RESEND_API_KEY) {
    warnings.push("RESEND_API_KEY no detectada. El formulario real no podrá despachar emails.");
  }
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    warnings.push("UPSTASH_REDIS_REST_URL no detectada. Rate limit distribuido inactivo.");
  }

  // 5. Productos de muestra
  const sampleCount = sampleMVPs.filter((p) => p.isSample).length;
  if (sampleCount > 0) {
    warnings.push(
      `Existen ${sampleCount} productos marcados como 'isSample: true'. Estos no deben publicarse como reales en sitemap.`
    );
  }

  console.log("=== REPORTE DE LANZAMIENTO ===");
  if (blockers.length > 0) {
    console.log("\n🛑 BLOQUEOS PARA PUBLICACIÓN:");
    blockers.forEach((b) => console.log(`  - ${b}`));
  } else {
    console.log("\n✅ Sin bloqueos críticos de configuración.");
  }

  if (warnings.length > 0) {
    console.log("\n⚠️ ADVERTENCIAS / PENDIENTES:");
    warnings.forEach((w) => console.log(`  - ${w}`));
  }

  console.log("\nNota: Este es un chequeo técnico; no sustituye la revisión legal o verificación de buzón de correo.");

  if (blockers.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Error inesperado en check-launch:", err);
  process.exit(1);
});
