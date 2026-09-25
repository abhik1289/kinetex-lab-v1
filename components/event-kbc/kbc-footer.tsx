"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram } from "react-icons/fa";
import {
  ArrowUpRight,
  ExternalLink,
  //   Instagram,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Trophy,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  event: [
    { label: "About Event", href: "#about" },
    { label: "Competition Journey", href: "#rounds" },
    { label: "FAQs", href: "#faqs" },
    { label: "Register Now", href: "#register" },
  ],
  rounds: [
    { label: "Tech Quiz", href: "#tech-quiz" },
    { label: "Hack It", href: "#hack-it" },
    { label: "Pitch It", href: "#pitch-it" },
    { label: "Codepati Crown", href: "#final" },
  ],
};

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "kinetexlab.cse@kiit.ac.in",
    href: "mailto:kinetexlab.cse@kiit.ac.in",
  },
  {
    icon: Phone,
    label: "Arijit",
    value: "+91 81318 36322",
    href: "tel:+918131836322",
  },
  {
    icon: Phone,
    label: "Pratyush",
    value: "+91 98005 52388",
    href: "tel:+919800552388",
  },
];

export default function EventFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".footer-animate", {
          clearProps: "all",
        });

        return;
      }

      gsap.from(".footer-cta", {
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-cta",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".footer-column", {
        opacity: 0,
        y: 25,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-columns",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".footer-bottom", {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-bottom",
          start: "top 95%",
          once: true,
        },
      });

      gsap.to(".footer-glow", {
        x: -25,
        y: 20,
        scale: 1.12,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, footer);

    return () => context.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#0B081A] px-5 pt-20 text-white sm:px-8 lg:px-12 lg:pt-28">
      {/* Ambient glow */}
      <div
        className="footer-glow pointer-events-none absolute -right-40 top-0 h-[28rem] w-[28rem] rounded-full bg-violet-500/10 blur-[130px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-yellow-300/[0.04] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* CTA banner */}
        <div className="footer-cta footer-animate relative mb-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#26154F] to-[#17102F] p-8 sm:p-10 lg:p-12">
          <div
            className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-yellow-300/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
                <Sparkles className="h-4 w-4" aria-hidden="true" />

                <span>The Crown Awaits</span>
              </div>

              <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Think. Build.
                <br />
                <span className="text-yellow-300">Become the Codepati.</span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/55 sm:text-base">
                Challenge your knowledge, build innovative solutions, and
                compete for the Codepati Crown.
              </p>
            </div>

            <Link
              href="/event-kbc/registration"
              className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-yellow-300 px-6 py-3.5 text-sm font-bold text-[#17102F] transition-all duration-300 hover:bg-yellow-200 hover:shadow-[0_0_30px_rgba(250,204,21,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#17102F]">
              Register Now
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Footer columns */}
        <div className="footer-columns grid gap-12 border-b border-white/10 pb-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.35fr] lg:gap-10">
          {/* Brand */}
          <div className="footer-column footer-animate">
            <Link
              href="#top"
              className="group inline-flex items-center gap-3"
              aria-label="Back to the top">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-yellow-300/20 bg-yellow-300/10">
                <Trophy
                  className="h-5 w-5 text-yellow-300"
                  aria-hidden="true"
                />
              </span>

              <span className="text-xl font-black tracking-tight">
                Kinetex
                <span className="text-yellow-300"> Lab.</span>
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-white/45">
              A student-led technology and research community at KIIT, creating
              opportunities to learn, build, and innovate.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-white/35">
              <span className="h-px w-8 bg-yellow-300/40" />
              <span>KIIT Chapter</span>
            </div>

            {/* Social links */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="https://www.instagram.com/kinetex_lab/"
                target="_blank"
                rel="noreferrer"
                aria-label="Kinetex Lab on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition-all duration-300 hover:border-yellow-300/40 hover:bg-yellow-300 hover:text-[#17102F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300">
                <FaInstagram />
              </a>

              <a
                href="https://www.kinetexlab.in"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Kinetex Lab website"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition-all duration-300 hover:border-yellow-300/40 hover:bg-yellow-300 hover:text-[#17102F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Event navigation */}
          <div className="footer-column footer-animate">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">
              Explore
            </h3>

            <ul className="mt-6 space-y-4">
              {footerLinks.event.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300">
                    <span>{link.label}</span>

                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Competition rounds */}
          <div className="footer-column footer-animate">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">
              Journey
            </h3>

            <ul className="mt-6 space-y-4">
              {footerLinks.rounds.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300">
                    <span>{link.label}</span>

                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details */}
          <div className="footer-column footer-animate">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">
              Get in Touch
            </h3>

            <div className="mt-6 space-y-5">
              {contactDetails.map((contact) => {
                const Icon = contact.icon;

                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="group flex items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300">
                    <Icon
                      className="mt-0.5 h-4 w-4 shrink-0 text-yellow-300/70"
                      aria-hidden="true"
                    />

                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30">
                        {contact.label}
                      </span>

                      <span className="mt-1 block break-words text-sm leading-6 text-white/55 transition-colors duration-300 group-hover:text-yellow-300">
                        {contact.value}
                      </span>
                    </span>
                  </a>
                );
              })}

              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-yellow-300/70"
                  aria-hidden="true"
                />

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30">
                    Location
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/55">
                    KIIT Road, Patia,
                    <br />
                    Bhubaneswar, Odisha
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom footer-animate flex flex-col gap-5 py-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Kinetex Lab, KIIT Chapter. All rights
            reserved.
          </p>

          <div className="flex items-center gap-2">
            <span>Built with</span>

            <span className="font-semibold text-yellow-300">
              curiosity & code
            </span>

            <span aria-hidden="true">✦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
