# PROJECT_STATUS — Bitácora de Estado y Seguimiento

Última actualización: 2026-09-20 00:41 (Local)  
Fase activa: **Fase 6 — Preparación del lanzamiento** (Fases 1 a 5 completadas y verificadas)

---

## 1. Estado de Fases

| Fase | Descripción | Estado | Evidencias |
| --- | --- | --- | --- |
| 0 | Documentación inicial y reglas | `done` | `PROMPT_MAESTRO.md`, `AI_RULES.md`, `README.md`, `PROJECT_STATUS.md`, `.agents/rules/project.md` creados |
| 1 | Scaffold, configuración, esquema, datos y validación | `done` | `npm run validate:data` (3/3 OK), `vitest run` (11/11 tests), `typecheck` (0 errores), `lint` (0 advertencias), `build` (compilación limpia) |
| 2 | Diseño, inicio y catálogo con filtros | `done` | `npm test` (27/27 tests pasan), `typecheck` (0 errores), `lint` (0 advertencias), `build` (compilación limpia con ruta `/` estática y catálogo en `<Suspense>`) |
| 3 | Fichas, medios, SEO y páginas auxiliares | `done` | `npm run build` (12 páginas generadas con SSG `/mvp/[slug]`, `/gracias`, `/terminos`, `/privacidad`, `/sitemap.xml`, `/robots.txt`), `typecheck` (0 errores), `lint` (0 advertencias) |
| 4 | Contacto, antiabuso y analítica opcional | `done` | `npm test` (38/38 tests pasan en Vitest), Server Action con Zod y antiabuso (honeypot, timestamp, rate limit SHA-256), `typecheck` (0 errores), `lint` (0 advertencias), `build` (compilación limpia con Server Action) |
| 5 | Revisión integrada, rendimiento y entrega local | `done` | `npm test` (47/47 tests pasan en 7 suites), pruebas de integración de contacto y seguridad, `typecheck` (0 errores), `lint` (0 advertencias), `build` (compilación limpia), `check:launch` ejecutado con reporte verificado |
| 6 | Preparación del lanzamiento | `pending` | Siguiente y última fase a ejecutar |

---

## 2. Tabla de Tareas Detallada

| Tarea | Fase | Estado | Nota |
| --- | --- | --- | --- |
| Crear documentación inicial (`PROMPT_MAESTRO`, `AI_RULES`, `README`, `PROJECT_STATUS`, `.env.example`) | 0 | `done` | Completado |
| Configurar `.agents/rules/project.md` | 0 | `done` | Completado |
| Inicializar `package.json` con dependencias fijas y resolver vulnerabilidades | 1 | `done` | Next.js 15.3.9, React 19, Tailwind, Zod, Lucide, Vitest |
| Configurar `tsconfig.json` y `tailwind.config.ts` | 1 | `done` | Paleta tema oscuro `#0a0a0c`, `zinc-900`, `zinc-800`, `#06b6d4` |
| Implementar esquema Zod `schema.ts` | 1 | `done` | Price (discriminado), ImageAsset, VideoDemo, MVP |
| Implementar helper `money.ts` | 1 | `done` | USD (decimales menores) y CLP (sin dividir por 100), Intl.NumberFormat |
| Configurar `site.ts` y contenidos (`home.ts`, `faq.ts`, `legal.ts`) | 1 | `done` | Textos comerciales y canales seguros sin inventar contactos |
| Crear datos de catálogo `mvps.ts` | 1 | `done` | 3 MVPs de ejemplo con `isSample: true` |
| Crear imágenes ilustrativas locales en `public/images/mvps/` | 1 | `done` | 8 SVGs de portada y galería para los 3 ejemplos |
| Crear script `validate-data.ts` y tests unitarios | 1 | `done` | `validate-data.ts`, `tests/unit/money.test.ts`, `tests/unit/catalog-schema.test.ts` |
| Ejecutar `validate:data`, `typecheck`, `lint` y `test` | 1 | `done` | Todas las comprobaciones pasadas exitosamente |
| Implementar función pura de búsqueda/filtrado `search.ts` y tests TDD | 2 | `done` | Normalización insensible a tildes/mayúsculas, filtros por nicho/estado, orden por precio con cotizaciones al final (16 tests en Vitest) |
| Implementar barra de búsqueda y filtros interactivos de catálogo | 2 | `done` | `CatalogFilters`, `CatalogSection`, pills de nicho, selector de estado y orden |
| Sincronizar filtros con la URL (`?q=&niche=&status=&sort=`) | 2 | `done` | `useSearchParams` y `useRouter.replace(..., { scroll: false })` con debounce de 300 ms y soporte para back/forward |
| Componentes de tarjetas de MVP y estado sin resultados | 2 | `done` | `MVPCard` con badges de estado, precio formateado, chips de stack; `EmptyState` con botón «Limpiar filtros» |
| Secciones de portada (Header, Hero, Proceso, Comparativa, FAQ, Footer) | 2 | `done` | Integradas en `src/app/page.tsx` con accesibilidad WAI-ARIA, acordeón FAQ y `<Suspense>` |
| Implementar ficha de producto `/mvp/[slug]` con `generateStaticParams` | 3 | `done` | SSG estático para los 3 MVPs, breadcrumbs, 404 para slugs no existentes |
| Generación de metadatos SEO dinámicos (`generateMetadata`) | 3 | `done` | OpenGraph, Twitter Card, alternativo canonical por producto |
| Galería interactiva con Lightbox accesible | 3 | `done` | `GalleryLightbox` con miniaturas, atajos de teclado (flechas y Escape) y WAI-ARIA `dialog` |
| Reproductor de video opcional | 3 | `done` | `VideoDemo` compatible con YouTube, Vimeo, Loom y video HTML5 con poster y transcripción |
| Desglose técnico y comercial completo | 3 | `done` | `MVPDetails`: problemas resueltos, características, alcance (incluye/excluye), requisitos, costos de terceros, licencia, entrega y soporte |
| Acciones contextuales y barra fija móvil | 3 | `done` | `MVPActions` con botones según disponibilidad (`available`, `sold`, `custom_order`) y barra móvil fija con safe-area |
| Páginas auxiliares (`/gracias`, `/terminos`, `/privacidad`) | 3 | `done` | `/gracias` con `noindex`, `/terminos` y `/privacidad` con aviso de borrador informativo |
| Rutas de metadatos (`sitemap.ts`, `robots.ts`) | 3 | `done` | `/sitemap.xml` dinámico y `/robots.txt` excluyendo `/gracias` |
| Helper y tests de WhatsApp (`whatsapp.ts`) | 4 | `done` | Normalización a dígitos, codificación de mensaje y retorno nulo si no hay teléfono configurado (4 tests en Vitest) |
| Esquema Zod de contacto y antiabuso (`schema.ts`) | 4 | `done` | Validación estricta, honeypot y verificación de timestamp (7 tests en Vitest) |
| Rate limiting con pseudonimización SHA-256 (`rate-limit.ts`) | 4 | `done` | Soporte para Upstash Redis y fallback local en memoria para desarrollo |
| Envío de correo con Resend (`send.ts`) | 4 | `done` | Texto plano seguro, replyTo del usuario y degradación honesta ante falta de credenciales |
| Server Action de contacto (`contact.ts`) | 4 | `done` | Orquestación en servidor: validación, honeypot, rate limit, revalidación de slug y envío |
| Componentes `ContactForm` y `ContactSection` | 4 | `done` | Formulario accesible con prevención de doble clic, conservación de mensaje ante error, aviso de privacidad y sección `#contacto` en portada |
| Helper de analítica respetuoso de privacidad (`analytics.ts`) | 4 | `done` | Restringido a `slug` y `ctaLocation`; sin recolección de datos personales |
| Pruebas de integración de flujo de contacto (`contact-action.test.ts`) | 5 | `done` | Honeypot, timestamp, slug inexistente, manejo de credenciales ausentes y éxito con mock de Resend (5 tests) |
| Pruebas de no filtración de secretos y extensibilidad (`security-and-brand.test.ts`) | 5 | `done` | Comprobación de no secretos en `NEXT_PUBLIC_` y validación de adición de nuevos productos (4 tests) |
| Ejecución de checklist técnico de prelanzamiento (`check:launch`) | 5 | `done` | Reporte emitido con éxito con identificación de los 7 bloqueos pendientes |
| Preparación del lanzamiento y checklist final | 6 | `pending` | Próxima fase |

---

## 3. Decisiones Registradas con Fecha

- **2026-09-19**: Proyecto inicializado en `C:\Users\Salo\.gemini\antigravity-ide\scratch\portfolio-mvps` por indicación de especificación.
- **2026-09-19**: Se adopta tema oscuro fijo con acento `#06b6d4` (cyan) y fondos `#0a0a0c`.
- **2026-09-19**: Precios de ejemplo en USD con formato `amountMinor` (149900 = 1.499,00 USD; 99000 = 990,00 USD).
- **2026-09-19**: Se actualizó Next.js a `15.3.9` con versiones exactas para incorporar parches oficiales de seguridad sin prereleases.
- **2026-09-19**: Creados 8 recursos gráficos vectoriales locales en `public/images/mvps/` con distintivo «Proyecto de ejemplo».
- **2026-09-20**: Implementado `src/lib/catalog/search.ts` mediante TDD (16 tests unitarios) para normalización diacrítica/mayúsculas, filtros por nicho/estado y ordenamiento por precio posicionando proyectos con cotización (`quote`) al final.
- **2026-09-20**: Sincronización bidireccional en URL (`?q=&niche=&status=&sort=`) mediante `useSearchParams` y `useRouter.replace(..., { scroll: false })` con debounce de 300 ms.
- **2026-09-20**: Fichas `/mvp/[slug]` generadas con SSG (`generateStaticParams`) y metadatos SEO dinámicos (`generateMetadata`).
- **2026-09-20**: Galería `GalleryLightbox` accesible con miniaturas, soporte de teclado (flechas y Escape) y WAI-ARIA `dialog`.
- **2026-09-20**: Rutas auxiliares (`/gracias` con `noindex`, `/terminos`, `/privacidad`, `/sitemap.xml`, `/robots.txt`) compiladas sin errores.
- **2026-09-20**: Antiabuso implementado con honeypot invisible, verificación de timestamp mínimo (3 segundos) y limitación de tasa (5 envíos / 10 min) pseudonimizando la IP con SHA-256 y `RATE_LIMIT_SALT`.
- **2026-09-20**: Envío de correo en Server Action con Resend; ante ausencia de variables de servidor (`RESEND_API_KEY`, etc.), se devuelve un error explícito y honesto informando al usuario sin fingir éxito ni registrar datos personales.
- **2026-09-20**: Analítica opcional restringida a eventos permitidos (`view_mvp`, `click_whatsapp`, `click_live_demo`, `play_demo_video`, `submit_lead`) y propiedades autorizadas (`slug`, `ctaLocation`).
- **2026-09-20**: Verificación de seguridad y extensibilidad mediante suites de integración en Vitest (47 tests totales en el proyecto).

---

## 4. Archivos Modificados / Creados

- `tests/integration/contact-action.test.ts` [NUEVO]
- `tests/integration/security-and-brand.test.ts` [NUEVO]
- `README.md` [MODIFICADO]
- `PROJECT_STATUS.md` [MODIFICADO]

---

## 5. Comandos Ejecutados y Resultados

- `npm test`: Vitest ejecutó 7 suites de pruebas (47 tests totales: `whatsapp.test.ts`, `money.test.ts`, `contact-schema.test.ts`, `catalog-search.test.ts`, `catalog-schema.test.ts`, `contact-action.test.ts` y `security-and-brand.test.ts`), 100% aprobadas (Código 0).
- `npm run typecheck`: TypeScript en modo estricto pasó sin advertencias ni errores (Código 0).
- `npm run lint`: ESLint con `next/core-web-vitals` pasó sin errores ni advertencias (Código 0).
- `npm run build`: Validación Zod (`validate:data`), Server Action y compilación Next.js 15.3.9 exitosas (Código 0), generando 12 páginas estáticas/SSG.
- `npm run check:launch`: Comprobó los 7 elementos pendientes del propietario antes de publicar a producción.

---

## 6. Bloqueos de Lanzamiento Identificados (Sección 12)

1. Nombre de marca final (actualmente provisional `[MI_MARCA_TECH]`).
2. Dominio canónico de producción (actualmente provisional `http://localhost:3000`).
3. Número de WhatsApp comercial real (actualmente `null`).
4. Remitente y destinatario de correo para Resend (actualmente no configurados).
5. Credenciales de Upstash Redis para rate limit (actualmente no configuradas).
6. Catálogo con proyectos reales y licencias definitivas.
7. Textos legales definitivos (términos y privacidad).

*(Ninguno de estos bloqueos impide el desarrollo y verificación local de la aplicación).*

---

## 7. Próxima Tarea Concreta

**Fase 6**: Preparación del lanzamiento: consolidar la guía de despliegue en Vercel, documentar el procedimiento para resolver los 7 bloqueos pendientes del propietario antes de la publicación definitiva, y formalizar la entrega de la aplicación local verificada.
