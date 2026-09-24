"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function EventCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector(".cta-eyebrow");
      const heading = section.querySelector(".cta-heading");
      const description = section.querySelector(".cta-description");
      const button = section.querySelector(".cta-button");
      const glow = section.querySelector(".cta-glow");
      const borderGlow = section.querySelector(".cta-border-glow");

      // Respect the user's accessibility preference.
      if (reduceMotion) {
        gsap.set([eyebrow, heading, description, button, glow, borderGlow], {
          clearProps: "all",
        });

        return;
      }

      // Initial state.
      gsap.set([eyebrow, heading, description, button], {
        opacity: 0,
        y: 28,
      });

      gsap.set(glow, {
        opacity: 0,
        scale: 0.6,
        transformOrigin: "center center",
      });

      gsap.set(borderGlow, {
        opacity: 0,
      });

      // Main entrance timeline.
      const entranceTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
          invalidateOnRefresh: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      entranceTimeline
        .to(eyebrow, {
          opacity: 1,
          y: 0,
          duration: 0.65,
        })
        .to(
          heading,
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
          },
          "-=0.38",
        )
        .to(
          description,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.48",
        )
        .to(
          button,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "back.out(1.4)",
          },
          "-=0.35",
        )
        .to(
          glow,
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
          },
          0,
        )
        .to(
          borderGlow,
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          0.2,
        );

      // Subtle continuous glow movement.
      gsap.to(glow, {
        x: -35,
        y: 25,
        scale: 1.15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Very subtle border illumination.
      gsap.to(borderGlow, {
        opacity: 0.35,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Button hover animation.
      const buttonElement = button as HTMLElement | null;

      if (buttonElement) {
        const buttonArrow = buttonElement.querySelector(".cta-arrow");

        const buttonEnter = () => {
          gsap.to(buttonElement, {
            y: -4,
            scale: 1.025,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });

          gsap.to(buttonArrow, {
            x: 4,
            y: -4,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const buttonLeave = () => {
          gsap.to(buttonElement, {
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          });

          gsap.to(buttonArrow, {
            x: 0,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        buttonElement.addEventListener("mouseenter", buttonEnter);

        buttonElement.addEventListener("mouseleave", buttonLeave);

        // Clean up native event listeners.
        return () => {
          buttonElement.removeEventListener("mouseenter", buttonEnter);

          buttonElement.removeEventListener("mouseleave", buttonLeave);
        };
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mb-16"
      aria-labelledby="cta-heading">
      <div
        className="cta-border-glow pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-r from-yellow-300/30 via-transparent to-yellow-300/30 blur-sm"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#26154F] to-[#17102F] p-8 sm:p-10 lg:p-12">
        {/* Animated background glow */}
        <div
          className="cta-glow pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-yellow-300/10 blur-3xl"
          aria-hidden="true"
        />

        {/* Decorative gradient */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(250,204,21,0.08),transparent_35%)]"
          aria-hidden="true"
        />

        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="cta-eyebrow mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">
              <Sparkles className="h-4 w-4" aria-hidden="true" />

              <span>The Crown Awaits</span>
            </div>

            <h2
              id="cta-heading"
              className="cta-heading text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Think. Build.
              <br />
              <span className="text-yellow-300">Become the Codepati.</span>
            </h2>

            <p className="cta-description mt-5 max-w-lg text-sm leading-6 text-white/60 sm:text-base">
              Challenge your knowledge, build innovative solutions, and compete
              for the Codepati Crown.
            </p>
          </div>

          <Link
            href="#register"
            className="cta-button group inline-flex w-fit items-center gap-3 rounded-full bg-yellow-300 px-6 py-3.5 text-sm font-bold text-[#17102F] shadow-[0_0_0_rgba(250,204,21,0)] transition-colors duration-300 hover:bg-yellow-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#17102F]"
            aria-label="Register now for Kaun Banega Codepati">
            <span>Register Now</span>

            <ArrowUpRight className="cta-arrow h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
