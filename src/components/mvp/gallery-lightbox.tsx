"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ImageAsset } from "@/lib/catalog/schema";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface GalleryLightboxProps {
  cover: ImageAsset;
  gallery: ImageAsset[];
  title: string;
}

export function GalleryLightbox({ cover, gallery, title }: GalleryLightboxProps) {
  const allImages: ImageAsset[] = [cover, ...gallery];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const selectedImage = allImages[selectedIndex] || cover;

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Control con teclado en el lightbox
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose, handlePrev, handleNext]);

  return (
    <div className="space-y-4">
      {/* Imagen Principal */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface-subtle group">
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt || title}
          width={selectedImage.width}
          height={selectedImage.height}
          priority
          className="object-cover w-full h-full cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01]"
          onClick={() => setIsOpen(true)}
          sizes="(max-width: 1024px) 100vw, 60vw"
        />

        {/* Botón para abrir Lightbox */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute bottom-3 right-3 p-2 rounded-lg bg-surface/80 border border-border text-foreground hover:bg-surface hover:text-accent backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Abrir imagen en pantalla completa"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Tira de miniaturas si hay más de 1 imagen */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {allImages.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={img.src + idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative aspect-video w-24 sm:w-28 shrink-0 overflow-hidden rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-accent ${
                  isSelected
                    ? "border-accent ring-2 ring-accent/30 opacity-100"
                    : "border-border opacity-70 hover:opacity-100 hover:border-border-strong"
                }`}
                aria-label={`Ver imagen ${idx + 1} de ${allImages.length}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt || `${title} miniatura ${idx + 1}`}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Modal Lightbox Accesible */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Visor de imágenes: ${title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4 sm:p-8"
        >
          {/* Overlay click to close */}
          <div
            className="absolute inset-0 cursor-zoom-out"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Botón cerrar */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-surface border border-border text-foreground hover:bg-surface-hover hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Cerrar visor de imágenes (Escape)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Contador de imágenes */}
          <div className="absolute top-4 left-4 z-50 px-3 py-1.5 rounded-lg bg-surface/80 border border-border text-xs font-mono text-muted backdrop-blur-sm">
            {selectedIndex + 1} / {allImages.length}
          </div>

          {/* Botón Anterior */}
          {allImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-surface/80 border border-border text-foreground hover:bg-surface hover:text-accent backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Imagen anterior (Flecha izquierda)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Imagen ampliada */}
          <div
            className="relative z-10 max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt || title}
                width={selectedImage.width}
                height={selectedImage.height}
                className="object-contain max-w-full max-h-[80vh] rounded-lg shadow-2xl"
                priority
              />
            </div>
            {selectedImage.alt && (
              <p className="mt-3 text-xs text-muted text-center max-w-lg">
                {selectedImage.alt}
              </p>
            )}
          </div>

          {/* Botón Siguiente */}
          {allImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-surface/80 border border-border text-foreground hover:bg-surface hover:text-accent backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Imagen siguiente (Flecha derecha)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
