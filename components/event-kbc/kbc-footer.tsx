"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  //   Instagram,
  //   Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Trophy,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

import { useLayoutEffect, useRef } from "react";
// import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -35,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const footerViewport = {
  once: true,
  amount: 0.2,
};
const footerLinks = {
  event: [
    { label: "About Event", href: "#about" },
    { label: "Competition Rounds", href: "#rounds" },
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

export default function EventFooter() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect(() => {
  //     const section = sectionRef.current;

  //     if (!section) return;

  //     const reduceMotion = window.matchMedia(
  //         "(prefers-reduced-motion: reduce)",
  //     ).matches;

  //     const ctx = gsap.context(() => {
  //         const eyebrow = section.querySelector(".cta-eyebrow");
  //         const heading = section.querySelector(".cta-heading");
  //         const description = section.querySelector(".cta-description");
  //         const button = section.querySelector(".cta-button");
  //         const glow = section.querySelector(".cta-glow");
  //         const borderGlow = section.querySelector(".cta-border-glow");
  //     }
  // })
  // Respect the user's accessibility preference.
  // if (reduceMotion) {
  //     gsap.set(
  //         [
  //             eyebrow,
  //             heading,
  //             description,
  //             button,
  //             glow,
  //             borderGlow,
  //         ],
  //         {
  //             clearProps: "all",
  //         },
  //     );

  //     return;
  // }

  // Initial state.
  //         gsap.set(
  //             [eyebrow, heading, description, button],
  //             {
  //                 opacity: 0,
  //                 y: 28,
  //             },
  //         );

  //         gsap.set(glow, {
  //             opacity: 0,
  //             scale: 0.6,
  //             transformOrigin: "center center",
  //         });

  //         gsap.set(borderGlow, {
  //             opacity: 0,
  //         });

  //         // Main entrance timeline.
  //         const entranceTimeline = gsap.timeline({
  //             scrollTrigger: {
  //                 trigger: section,
  //                 start: "top 82%",
  //                 once: true,
  //                 invalidateOnRefresh: true,
  //             },
  //             defaults: {
  //                 ease: "power3.out",
  //             },
  //         });

  //         entranceTimeline
  //             .to(eyebrow, {
  //                 opacity: 1,
  //                 y: 0,
  //                 duration: 0.65,
  //             })
  //             .to(
  //                 heading,
  //                 {
  //                     opacity: 1,
  //                     y: 0,
  //                     duration: 0.85,
  //                 },
  //                 "-=0.38",
  //             )
  //             .to(
  //                 description,
  //                 {
  //                     opacity: 1,
  //                     y: 0,
  //                     duration: 0.7,
  //                 },
  //                 "-=0.48",
  //             )
  //             .to(
  //                 button,
  //                 {
  //                     opacity: 1,
  //                     y: 0,
  //                     duration: 0.75,
  //                     ease: "back.out(1.4)",
  //                 },
  //                 "-=0.35",
  //             )
  //             .to(
  //                 glow,
  //                 {
  //                     opacity: 1,
  //                     scale: 1,
  //                     duration: 1.4,
  //                     ease: "power2.out",
  //                 },
  //                 0,
  //             )
  //             .to(
  //                 borderGlow,
  //                 {
  //                     opacity: 1,
  //                     duration: 1.2,
  //                     ease: "power2.out",
  //                 },
  //                 0.2,
  //             );

  //         // Subtle continuous glow movement.
  //         gsap.to(glow, {
  //             x: -35,
  //             y: 25,
  //             scale: 1.15,
  //             duration: 5,
  //             repeat: -1,
  //             yoyo: true,
  //             ease: "sine.inOut",
  //         });

  //         // Very subtle border illumination.
  //         gsap.to(borderGlow, {
  //             opacity: 0.35,
  //             duration: 2.8,
  //             repeat: -1,
  //             yoyo: true,
  //             ease: "sine.inOut",
  //         });

  //         // Button hover animation.
  //         const buttonElement = button as HTMLElement | null;

  //         if (buttonElement) {
  //             const buttonArrow = buttonElement.querySelector(
  //                 ".cta-arrow",
  //             );

  //             const buttonEnter = () => {
  //                 gsap.to(buttonElement, {
  //                     y: -4,
  //                     scale: 1.025,
  //                     duration: 0.3,
  //                     ease: "power2.out",
  //                     overwrite: "auto",
  //                 });

  //                 gsap.to(buttonArrow, {
  //                     x: 4,
  //                     y: -4,
  //                     duration: 0.3,
  //                     ease: "power2.out",
  //                     overwrite: "auto",
  //                 });
  //             };

  //             const buttonLeave = () => {
  //                 gsap.to(buttonElement, {
  //                     y: 0,
  //                     scale: 1,
  //                     duration: 0.35,
  //                     ease: "power3.out",
  //                     overwrite: "auto",
  //                 });

  //                 gsap.to(buttonArrow, {
  //                     x: 0,
  //                     y: 0,
  //                     duration: 0.35,
  //                     ease: "power3.out",
  //                     overwrite: "auto",
  //                 });
  //             };

  //             buttonElement.addEventListener(
  //                 "mouseenter",
  //                 buttonEnter,
  //             );

  //             buttonElement.addEventListener(
  //                 "mouseleave",
  //                 buttonLeave,
  //             );

  //             // Clean up native event listeners.
  //             return () => {
  //                 buttonElement.removeEventListener(
  //                     "mouseenter",
  //                     buttonEnter,
  //                 );

  //                 buttonElement.removeEventListener(
  //                     "mouseleave",
  //                     buttonLeave,
  //                 );
  //             };
  //         }
  //     }, section);

  //     return () => ctx.revert();
  // }, []);

  return <footer></footer>;
}
