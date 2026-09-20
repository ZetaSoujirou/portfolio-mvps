"use client";

import { useState } from "react";
import { faqContent } from "@/content/faq";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="space-y-12 scroll-mt-20 py-8" aria-label="Preguntas frecuentes">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Preguntas Frecuentes
        </h2>
        <p className="text-sm sm:text-base text-muted">
          Respuestas transparentes sobre licencias, entrega, pagos y soporte técnico.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqContent.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              className="rounded-xl border border-border bg-surface transition-colors overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <span className="font-semibold text-sm sm:text-base text-foreground">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-accent shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-5 text-sm text-muted leading-relaxed border-t border-border/50 pt-3">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
