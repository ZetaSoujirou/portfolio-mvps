import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllMVPs, getMVPBySlug } from "@/lib/catalog/repository";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GalleryLightbox } from "@/components/mvp/gallery-lightbox";
import { VideoDemo } from "@/components/mvp/video-demo";
import { MVPDetails } from "@/components/mvp/mvp-details";
import { MVPActions } from "@/components/mvp/mvp-actions";
import { ChevronRight, Home, Sparkles } from "lucide-react";

interface MVPPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const mvps = await getAllMVPs();
  return mvps.map((mvp) => ({
    slug: mvp.slug,
  }));
}

export async function generateMetadata({ params }: MVPPageProps): Promise<Metadata> {
  const { slug } = await params;
  const mvp = await getMVPBySlug(slug);

  if (!mvp) {
    return {
      title: "Proyecto no encontrado",
      description: "El proyecto solicitado no existe en nuestro catálogo.",
    };
  }

  const title = `${mvp.title} | ${siteConfig.brandName}`;
  const description = mvp.seo?.description || mvp.summary;
  const canonicalUrl = `${siteConfig.siteUrl}/mvp/${mvp.slug}`;
  const imageUrl = mvp.cover.src.startsWith("http")
    ? mvp.cover.src
    : `${siteConfig.siteUrl}${mvp.cover.src}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.brandName,
      images: [
        {
          url: imageUrl,
          width: mvp.cover.width,
          height: mvp.cover.height,
          alt: mvp.cover.alt,
        },
      ],
      type: "website",
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function MVPPage({ params }: MVPPageProps) {
  const { slug } = await params;
  const mvp = await getMVPBySlug(slug);

  if (!mvp) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted">
          <Link
            href="/"
            className="hover:text-foreground flex items-center gap-1 transition-colors focus:outline-none focus:underline"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Inicio</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-muted/60" />
          <Link
            href="/#catalogo"
            className="hover:text-foreground transition-colors focus:outline-none focus:underline"
          >
            Catálogo
          </Link>
          <ChevronRight className="w-3 h-3 text-muted/60" />
          <span className="text-foreground font-medium truncate max-w-xs sm:max-w-md">
            {mvp.title}
          </span>
        </nav>

        {/* Encabezado del MVP */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="uppercase font-mono text-xs font-semibold tracking-wider text-accent px-2.5 py-0.5 rounded bg-accent/10 border border-accent/20">
              {mvp.niche}
            </span>
            {mvp.isSample && (
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-surface text-accent border border-accent/30">
                <Sparkles className="w-3 h-3" />
                Proyecto de ejemplo
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            {mvp.title}
          </h1>

          <p className="text-base sm:text-lg text-muted leading-relaxed">
            {mvp.tagline}
          </p>
        </div>

        {/* Layout en dos columnas: Galería y Acciones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Columna Izquierda: Galería, Video y Detalles */}
          <div className="lg:col-span-8 space-y-12">
            {/* Galería con Lightbox */}
            <GalleryLightbox
              cover={mvp.cover}
              gallery={mvp.gallery}
              title={mvp.title}
            />

            {/* Video opcional */}
            {mvp.video && (
              <VideoDemo video={mvp.video} title={mvp.title} />
            )}

            {/* Desglose detallado del producto */}
            <MVPDetails mvp={mvp} />
          </div>

          {/* Columna Derecha: Panel de Acciones Sticky */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <MVPActions mvp={mvp} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
