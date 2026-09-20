import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Marca y descripción */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="font-bold text-lg tracking-tight text-foreground flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span>{siteConfig.brandName}</span>
            </Link>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              Catálogo de MVPs y software de un único vendedor. Proyectos estructurados, código fuente transferible y acompañamiento técnico para lanzar tu próxima idea.
            </p>
          </div>

          {/* Col 2: Navegación */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/#catalogo" className="hover:text-foreground transition-colors">
                  Catálogo de MVPs
                </Link>
              </li>
              <li>
                <Link href="/#proceso" className="hover:text-foreground transition-colors">
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link href="/#comparativa" className="hover:text-foreground transition-colors">
                  Comparativa
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-foreground transition-colors">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal y Contacto */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Legal y Contacto
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/terminos" className="hover:text-foreground transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-foreground transition-colors">
                  Política de privacidad
                </Link>
              </li>
              {siteConfig.publicEmail && (
                <li>
                  <a
                    href={`mailto:${siteConfig.publicEmail}`}
                    className="hover:text-foreground transition-colors text-accent"
                  >
                    {siteConfig.publicEmail}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>
            © {currentYear} {siteConfig.brandName}. Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-muted/70">
            Diseñado para cierre comercial asistido · Sin checkout ni cobros automatizados
          </p>
        </div>
      </div>
    </footer>
  );
}
