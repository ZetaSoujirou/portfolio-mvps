# Prompt maestro — Portfolio comercial de MVPs

Versión documental: 1.0 · Idioma: español · Estado inicial: especificación, sin aplicación implementada.

**Uso:** pega el contenido completo de este archivo en el agente de Antigravity, dentro de la carpeta del proyecto. No necesitas el análisis anterior.

---

## 1. Tu encargo

Actúa como desarrollador full stack senior y diseñador UI/UX. Construye en este workspace una aplicación web completa para mostrar y comercializar mis proyectos tecnológicos: un **catálogo de MVPs de un único vendedor**, con fichas individuales y captación de consultas.

El nombre provisional es `[MI_MARCA_TECH]`. Centraliza marca, dominio y canales públicos de contacto. La experiencia debe ser profesional, rápida, accesible y fácil de mantener.

**Entrega archivos funcionales en el IDE; no te limites a escribir una propuesta o fragmentos en el chat.** Avanza por las fases de este documento, verifica cada entrega y deja constancia real del progreso. No existe todavía una aplicación que debas asumir terminada.

### Antes de modificar archivos

1. Inspecciona el workspace, su estado de Git y los archivos existentes. Conserva cambios ajenos. Si hay una aplicación incompatible con este encargo, explica el conflicto antes de sustituirla.
2. Lee, si existen: `PROMPT_MAESTRO.md`, `AI_RULES.md`, `README.md`, `PROJECT_STATUS.md` y las reglas de `.agents/rules/`.
3. Si solo recibiste este prompt, crea esos documentos: conserva esta especificación como `PROMPT_MAESTRO.md`; deriva las reglas de la sección 13, el README de la sección 14 y el estado inicial de la sección 15. Crea también una regla de workspace que indique leerlos al comenzar. No inventes trabajo completado.
4. Resume en pocas líneas la fase que vas a ejecutar y comienza. Usa los valores provisionales definidos aquí; consulta solo por conflictos, operaciones irreversibles o decisiones imprescindibles que no tengan un valor provisional.
5. Si el generador del framework rechaza la carpeta por contener documentación, genera el scaffold en una subcarpeta temporal del workspace e integra sus archivos sin sobrescribir estos documentos. No borres el workspace.

## 2. Decisiones de producto y límites de la v1

| Tema | Decisión inicial |
| --- | --- |
| Negocio | Portfolio comercial de un vendedor; sin vendedores externos. |
| Conversión principal | Consulta cualificada por WhatsApp o formulario. |
| Compra | Cierre asistido: se acuerdan alcance, licencia y pago fuera del sitio. |
| CTA comercial | «Solicitar compra» / «Consultar proyecto»; nunca simular un checkout. |
| Idioma | Español; atributo `lang="es"` y formato regional configurable, inicialmente `es-CL`. |
| Moneda de los ejemplos | USD, explícitamente indicada; cada producto declara su moneda. Sin conversión automática. |
| Catálogo | Archivo TypeScript validado; sin CMS ni base de datos de productos. |
| Tema | Oscuro, sin selector de tema en esta versión. |
| Despliegue previsto | Vercel, con runtime de servidor para el formulario; no exportación HTML estática completa. |

**Fuera de alcance:** carrito, pagos integrados, cuentas, panel de administración, descargas privadas, suscripciones, facturación automatizada, múltiples vendedores, buscador con IA y traducciones completas.

No añadas estas funciones por iniciativa propia. Registra propuestas futuras en el backlog. Si posteriormente pido cobrar dentro del sitio, trata checkout, pedidos, webhooks, entrega y reembolsos como una ampliación explícita.

## 3. Stack y arquitectura

- Next.js con App Router, React y TypeScript en modo estricto.
- Al iniciar, elige una versión estable y con soporte de seguridad de Next.js y versiones compatibles de React, Node.js LTS, Tailwind CSS, shadcn/ui y Radix. Consulta documentación oficial de las versiones elegidas. No uses prereleases.
- Usa npm, registra las versiones resueltas en README y conserva `package-lock.json`. Fija las dependencias directas; no dejes `latest` ni rangos abiertos en el manifiesto. No cambies versiones mayores a mitad del proyecto sin una razón acordada.
- Tailwind CSS, componentes shadcn/ui necesarios y Lucide. Usa CSS para transiciones sencillas; añade Motion solo si una interacción concreta lo justifica.
- Zod para datos del catálogo y validación de formulario. Deriva tipos del esquema con `z.infer` para evitar contratos duplicados.
- Server Components por defecto; Client Components solo en las fronteras interactivas: filtros, galería, formulario, navegación móvil y analítica.
- Pre-renderiza fichas con `generateStaticParams`; genera sus metadatos en el servidor. El formulario usa una Server Action y módulos exclusivos de servidor.
- Vitest para lógica y componentes relevantes; Playwright para los recorridos E2E. No añadas infraestructura innecesaria.

Estructura prevista; puedes ajustar nombres menores al scaffold, documentando equivalencias:

```text
PROMPT_MAESTRO.md
README.md
AI_RULES.md
PROJECT_STATUS.md
.agents/rules/project.md
.env.example
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    mvp/[slug]/page.tsx
    gracias/page.tsx
    terminos/page.tsx
    privacidad/page.tsx
    not-found.tsx
    sitemap.ts
    robots.ts
  actions/contact.ts
  components/{layout,catalog,mvp,contact,ui}/
  config/site.ts
  content/{home,faq,legal}.ts
  data/mvps.ts
  lib/
    catalog/{schema,repository,search}.ts
    contact/{schema,send,rate-limit}.ts
    analytics.ts
    whatsapp.ts
    money.ts
public/
  images/mvps/
scripts/
tests/
```

Encapsula la lectura del catálogo con `getAllMVPs()` y `getMVPBySlug()`. Los componentes no deben importar directamente el array de datos por todas partes. No crees un sistema de repositorios abstractos o microservicios para este tamaño de aplicación.

## 4. Configuración y contenido

`src/config/site.ts` centraliza `brandName`, `locale`, `whatsappNumber`, `publicEmail`, redes sociales y opciones públicas de contacto. El dominio canónico procede de `NEXT_PUBLIC_SITE_URL` y se expone mediante esta configuración.

- Los contactos desconocidos son `null`; nunca inventes un teléfono, destinatario o enlace de pago.
- El sitio debe arrancar localmente sin credenciales. Deshabilita con una explicación los canales no configurados; ofrece otro canal solo si existe.
- Marca y dominio son valores distintos. Cambiar el nombre de marca no configura DNS, dominio del despliegue ni remitente de correo.
- `src/content/` contiene textos comerciales, FAQ y borradores legales. Separa contenido editable de lógica.
- Las credenciales solo van en variables del servidor. Nunca uses el prefijo `NEXT_PUBLIC_` para secretos.
- Incluye `.env.example` sin valores reales y mantén `.env.local` fuera de Git.

Variables previstas, que deberán documentarse y coincidir con el código:

```text
NEXT_PUBLIC_SITE_URL
RESEND_API_KEY
RESEND_FROM_EMAIL
CONTACT_EMAIL_TO
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
RATE_LIMIT_SALT
NEXT_PUBLIC_ANALYTICS_ENABLED
```

`NEXT_PUBLIC_SITE_URL` puede usar localhost en desarrollo. `NEXT_PUBLIC_ANALYTICS_ENABLED` comienza en `false`. Correo y limitación de envíos deben estar configurados para activar el formulario real; su ausencia no debe romper el catálogo ni producir un éxito falso.

## 5. Contrato del catálogo

Implementa un esquema Zod que represente el siguiente contrato. Usa uniones discriminadas y validaciones cruzadas:

```ts
type Price =
  | { kind: "fixed" | "from"; amountMinor: number; currency: "USD" | "CLP" }
  | { kind: "quote"; currency: "USD" | "CLP" };

type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type VideoDemo =
  | {
      provider: "youtube" | "vimeo" | "loom";
      url: string;
      poster: ImageAsset;
      transcript?: string;
    }
  | {
      provider: "file";
      url: string;
      mimeType: "video/mp4" | "video/webm";
      poster: ImageAsset;
      captionsUrl?: string;
      transcript?: string;
    };

type MVP = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  niche: "ecommerce" | "ia" | "automatizacion" | "fintech" | "salud" | "otros";
  tags: string[];
  status: "available" | "sold" | "custom_order";
  isSample: boolean;
  featured: boolean;
  price: Price;
  techStack: string[];
  cover: ImageAsset;
  gallery: ImageAsset[];
  video?: VideoDemo;
  liveDemoUrl?: string;
  summary: string;
  problemsSolved: string[];
  features: string[];
  includes: string[];
  excludes: string[];
  requirements: string[];
  thirdPartyCosts: string[];
  license: {
    mode: "exclusive" | "non_exclusive" | "to_agree";
    sourceCodeIncluded: boolean;
    resale: "allowed" | "not_allowed" | "to_agree";
    summary: string;
  };
  support: { days: number | null; scope: string[]; exclusions: string[] };
  delivery: { estimate: string; conditions: string[] };
  updatedAt: string;
  seo?: { title?: string; description?: string; image?: ImageAsset };
};
```

### Reglas de datos y representación

- `id` y `slug` únicos; slugs URL-safe. Texto obligatorio no vacío, fechas ISO válidas, dimensiones positivas, importes enteros no negativos y enlaces con protocolos permitidos.
- `amountMinor` representa unidades menores de la moneda: USD 149900 = USD 1.499,00; CLP 149900 = CLP 149.900. Formatea con `Intl.NumberFormat` y la cantidad de decimales de cada moneda; no dividas CLP por 100.
- `quote` no lleva importe. `from` muestra siempre «Desde». Ordena precios únicamente cuando sean comparables en la misma moneda y deja las cotizaciones al final; si hay varias monedas, exige seleccionar una para ordenar por precio.
- No mezcles disponibilidad con licencia. Una licencia no exclusiva puede venderse varias veces. `sold` bloquea «Solicitar compra» y permite «Consultar una alternativa». `custom_order` muestra «Solicitar desarrollo similar».
- En ausencia de demo o video, omite el bloque y su CTA. No uses enlaces rotos ni URLs inventadas como ejemplos funcionales.
- La licencia y el soporte de los ejemplos son ilustrativos; no constituyen compromisos comerciales del propietario.
- `thirdPartyCosts` debe aclarar hosting, APIs u otras suscripciones no incluidas. `excludes` evita prometer personalización ilimitada.
- Valida al construir y antes de publicar; informa campo e identificador del producto que falla.

Carga estos tres ejemplos, visibles como **«Proyecto de ejemplo»**, con `isSample: true` y textos coherentes:

| Slug | Nombre | Nicho | Estado | Precio ilustrativo |
| --- | --- | --- | --- | --- |
| `tienda-nicho` | Tienda de nicho | ecommerce | available | fixed, 149900, USD |
| `asistente-documental` | Asistente documental | ia | available | from, 99000, USD |
| `automatizador-operaciones` | Automatizador de operaciones | automatizacion | custom_order | quote, USD |

Completa los demás campos y crea imágenes locales originales claramente ilustrativas. No afirmes que esos proyectos existen, están probados o tienen clientes. No inventes testimonios, métricas, certificaciones ni insignias «100% funcional». El código de demostración debe probar estados `sold` mediante fixtures de test sin fingir una venta real.

## 6. Diseño y experiencia

- Tema oscuro: fondo `#0a0a0c`, superficies zinc-900, bordes zinc-800, acento cyan `#06b6d4`. Define tokens semánticos, estados y colores de texto.
- Geist Sans o Inter como única fuente principal; usa una familia monoespaciada del sistema para detalles técnicos. Evita añadir fuentes sin necesidad.
- Jerarquía clara, ancho de lectura cómodo, títulos concretos y espacio suficiente. Evita decoraciones que compitan con las capturas.
- Usa transiciones breves, sin parallax, animaciones infinitas ni video automático. Respeta `prefers-reduced-motion`.
- Apunta a WCAG 2.2 AA: contraste 4,5:1 en texto normal, 3:1 en texto grande y componentes aplicables; foco visible, etiquetas, estructura semántica, errores accesibles y navegación por teclado.
- No des por garantizada la accesibilidad por usar Radix. Verifica diálogos, retorno del foco, Escape, menú móvil y mensajes del formulario.
- Diseño probado en 375, 768 y 1440 px, sin scroll horizontal. CTA fijo móvil solo en fichas: respeta safe-area y no cubre contenido, formularios ni controles.

## 7. Páginas y comportamiento

### Inicio `/`

1. Header: marca; enlaces a Catálogo, Cómo funciona, FAQ y Contacto; CTA de contacto disponible.
2. Hero: «Software para lanzar tu próxima idea sin empezar desde cero». Subtítulo honesto sobre alcance y personalización; CTA «Explorar catálogo» y contacto si está configurado.
3. Catálogo con buscador por título, resumen, etiquetas y stack; filtro de nicho, disponibilidad y orden. Búsqueda insensible a mayúsculas y tildes.
4. URL como estado compartible: `?q=&niche=&status=&sort=`. Refleja navegación atrás/adelante, normaliza parámetros desconocidos y evita navegación completa en cada tecla. No crees un estado local que diverja de la URL.
5. Tarjetas: portada, categoría, disponibilidad, título, propuesta de valor, stack resumido, precio con moneda y enlace real a `/mvp/[slug]`.
6. Estado sin resultados, contador y «Limpiar filtros». Nunca muestres un spinner permanente.
7. Proceso de cierre y entrega: consulta/acuerdo → pago acordado y transferencia → puesta en marcha según alcance.
8. Comparación breve con desarrollo a medida: beneficios y límites, sin porcentajes ni plazos inventados.
9. Soporte, FAQ y contacto. Footer con navegación legal y contactos configurados.

Conserva enlaces y contenido inicial del catálogo en HTML servido por el servidor. La interacción puede hidratar un Client Component. No fuerces SSG de todas las combinaciones de filtros; usa las APIs documentadas de la versión elegida.

### Ficha `/mvp/[slug]`

Página compartible e indexable, con título, resumen y breadcrumbs; galería con lightbox accesible; video opcional; problema, funciones, alcance, exclusiones, stack, despliegue, gastos recurrentes, licencia, entrega y soporte.

CTAs según disponibilidad: solicitar compra o encargo, demo si existe y consulta. El formulario debe abrirse o enlazarse con el producto preseleccionado y validado por slug. Para un slug inexistente devuelve 404.

### Rutas auxiliares

- `/gracias`: confirmación del envío aceptado por el proveedor; no afirmar entrega en bandeja de entrada. `noindex`; una visita directa no cuenta como conversión.
- `/terminos` y `/privacidad`: borradores identificados mientras falten los datos del vendedor y la revisión correspondiente.
- Página 404 útil con regreso al catálogo.
- Nunca añadas una regla genérica de «sin reembolsos». La política depende del contrato, tipo de comprador y jurisdicción que el propietario confirme.

## 8. Contacto real y manejo de errores

### WhatsApp

Helper único: número internacional en configuración, validado y normalizado a dígitos para `wa.me`; mensaje con título del producto y URL canónica, codificado con `encodeURIComponent`.

No incluyas mensajes privados ni datos personales en URLs de analítica. Si falta el número, no renderices un enlace activo. El texto del CTA debe explicar que inicia una conversación, no que finaliza una compra.

### Formulario

Campos: nombre, email, producto opcional y mensaje. Define límites razonables, mensajes en español y validación Zod tanto en cliente como en servidor. Revalida el slug en servidor, trata todo campo como entrada no confiable y no aceptes destinatarios enviados por el cliente.

Envía con Resend desde un remitente verificado, a `CONTACT_EMAIL_TO`, con `replyTo` del solicitante. Usa texto plano o escape seguro. Nunca renderices HTML recibido del usuario.

Protección: honeypot, límite distribuido con Upstash Redis, tamaño máximo del mensaje y prevención de doble envío. Usa la IP procedente de la cabecera confiable documentada para el despliegue; no confíes indiscriminadamente en cualquier cabecera reenviada. Pseudonimiza la clave del limitador con `RATE_LIMIT_SALT`. Un `Map` en memoria no es una protección de producción para serverless.

Estados verificables: reposo, validación, enviando, éxito, límite excedido y error del proveedor. Conserva el mensaje ante fallo. Redirige a `/gracias` solo cuando el proveedor acepte el envío.

Si faltan credenciales o falla el limitador, desactiva/rechaza el envío con una explicación y alternativa de contacto si existe. Los mocks viven únicamente en tests; nunca simules éxito al usuario en producción ni registres el contenido completo del mensaje en logs.

Incluye aviso de tratamiento de datos y enlace a privacidad. No añadas newsletter ni suscripción de marketing. Si el propietario exige una casilla por su base legal, documenta esa decisión; no atribuyas una obligación universal.

## 9. Medios, SEO y analítica

- Imágenes con `next/image`, dimensiones, `sizes` y texto alternativo. Carga prioritaria solo para la imagen que realmente sea LCP. Configura dominios remotos permitidos si fueran necesarios.
- Videos con miniatura y carga al interactuar; sin autoplay. Archivos locales con `preload="none"` y controles; embeds construidos desde proveedores y URLs permitidos, nunca desde HTML arbitrario. Si el material contiene voz, contempla subtítulos o transcripción.
- Metadatos por ficha: title, description, canonical, OpenGraph y Twitter Card. Usa una imagen OG por producto o una alternativa local de marca; no es obligatorio generar imágenes dinámicas.
- `sitemap.ts` y `robots.ts` coherentes con el dominio y las rutas públicas. Staging y catálogos de muestra: `noindex`; no publiques ejemplos como productos reales en el sitemap.
- JSON-LD solo con hechos visibles y verificables. Usa un tipo adecuado al software ofrecido; añade `Offer` únicamente si existen condiciones y precio concretos. Omite ofertas en cotizaciones, reseñas inexistentes y productos de ejemplo. Escapa el JSON al insertarlo.
- No prometas resultados enriquecidos. La FAQ visual no requiere `FAQPage`; no lo añadas como supuesto beneficio SEO para este comercio.
- Analítica opcional con Vercel Analytics y helper `trackEvent()`. Si la plataforma/plan no permite eventos personalizados, deja el adaptador documentado e inactivo hasta configurar un proveedor compatible.
- Eventos: `view_mvp`, `click_whatsapp`, `click_live_demo`, `play_demo_video`, `submit_lead`. `submit_lead` solo después de aceptación real del proveedor; no por visitar `/gracias`. `play_demo_video` requiere inicio de reproducción confirmado; si solo se abre un embed, registra `open_demo_video`.
- Datos permitidos en eventos: slug y ubicación del CTA. Nunca nombre, email, texto del mensaje, teléfono, IP o contenido de búsqueda. Configura privacidad/consentimiento según la decisión legal y el proveedor antes de activarla.

## 10. Verificación y criterios de aceptación

Crea y documenta scripts reales:

```text
npm run dev
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run validate:data
npm run build
npm run start
npm run check:launch
```

- `lint` ejecuta ESLint explícitamente; no supongas que `next build` lo ejecuta.
- `typecheck` ejecuta TypeScript sin emitir archivos y genera antes los tipos de Next si la versión elegida lo requiere.
- `test` ejecuta pruebas en modo no interactivo.
- `build` valida el catálogo y después construye la aplicación.
- `check:launch` detecta marca provisional, dominio inválido, productos de muestra publicables, contactos ausentes, credenciales necesarias para el canal activado, políticas sin completar y medios o enlaces provisionales. Es una comprobación técnica; no certifica validez legal ni entrega real de correos.

Pruebas mínimas con resultados registrados:

1. Tipado, lint, validación, pruebas y build pasan en una instalación reproducible con `npm ci`.
2. Búsqueda, filtros, URL compartida, atrás/adelante, estado vacío y reset funcionan.
3. Dinero USD/CLP, cotización, slug duplicado, datos inválidos y enlaces WhatsApp tienen pruebas unitarias.
4. Ficha válida, 404, ausencia de medios, estado vendido y encargo funcionan.
5. Formulario: errores, doble clic, proveedor fallido, limitación y éxito; E2E con transportes simulados identificados. Prueba de correo real separada cuando haya credenciales.
6. Navegación móvil, teclado, foco del diálogo y movimiento reducido se comprueban. Un escáner automático no reemplaza la comprobación manual.
7. Cambiar marca y añadir un producto válido actualiza tarjetas, ficha y metadatos sin editar componentes.
8. Inspecciona metadatos y HTML inicial; verifica que no se filtran secretos al cliente.

Objetivos de rendimiento: Lighthouse móvil en build de producción, mediana de tres corridas con herramienta y condiciones registradas; Performance ≥90, Accesibilidad ≥95 y SEO ≥95 como metas, no garantías. Usa configuración de indexación de lanzamiento para evaluar SEO, sin publicar el sitio. Si no se alcanza un objetivo, reporta causa y pendiente; no cambies el resultado ni quites controles. LCP ≤2,5 s, INP ≤200 ms y CLS ≤0,1 son objetivos de campo que requieren datos reales; no afirmes verificarlos solo con Lighthouse.

**Distinción obligatoria:**

- «Implementación local verificada»: pruebas ejecutadas y flujos comprobados, con límites de integración señalados.
- «Lista para publicar»: además, contenido real, contactos y dominio válidos, revisión de políticas y prueba real del formulario. Requiere pasar el checklist de lanzamiento.
- «Publicada»: solo cuando exista despliegue autorizado, URL accesible y verificación posterior.

## 11. Fases de ejecución

| Fase | Entrega | Evidencia antes de cerrarla |
| --- | --- | --- |
| 1 | Scaffold, configuración, esquema, datos y documentación sincronizada | dev, lint, typecheck y validate:data |
| 2 | Diseño, inicio y catálogo con filtros | búsqueda/URL/estados y responsive |
| 3 | Fichas, medios, SEO y páginas auxiliares | rutas, 404, teclado y metadatos |
| 4 | Contacto, antiabuso y analítica opcional | tests de contacto y límites de integración |
| 5 | Revisión integrada, rendimiento y entrega local | comandos completos y evidencias E2E |
| 6 | Preparación del lanzamiento | checklist real; publicación solo con autorización |

No te detengas automáticamente entre fases ni pidas confirmaciones rutinarias. Una fase bloqueada por una credencial no impide avanzar en trabajo local independiente. Registra el bloqueo y evita declarar esa integración verificada.

## 12. Decisiones del propietario antes del lanzamiento

Pendientes: nombre final, dominio, identidad del vendedor y jurisdicción, contacto público, destinatario y remitente del formulario, catálogo real con medios autorizados, monedas/precios/impuestos, licencia y exclusividad por producto, plazos de entrega, alcance del soporte y política de reembolsos.

No son motivo para detener el scaffold. Usa los ejemplos explícitos en desarrollo y enumera los pendientes en `PROJECT_STATUS.md`. No solicites secretos en el chat: indica cómo configurarlos localmente.

## 13. Reglas para continuar fielmente

- Este documento define alcance y aceptación; `AI_RULES.md` define la forma de trabajar; `README.md` explica la operación real; `PROJECT_STATUS.md` registra evidencia, bloqueos y siguiente paso.
- Una instrucción posterior explícita del propietario puede cambiar el alcance: registra la decisión y sincroniza los documentos afectados. No trates un comentario en código como permiso para cambiar el negocio.
- Comienza cada sesión leyendo los documentos y contrastando el estado con los archivos y comandos disponibles.
- No añadas features, dependencias o servicios sin necesidad. No cambies framework, canales de venta ni diseño base por preferencias personales.
- Implementa con cambios pequeños, tipado estricto y componentes accesibles. No uses `any`, `@ts-ignore`, desactivaciones de lint ni saltos de tests para ocultar errores.
- No borres pruebas para conseguir resultados verdes. No inventes contenido comercial, clientes ni credenciales.
- No ejecutes despliegues públicos, compras de servicios, merges, force-push o borrados destructivos sin autorización específica. Trabaja sobre rama si existe Git; no presupongas un remoto.
- Cierra cada sesión actualizando el estado con lo hecho, lo probado, lo bloqueado y una única próxima tarea concreta. No reinicies un proyecto ya avanzado.
- Nunca marques «completado» por haber escrito un plan. Si no puedes ejecutar una comprobación, indica «no ejecutada» y la razón.

## 14. README que debes mantener

Incluye propósito y límites de la v1, estructura, versiones realmente instaladas, requisitos, instalación, variables y su alcance público/servidor, scripts existentes, cómo añadir productos, cómo reemplazar marca/dominio/contactos, pruebas, despliegue y checklist de lanzamiento.

Mientras solo haya documentación, muestra esa condición de forma visible y etiqueta los comandos de la aplicación como previstos. Tras crear el código, reemplaza previsiones por instrucciones verificadas. No dejes comandos que aún no existen como si funcionaran.

Añade este mensaje de reanudación:

> Lee PROMPT_MAESTRO.md, AI_RULES.md, README.md y PROJECT_STATUS.md. Contrasta el estado con el workspace y continúa desde la siguiente tarea pendiente sin reiniciar ni cambiar el alcance. Ejecuta las comprobaciones aplicables y actualiza el estado con evidencia real antes de terminar.

## 15. PROJECT_STATUS inicial y mantenimiento

Al iniciar desde estos documentos: fase 0 documental completa; fases 1–6 pendientes; aplicación, dependencias, pruebas, integraciones y despliegue **no implementados/no ejecutados**.

Mantén: última actualización, fase activa, tabla de tareas con `pending / in_progress / blocked / done`, decisiones con fecha, archivos realmente modificados, comandos y resultados, bloqueos de lanzamiento, siguiente tarea concreta e historial breve.

Al finalizar cada bloque, informa de forma concisa qué quedó funcional, qué comprobaste y qué falta. Mantén el siguiente paso suficientemente específico para que otra sesión de Antigravity continúe sin reconstruir la historia.

**Empieza ahora inspeccionando el workspace y ejecutando la fase 1.**
