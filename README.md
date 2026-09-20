# Portfolio Comercial de MVPs — `[MI_MARCA_TECH]`

> **Estado actual**: Fases 1 a 5 completadas y verificadas (Scaffold, catálogo interactivo, fichas con SSG, medios, SEO, Server Action de contacto, antiabuso, pruebas de integración de seguridad y build de producción). Siguiente: **Fase 6 (Preparación del lanzamiento)**.

> [!TIP]
> **Mensaje de reanudación para el agente:**
> Lee `PROMPT_MAESTRO.md`, `AI_RULES.md`, `README.md` y `PROJECT_STATUS.md`. Contrasta el estado con el workspace y continúa desde la siguiente tarea pendiente sin reiniciar ni cambiar el alcance. Ejecuta las comprobaciones aplicables y actualiza el estado con evidencia real antes de terminar.

---

## 1. Propósito y Límites de la v1

Esta aplicación web es un **catálogo comercial de MVPs y proyectos tecnológicos de un único vendedor**, orientado a la captación de consultas comerciales y solicitudes de compra o desarrollo a medida.

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
    page.tsx              # Página principal (hero, catálogo, FAQ, contacto)
    globals.css           # Estilos globales y tokens del tema oscuro
    mvp/[slug]/page.tsx   # Ficha individual de cada MVP
    gracias/page.tsx      # Confirmación de envío de formulario
    terminos/page.tsx     # Borrador de términos y condiciones
    privacidad/page.tsx   # Borrador de políticas de privacidad
    not-found.tsx         # Página 404 personalizada
    sitemap.ts            # Mapa del sitio dinámico
    robots.ts             # Directivas de robots.txt
  actions/                # Server Actions (envío de contacto seguro)
  components/             # Componentes UI organizados por dominio
  config/site.ts          # Centralización de marca, URLs y canales
  content/                # Contenidos editables (home, FAQ, legales)
  data/mvps.ts            # Catálogo tipado con los 3 MVPs de ejemplo
  lib/
    catalog/              # Esquema Zod y repositorio del catálogo
    contact/              # Rate limit, envío por Resend y validación
    money.ts              # Formateador de moneda USD y CLP (Intl)
    whatsapp.ts           # Generador de enlaces seguros wa.me
public/images/mvps/       # Portadas y galerías locales de los MVPs
scripts/                  # Scripts de validación de datos y checklist
tests/                    # Pruebas unitarias y de integración
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

## 4. Variables de Entorno

Copia `.env.example` a `.env.local` para desarrollo local:

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Público | URL canónica del sitio (ej. `http://localhost:3000`) |
| `RESEND_API_KEY` | Servidor | API Key de Resend para envío de correos |
| `RESEND_FROM_EMAIL` | Servidor | Remitente verificado en Resend |
| `CONTACT_EMAIL_TO` | Servidor | Buzón de destino para consultas recibidas |
| `UPSTASH_REDIS_REST_URL` | Servidor | Endpoint REST de Upstash Redis para rate limit |
| `UPSTASH_REDIS_REST_TOKEN` | Servidor | Token de Upstash Redis |
| `RATE_LIMIT_SALT` | Servidor | Semilla para pseudonimizar IPs en rate limit |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Público | `false` por defecto en desarrollo |

> [!WARNING]
> Nunca uses el prefijo `NEXT_PUBLIC_` para secretos o claves de API de backend.

---

## 5. Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo local.
- `npm run lint`: Ejecuta ESLint de manera estricta.
- `npm run typecheck`: Ejecuta `tsc --noEmit` para verificar tipos.
- `npm run test`: Ejecuta la suite de pruebas unitarias con Vitest.
- `npm run validate:data`: Valida que todos los productos en `src/data/mvps.ts` cumplan el esquema Zod.
- `npm run build`: Valida los datos y compila el bundle de producción de Next.js.
- `npm run start`: Inicia el servidor en modo producción.
- `npm run check:launch`: Comprobación técnica de prerrequisitos de lanzamiento.
- `npm run test:e2e`: Ejecuta las pruebas E2E con Playwright.

---

## 6. Gestión del Catálogo y Configuración

- **Modificar Marca o Contactos**: Edita `src/config/site.ts`. Los valores no configurados deben mantenerse en `null` para desactivar de forma elegante el canal correspondiente.
- **Añadir o Modificar MVPs**: Edita `src/data/mvps.ts`. Todos los elementos deben satisfacer `mvpSchema` en `src/lib/catalog/schema.ts`. Ejecuta `npm run validate:data` para asegurar la integridad de los datos.
