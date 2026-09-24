"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BrainCircuit,
  Check,
  Code2,
  Lightbulb,
  Trophy,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  {
    id: "01",
    shortTitle: "Quiz",
    title: "Tech Quiz",
    icon: BrainCircuit,
    description:
      "Put your technical knowledge to the test with questions covering CS fundamentals, DSA, programming, core computer science, and technology.",
    highlight: "Top 50 teams qualify",
    points: [
      "CS fundamentals",
      "Data structures and algorithms",
      "Programming and technology",
    ],
  },
  {
    id: "02",
    shortTitle: "Hack",
    title: "Hack It",
    icon: Code2,
    description:
      "Turn your ideas into a working solution. Shortlisted teams receive a problem statement and limited time to develop a solution or prototype.",
    highlight: "Build under constraints",
    points: [
      "Understand the problem",
      "Develop a solution or prototype",
      "Demonstrate technical execution",
    ],
  },
  {
    id: "03",
    shortTitle: "Pitch",
    title: "Pitch It",
    icon: Lightbulb,
    description:
      "Present your solution in a Shark Tank-style pitch. Communicate your approach and demonstrate why your idea deserves attention.",
    highlight: "Make your idea stand out",
    points: [
      "Innovation and approach",
      "Feasibility",
      "Prototype and presentation",
    ],
  },
  {
    id: "04",
    shortTitle: "Crown",
    title: "Codepati Crown",
    icon: Trophy,
    description:
      "The final stage of the competition. The top three teams advance to compete for the Codepati Crown.",
    highlight: "Top 3 teams advance",
    points: [
      "Compete in the final stage",
      "Showcase your overall journey",
      "Compete for the Codepati Crown",
    ],
  },
];

export default function CompetitionJourney() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".journey-animate", {
          clearProps: "all",
        });

        return;
      }

      gsap.from(".journey-heading", {
        y: 35,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".journey-step", {
        y: 40,
        duration: 0.75,
        stagger: 0.13,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".journey-grid",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".journey-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.3,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".journey-grid",
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".journey-bottom-cta", {
        y: 25,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".journey-bottom-cta",
          start: "top 88%",
          once: true,
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="rounds"
      aria-labelledby="journey-heading"
      className="relative overflow-hidden bg-[#100B25] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
      {/* Ambient background elements */}
      <div
        className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-violet-500/10 blur-[130px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-yellow-300/[0.05] blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="journey-heading journey-animate mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-yellow-300">
            The Competition Journey
          </p>

          <h2
            id="journey-heading"
            className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Four Stages.
            <br />
            <span className="text-yellow-300">One Ultimate Challenge.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
            Every stage takes you one step closer to the Codepati Crown. Test
            your knowledge, build your solution, pitch your innovation, and
            compete in the final stage.
          </p>
        </div>

        {/* Journey route */}
        <div className="journey-grid relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line for desktop */}
          <div
            className="journey-line absolute left-[12%] right-[12%] top-[3.25rem] hidden h-px bg-gradient-to-r from-yellow-300/10 via-yellow-300/60 to-yellow-300/10 lg:block"
            aria-hidden="true"
          />

          {journeySteps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.id}
                className="journey-step journey-animate group relative rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-yellow-300/30 hover:bg-white/[0.055] sm:p-7">
                {/* Step marker */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-300/20 bg-[#21143F] text-yellow-300 transition-all duration-500 group-hover:border-yellow-300/50 group-hover:bg-yellow-300 group-hover:text-[#17102F]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <span className="text-4xl font-black text-white/[0.08] transition-colors duration-300 group-hover:text-yellow-300/20">
                    {step.id}
                  </span>
                </div>

                {/* Step content */}
                <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">
                    Stage {step.id}
                  </p>

                  <h3 className="mt-3 text-2xl font-black tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-4 min-h-[7.5rem] text-sm leading-6 text-white/50">
                    {step.description}
                  </p>

                  <div className="mt-6 rounded-xl border border-yellow-300/10 bg-yellow-300/[0.05] px-3 py-3 text-xs font-semibold leading-5 text-yellow-200">
                    {step.highlight}
                  </div>

                  <ul className="mt-6 space-y-3">
                    {step.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-xs leading-5 text-white/45">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-300"
                          aria-hidden="true"
                        />

                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom hover accent */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-px origin-left scale-x-0 bg-yellow-300 transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* Journey summary */}
        <div className="journey-bottom-cta journey-animate mt-14 overflow-hidden rounded-3xl border border-yellow-300/15 bg-gradient-to-r from-[#26154F] to-[#1A1237] p-7 sm:p-10">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
                Your Next Move
              </p>

              <h3 className="mt-3 text-2xl font-black sm:text-3xl">
                From the first question
                <br />
                <span className="text-yellow-300">to the final crown.</span>
              </h3>

              <p className="mt-4 text-sm leading-6 text-white/50">
                Are you ready to take on the challenge? Start your journey with
                Kinetex Lab.
              </p>
            </div>

            <Link
              href="#register"
              className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-yellow-300 px-6 py-3.5 text-sm font-bold text-[#17102F] transition-all duration-300 hover:bg-yellow-200 hover:shadow-[0_0_30px_rgba(250,204,21,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#1A1237]">
              Start Your Journey
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
