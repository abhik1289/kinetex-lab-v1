"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Sparkles,
  Trophy,
} from "lucide-react";

export default function CodepatiHero() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = heroRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".hero-reveal", { opacity: 1, y: 0, x: 0 });
        gsap.set(".hero-glow", { opacity: 0.5 });
        return;
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      timeline
        .fromTo(
          ".hero-eyebrow",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
        )
        .fromTo(
          ".hero-title-line",
          { opacity: 0, y: 80, rotateX: -35 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.12,
          },
          "-=0.35",
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.45",
        )
        .fromTo(
          ".hero-meta",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
          },
          "-=0.35",
        )
        .fromTo(
          ".hero-actions",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.3",
        )
        .fromTo(
          ".hero-visual",
          { opacity: 0, scale: 0.92, x: 40 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.1,
            ease: "expo.out",
          },
          "-=0.8",
        );

      gsap.to(".hero-glow", {
        scale: 1.15,
        opacity: 0.7,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-orbit", {
        rotate: 360,
        duration: 35,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".hero-floating-card", {
        y: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4,
      });

      gsap.to(".hero-grid", {
        backgroundPosition: "80px 80px",
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative isolate min-h-screen overflow-hidden bg-[#100B25] text-white">
      {/* Background Effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(250,204,21,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.35)_1px,transparent_1px)] [background-size:80px_80px]" />

        <div className="hero-glow absolute -left-40 top-0 h-[550px] w-[550px] rounded-full bg-yellow-400/15 blur-[140px]" />

        <div className="absolute -bottom-48 right-[-12rem] h-[650px] w-[650px] rounded-full bg-violet-600/20 blur-[150px]" />

        <div className="hero-orbit absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-300/10" />

        <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-300/10" />
      </div>

      {/* Navigation Spacing */}
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-32 sm:px-10 lg:px-16">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Hero Content */}
          <div className="max-w-3xl">
            <div className="hero-reveal hero-eyebrow mb-7 inline-flex items-center gap-3 rounded-full border border-yellow-300/20 bg-yellow-300/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
              <Sparkles className="h-4 w-4" />
              Kinetex Lab · KIIT Chapter
            </div>

            <div className="overflow-hidden">
              <p className="hero-reveal hero-title-line mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-white/50">
                Welcome to
              </p>
            </div>

            <div className="overflow-hidden [perspective:900px]">
              <h1 className="font-heading text-3xl font-black leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-[6.5rem]">
                <span className="hero-reveal hero-title-line block">The</span>

                <span className="hero-reveal hero-title-line block text-yellow-300">
                  Codepati
                </span>

                <span className="hero-reveal hero-title-line block">
                  Arena<span className="text-yellow-300">.</span>
                </span>
              </h1>
            </div>

            <p className="hero-reveal hero-description mt-2 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
              A multi-stage technical competition where knowledge meets
              innovation. Think beyond the answer, build meaningful solutions,
              and compete for the Codepati Crown.
            </p>

            {/* Event Metadata */}
            <div className="mt-9 flex flex-wrap gap-3">
              <div className="hero-reveal hero-meta flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md">
                <CalendarDays className="h-5 w-5 text-yellow-300" />

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    Date
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    2nd & 3rd October 2026
                  </p>
                </div>
              </div>

              <div className="hero-reveal hero-meta flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md">
                <MapPin className="h-5 w-5 text-yellow-300" />

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    KIIT, Bhubaneswar
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="hero-reveal hero-actions mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="#register"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-yellow-300 px-6 py-4 text-sm font-bold text-[#100B25] shadow-[0_0_35px_rgba(250,204,21,0.18)] transition-all duration-300 hover:bg-yellow-200 hover:shadow-[0_0_45px_rgba(250,204,21,0.35)]">
                Register Now
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>

              <Link
                href="#rounds"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-yellow-300">
                Explore the journey
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="hero-reveal hero-actions mt-8 flex items-center gap-3 text-xs text-white/40">
              <span className="h-px w-10 bg-yellow-300/50" />
              <span>Quiz · Hack · Pitch · Crown</span>
            </div>
          </div>

          {/* Visual Arena */}
          <div className="hero-reveal hero-visual relative mx-auto flex min-h-[420px] w-full max-w-[530px] items-center justify-center lg:min-h-[560px]">
            <div className="relative aspect-square w-full max-w-[440px]">
              {/* Main Orb */}
              <div className="absolute inset-[12%] rounded-full border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-violet-500/10 to-transparent shadow-[0_0_100px_rgba(250,204,21,0.1)] backdrop-blur-sm" />

              <div className="absolute inset-[22%] rounded-full border border-white/10 bg-white/[0.025]" />

              <div className="absolute inset-[32%] flex flex-col items-center justify-center rounded-full border border-yellow-300/30 bg-yellow-300/[0.06] text-center shadow-[0_0_80px_rgba(250,204,21,0.12)]">
                <Trophy className="mb-4 h-10 w-10 text-yellow-300 sm:h-12 sm:w-12" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
                  The ultimate
                </span>

                <span className="mt-2 text-2xl font-black tracking-tight text-yellow-300 sm:text-3xl">
                  Codepati
                </span>

                <span className="text-sm font-semibold text-white/80">
                  Crown
                </span>
              </div>

              {/* Orbiting Cards */}
              <div className="hero-floating-card absolute left-0 top-[18%] rounded-2xl border border-white/10 bg-[#1d163b]/90 px-4 py-3 shadow-2xl backdrop-blur-xl">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Round 01
                </p>
                <p className="mt-1 text-sm font-bold text-white">Tech Quiz</p>
              </div>

              <div className="hero-floating-card absolute bottom-[16%] right-[-2%] rounded-2xl border border-white/10 bg-[#1d163b]/90 px-4 py-3 shadow-2xl backdrop-blur-xl">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Round 02
                </p>
                <p className="mt-1 text-sm font-bold text-white">Hack It</p>
              </div>

              <div className="hero-floating-card absolute right-[0%] top-[8%] rounded-2xl border border-yellow-300/20 bg-yellow-300/[0.08] px-4 py-3 shadow-2xl backdrop-blur-xl">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-yellow-300/60">
                  Final Stage
                </p>
                <p className="mt-1 text-sm font-bold text-yellow-300">
                  Codepati
                </p>
              </div>

              <div className="hero-floating-card absolute bottom-[7%] left-[4%] rounded-2xl border border-white/10 bg-[#1d163b]/90 px-4 py-3 shadow-2xl backdrop-blur-xl">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Round 03
                </p>
                <p className="mt-1 text-sm font-bold text-white">Pitch It</p>
              </div>

              {/* Decorative Dots */}
              <div className="absolute left-[18%] top-[5%] h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_20px_#facc15]" />
              <div className="absolute bottom-[20%] right-[20%] h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_20px_#c4b5fd]" />
              <div className="absolute bottom-[5%] left-1/2 h-1.5 w-1.5 rounded-full bg-white/70" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#100B25] to-transparent"
      />
    </section>
  );
}
