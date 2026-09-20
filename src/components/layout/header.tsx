"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Menu, X, MessageSquare } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#catalogo", label: "Catálogo" },
    { href: "/#proceso", label: "Cómo funciona" },
    { href: "/#comparativa", label: "Comparativa" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="font-bold text-lg tracking-tight text-foreground flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-accent rounded-md px-1"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
          <span>{siteConfig.brandName}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/#catalogo"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-xs font-semibold text-foreground hover:bg-surface-hover hover:border-border-strong transition-all focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <MessageSquare className="w-3.5 h-3.5 text-accent" />
            Consultar catálogo
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface focus:outline-none focus:ring-2 focus:ring-accent"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-2 border-t border-border">
            <Link
              href="/#catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-background text-xs font-bold transition-opacity hover:opacity-90"
            >
              <MessageSquare className="w-4 h-4" />
              Explorar proyectos
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
