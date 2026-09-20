import { sampleMVPs } from "../src/data/mvps";
import { mvpSchema } from "../src/lib/catalog/schema";
import fs from "node:fs";
import path from "node:path";

async function main() {
  console.log("🔍 Validando datos del catálogo de MVPs contra el esquema Zod...\n");

  let hasErrors = false;
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();

  for (const mvp of sampleMVPs) {
    console.log(`Verificando MVP: [${mvp.id}] "${mvp.title}" (${mvp.slug})...`);

    // 1. Validación Zod
    const result = mvpSchema.safeParse(mvp);
    if (!result.success) {
      hasErrors = true;
      console.error(`❌ Error de validación Zod en MVP ${mvp.id}:`);
      console.error(JSON.stringify(result.error.format(), null, 2));
    }

    // 2. Unicidad de ID
    if (seenIds.has(mvp.id)) {
      hasErrors = true;
      console.error(`❌ ID duplicado detectado: ${mvp.id}`);
    } else {
      seenIds.add(mvp.id);
    }

    // 3. Unicidad de Slug
    if (seenSlugs.has(mvp.slug)) {
      hasErrors = true;
      console.error(`❌ Slug duplicado detectado: ${mvp.slug}`);
    } else {
      seenSlugs.add(mvp.slug);
    }

    // 4. Verificación de existencia de imagen de portada
    const coverPath = path.join(process.cwd(), "public", mvp.cover.src.replace(/^\//, ""));
    if (!fs.existsSync(coverPath)) {
      hasErrors = true;
      console.error(`❌ Imagen de portada no encontrada en disco: ${coverPath}`);
    }

    // 5. Verificación de existencia de imágenes de galería
    for (const img of mvp.gallery) {
      const galleryPath = path.join(process.cwd(), "public", img.src.replace(/^\//, ""));
      if (!fs.existsSync(galleryPath)) {
        hasErrors = true;
        console.error(`❌ Imagen de galería no encontrada en disco: ${galleryPath}`);
      }
    }
  }

  if (hasErrors) {
    console.error("\n❌ Se detectaron errores en los datos del catálogo.");
    process.exit(1);
  } else {
    console.log(`\n✅ Validación exitosa: ${sampleMVPs.length} MVPs validados correctamente sin errores.`);
  }
}

main().catch((err) => {
  console.error("Error inesperado en validate-data:", err);
  process.exit(1);
});
