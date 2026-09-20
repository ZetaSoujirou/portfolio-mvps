"use client";

import { useState } from "react";
import { VideoDemo as VideoDemoType } from "@/lib/catalog/schema";
import { Play, FileText, ChevronDown } from "lucide-react";

interface VideoDemoProps {
  video?: VideoDemoType;
  title: string;
}

export function VideoDemo({ video, title }: VideoDemoProps) {
  const [showTranscript, setShowTranscript] = useState(false);

  if (!video) return null;

  return (
    <section className="space-y-4 pt-6 border-t border-border" aria-label="Demostración en video">
      <div className="flex items-center gap-2">
        <Play className="w-5 h-5 text-accent" />
        <h2 className="text-xl font-bold text-foreground">
          Demostración en video
        </h2>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
        {video.provider === "file" ? (
          <video
            controls
            poster={video.poster.src}
            className="w-full h-full object-contain"
            aria-label={`Video demostración de ${title}`}
          >
            <source src={video.url} type={video.mimeType} />
            {video.captionsUrl && (
              <track
                kind="captions"
                src={video.captionsUrl}
                srcLang="es"
                label="Español"
                default
              />
            )}
            Tu navegador no soporta el elemento de video.
          </video>
        ) : (
          <iframe
            src={video.url}
            title={`Video demostración de ${title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="w-full h-full border-0"
          />
        )}
      </div>

      {/* Transcripción opcional */}
      {video.transcript && (
        <div className="rounded-lg border border-border bg-surface overflow-hidden">
          <button
            type="button"
            onClick={() => setShowTranscript(!showTranscript)}
            className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-foreground hover:bg-surface-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            aria-expanded={showTranscript}
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" />
              Ver transcripción del video
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted transition-transform duration-200 ${
                showTranscript ? "rotate-180" : ""
              }`}
            />
          </button>

          {showTranscript && (
            <div className="p-4 text-xs text-muted leading-relaxed border-t border-border whitespace-pre-line bg-surface-subtle/30">
              {video.transcript}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
