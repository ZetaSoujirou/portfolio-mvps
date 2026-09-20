import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
      <span className="text-accent font-mono text-sm font-semibold tracking-wider">404</span>
      <h1 className="text-3xl font-bold text-foreground">Proyecto o página no encontrada</h1>
      <p className="text-muted max-w-md text-sm">
        El recurso solicitado no existe o ha sido reubicado. Puedes explorar nuestro catálogo completo de proyectos.
      </p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent-hover transition-colors"
      >
        Regresar al catálogo
      </Link>
    </div>
  );
}
