"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight, Menu, Sparkles, Trophy, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Rounds", href: "#rounds" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

export default function CodepatiNavbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".nav-reveal", {
          opacity: 1,
          y: 0,
        });

        return;
      }

      gsap.fromTo(
        ".nav-reveal",
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    }, nav);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const menu = mobileMenuRef.current;

    if (!menu) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isMenuOpen) {
      gsap.set(menu, {
        display: "block",
      });

      if (reduceMotion) {
        gsap.set(menu, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        menu,
        {
          opacity: 0,
          y: -12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        ".mobile-nav-link",
        {
          opacity: 0,
          x: -15,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
          stagger: 0.06,
          delay: 0.05,
          ease: "power2.out",
        },
      );
    } else {
      gsap.set(menu, {
        display: "none",
      });
    }
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#100B25]/80 px-4 py-3 shadow-2xl shadow-black/10 backdrop-blur-2xl sm:px-6">
        {/* Logo */}
        <Link
          href="#home"
          onClick={closeMenu}
          className="nav-reveal group flex items-center gap-3"
          aria-label="Codepati Arena home">
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-yellow-300/30 bg-yellow-300/[0.08]">
            <Trophy className="relative z-10 h-5 w-5 text-yellow-300 transition-transform duration-300 group-hover:scale-110" />

            <span className="absolute inset-0 bg-yellow-300/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </span>

          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-black tracking-tight text-white">
              CODEPATI<span className="text-yellow-300">.</span>
            </span>

            <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Kinetex Lab · KIIT
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-reveal hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-2 text-sm font-medium text-white/60 transition-colors duration-300 hover:text-yellow-300">
              {link.label}

              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-yellow-300 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="nav-reveal hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/35">
            <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
            2026 Edition
          </div>

          <Link
            href="#register"
            className="group inline-flex items-center gap-2 rounded-full bg-yellow-300 px-5 py-3 text-xs font-black text-[#100B25] transition-all duration-300 hover:bg-yellow-200 hover:shadow-[0_0_30px_rgba(250,204,21,0.2)]">
            Register Now
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((previous) => !previous)}
          className="nav-reveal inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-yellow-300/30 hover:text-yellow-300 lg:hidden">
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        ref={mobileMenuRef}
        className="mx-auto mt-2 hidden max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-[#17102f]/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden">
        <div className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="mobile-nav-link rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-colors duration-300 hover:bg-yellow-300/[0.08] hover:text-yellow-300">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="my-3 h-px bg-white/10" />

        <Link
          href="#register"
          onClick={closeMenu}
          className="mobile-nav-link group flex items-center justify-center gap-2 rounded-xl bg-yellow-300 px-5 py-3.5 text-sm font-black text-[#100B25] transition-colors hover:bg-yellow-200">
          Register Now
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>

        <p className="mobile-nav-link mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
          Kinetex Lab · KIIT Chapter
        </p>
      </div>
    </header>
  );
}
