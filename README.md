# Zeta Studio — Portfolio Comercial de MVPs

> **Estado del proyecto**: **Implementación local verificada (Fases 0 a 6 completadas)**.  
> Dominio canónico: `https://zetastudio.cl` · Marca: **Zeta Studio** · Idioma: `es-CL`.

---

## 1. Propósito y Límites de la v1

Esta aplicación web es un **catálogo comercial de MVPs y proyectos tecnológicos de un único vendedor**, orientada a la captación de consultas comerciales y solicitudes de compra o desarrollo a medida.

### Límites de la v1 (Fuera de alcance):
- Sin carrito de compras ni pasarelas de pago integradas (el cierre comercial es asistido y fuera del sitio).
- Sin cuentas de usuario, panel de administración ni descargas privadas.
- Sin suscripciones ni facturación automatizada.
- Sin múltiples vendedores (single vendor).
- Sin buscador con IA ni traducciones completas (idioma base: español `es-CL`).

---

## 2. Estructura del Proyecto

```text
PROMPT_MAESTRO.md         # Especificación completa y requerimientos
AI_RULES.md               # Reglas de desarrollo y calidad para el agente
README.md                 # Este manual técnico y operativo
PROJECT_STATUS.md         # Bitácora de avance, evidencias y bloqueos
.agents/rules/project.md  # Regla de arranque para agentes
.env.example              # Plantilla de variables de entorno
src/
  app/                    # Next.js App Router (páginas y layouts)
    layout.tsx            # Layout raíz (tema oscuro, español es-CL)
    page.tsx              # Página principal (hero, catálogo interactivo, proceso, FAQ, contacto)
    globals.css           # Estilos globales y tokens del tema oscuro
    mvp/[slug]/page.tsx   # Ficha individual de cada MVP (SSG)
    gracias/page.tsx      # Confirmación tras consulta (noindex)
    terminos/page.tsx     # Términos y condiciones
    privacidad/page.tsx   # Política de privacidad
    sitemap.ts            # Generador dinámico de sitemap.xml
    robots.ts             # Generador de robots.txt
    not-found.tsx         # Página 404 personalizada
  actions/
    contact.ts            # Server Action para envío de consultas con antiabuso
  components/
    catalog/              # Catálogo, buscador con debounce, filtros en URL, tarjetas, empty state
    contact/              # Formulario con validación Zod, honeypot, timestamp y canales directos
    home/                 # Hero, Proceso en 3 pasos, Comparativa honesta, FAQ acordeón
    layout/               # Header sticky con menú móvil accesible y Footer con navegación legal
    mvp/                  # Galería con Lightbox accesible, video condicional, desglose y CTAs
  config/
    site.ts               # Configuración centralizada de marca, dominio y canales
  content/
    home.ts               # Contenidos editables de la portada y proceso
    faq.ts                # Preguntas frecuentes comerciales y técnicas
    legal.ts              # Borradores legales de términos y privacidad
  data/
    mvps.ts               # Catálogo de MVPs tipado y validado
  lib/
    analytics.ts          # Adaptador de analítica respetuoso de privacidad
    money.ts              # Formato monetario internacional (USD y CLP)
    whatsapp.ts           # Helper de enlaces wa.me con normalización a dígitos
    catalog/
      schema.ts           # Esquemas Zod (Price discriminado, ImageAsset, VideoDemo, MVP)
      repository.ts       # Acceso desacoplado a los datos del catálogo
      search.ts           # Lógica pura de búsqueda diacrítica/mayúsculas y orden
    contact/
      schema.ts           # Esquema Zod de contacto, honeypot y timestamp
      rate-limit.ts       # Limitador de tasa SHA-256 (Upstash Redis / fallback local)
      send.ts             # Integración con Resend y degradación honesta
public/
  images/mvps/            # 8 imágenes vectoriales originales para portadas y galerías
scripts/
  validate-data.ts        # Script de validación de datos contra Zod
  check-launch.ts         # Checklist técnico de prelanzamiento
tests/
  unit/                   # Tests unitarios (money, search, schema, whatsapp, contact)
  integration/            # Tests de integración (contact action con mocks, seguridad y marca)
```

---

## 3. Requisitos y Versiones Resueltas

- **Node.js**: `v22.21.0` (LTS)
- **npm**: `11.7.0`
- **Next.js**: `15.3.9` (App Router, Server Components por defecto, con parches de seguridad)
- **React**: `19.0.0` / `react-dom: 19.0.0`
- **TypeScript**: `5.7.3` (Strict Mode)
- **Tailwind CSS**: `3.4.17` (Paleta tema oscuro: `#0a0a0c`, `zinc-900`, `zinc-800`, `#06b6d4`)
- **Zod**: `3.24.2`
- **Lucide React**: `0.475.0`
- **Vitest**: `3.0.7`

---

## 4. Comandos Verificados

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo local en `http://localhost:3000`. |
| `npm run validate:data` | Valida todos los MVPs contra el esquema Zod y comprueba imágenes locales en disco. |
| `npm test` | Ejecuta la suite completa de 47 pruebas en Vitest (7 suites: unitarias e integración). |
| `npm run typecheck` | Comprueba tipos en TypeScript estricto (`tsc --noEmit`). |
| `npm run lint` | Ejecuta ESLint con la configuración oficial `next/core-web-vitals`. |
| `npm run build` | Valida datos y compila la versión de producción generando las 12 páginas estáticas/SSG. |
| `npm run start` | Inicia el servidor de producción local de Next.js. |
| `npm run check:launch` | Ejecuta la auditoría de prelanzamiento y estado de bloqueos. |

---

## 5. Guía de Despliegue: GitHub y Vercel

### Paso 1: Subir el repositorio a GitHub

El proyecto ya está inicializado con Git en la rama `main` y con un commit inicial que incluye todos los archivos excepto los temporales e ignorados (`node_modules`, `.next`).

1. Crea un nuevo repositorio vacío en tu cuenta de GitHub (por ejemplo, `portfolio-mvps` o `zetastudio-portfolio`).
2. En tu terminal, dentro de la carpeta del proyecto, ejecuta:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

### Paso 2: Conectar con Vercel

1. Ingresa a [Vercel](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **Add New... > Project** e importa el repositorio que acabas de subir.
3. En la configuración del proyecto:
   - **Framework Preset**: `Next.js` (detectado automáticamente).
   - **Root Directory**: `./`
4. Configura las variables de entorno en la sección **Environment Variables**:

| Variable | Alcance | Valor para Producción |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Público | `https://zetastudio.cl` |
| `RESEND_API_KEY` | Servidor | Clave API de tu cuenta en Resend (`re_...`) |
| `RESEND_FROM_EMAIL` | Servidor | Remitente verificado (ej. `contacto@zetastudio.cl`) |
| `CONTACT_EMAIL_TO` | Servidor | Tu buzón de recepción (ej. `tu-correo@zetastudio.cl`) |
| `UPSTASH_REDIS_REST_URL` | Servidor | URL de tu base de datos Upstash Redis REST |
| `UPSTASH_REDIS_REST_TOKEN` | Servidor | Token de tu base de datos Upstash Redis REST |
| `RATE_LIMIT_SALT` | Servidor | Cadena aleatoria secreta para pseudonimizar IPs |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Público | `false` (o `true` si activas Vercel Analytics) |

5. Haz clic en **Deploy**.
6. Una vez desplegado, ve a **Settings > Domains** en Vercel y añade tu dominio `zetastudio.cl` siguiendo las instrucciones de DNS que te indique Vercel.

---

## 6. Checklist de Prelanzamiento del Propietario

Antes de promocionar públicamente la web, revisa los siguientes puntos:

- [x] **Nombre de marca**: Definido como `Zeta Studio`.
- [x] **Dominio canónico**: Definido como `https://zetastudio.cl`.
- [ ] **WhatsApp comercial**: Configurar el número internacional en `src/config/site.ts` (`whatsappNumber: "+569..."`).
- [ ] **Email público**: Configurar correo de contacto en `src/config/site.ts` (`publicEmail: "contacto@zetastudio.cl"`).
- [ ] **Credenciales de Resend**: Configurar variables de servidor en Vercel.
- [ ] **Credenciales de Upstash Redis**: Configurar variables de servidor en Vercel.
- [ ] **Catálogo definitivo**: Reemplazar los 3 proyectos de ejemplo por proyectos reales en `src/data/mvps.ts` cuando estén listos.
- [ ] **Revisión legal**: Ajustar términos y privacidad en `src/content/legal.ts` con tus datos fiscales/comerciales definitivos.
