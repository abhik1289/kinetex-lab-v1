"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Lightbulb,
  Rocket,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: BrainCircuit,
    number: "01",
    title: "Test Your Knowledge",
    description:
      "Challenge yourself with questions covering CS fundamentals, programming, DSA, and core technology concepts.",
  },
  {
    icon: Code2,
    number: "02",
    title: "Build Real Solutions",
    description:
      "Transform ideas into practical solutions and prototypes during the Hack It round.",
  },
  {
    icon: Lightbulb,
    number: "03",
    title: "Present Your Innovation",
    description:
      "Showcase your approach, innovation, feasibility, and implementation through a structured pitch.",
  },
  {
    icon: Trophy,
    number: "04",
    title: "Compete for the Crown",
    description:
      "Progress through the competition and compete for the prestigious Codepati Crown.",
  },
];

const rounds = [
  {
    label: "01",
    title: "Tech Quiz",
    description: "Put your technical knowledge to the test.",
  },
  {
    label: "02",
    title: "Hack It",
    description: "Build a solution to a real-world problem statement.",
  },
  {
    label: "03",
    title: "Pitch It",
    description: "Present your solution with clarity and confidence.",
  },
  {
    label: "04",
    title: "Codepati Crown",
    description: "Compete in the final stage for the crown.",
  },
];

export default function EventIntroduction() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".intro-animate", {
          clearProps: "all",
        });

        return;
      }

      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      introTimeline
        .from(".intro-eyebrow", {
          opacity: 0,
          y: 20,
          duration: 0.6,
        })
        .from(
          ".intro-heading",
          {
            opacity: 0,
            y: 40,
            duration: 0.85,
          },
          "-=0.3",
        )
        .from(
          ".intro-description",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.45",
        )
        .from(
          ".intro-actions",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.35",
        );

      gsap.from(".intro-stat", {
        opacity: 0,
        y: 30,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".intro-stats",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".intro-round", {
        opacity: 0,
        x: -25,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".intro-rounds",
          start: "top 82%",
          once: true,
        },
      });

      gsap.to(".intro-orb", {
        y: -25,
        x: 15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="intro-heading"
      className="relative overflow-hidden bg-[#100B25] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
      {/* Ambient background decoration */}
      <div
        className="intro-orb pointer-events-none absolute -right-40 top-24 h-[32rem] w-[32rem] rounded-full bg-violet-500/10 blur-[130px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-yellow-300/[0.04] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Main introduction */}
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <div className="intro-eyebrow intro-animate mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-300/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
              <Sparkles className="h-4 w-4" aria-hidden="true" />

              <span>Event Introduction</span>
            </div>

            <h2
              id="intro-heading"
              className="intro-heading intro-animate max-w-3xl text-4xl font-black leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              Where Knowledge
              <br />
              Meets
              <span className="text-yellow-300"> Innovation.</span>
            </h2>

            <p className="intro-description intro-animate mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              <span className="font-semibold text-white">
                Kaun Banega Codepati?
              </span>{" "}
              is a multi-stage technical competition organized by Kinetex Lab,
              KIIT Chapter. It brings together technical knowledge, creative
              problem-solving, solution building, and confident presentation.
            </p>

            <p className="intro-description intro-animate mt-4 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
              From testing your fundamentals in the Tech Quiz to building
              solutions and presenting your ideas, every stage challenges you to
              think beyond the ordinary.
            </p>

            <div className="intro-actions intro-animate mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#register"
                className="group inline-flex items-center gap-3 rounded-full bg-yellow-300 px-6 py-3.5 text-sm font-bold text-[#17102F] transition-all duration-300 hover:bg-yellow-200 hover:shadow-[0_0_30px_rgba(250,204,21,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#100B25]">
                Join the Challenge
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="#rounds"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white/75 transition-all duration-300 hover:border-yellow-300/40 hover:text-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300">
                Explore the Rounds
              </Link>
            </div>
          </div>

          {/* Visual information card */}
          <div className="relative">
            <div
              className="intro-animate absolute -inset-5 rounded-[2rem] bg-yellow-300/[0.04] blur-2xl"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#281750] to-[#17102F] p-6 shadow-2xl shadow-black/20 sm:p-8">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-yellow-300/10 blur-3xl" />

              <div className="relative">
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-300/20 bg-yellow-300/10">
                    <Zap
                      className="h-6 w-6 text-yellow-300"
                      aria-hidden="true"
                    />
                  </div>

                  <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                    The Challenge
                  </span>
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
                  Think. Build. Pitch.
                </p>

                <h3 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                  Your journey
                  <br />
                  to the crown.
                </h3>

                <div className="mt-8 space-y-4">
                  {rounds.map((round, index) => (
                    <div key={round.label} className="flex items-start gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xs font-bold text-yellow-300">
                        {round.label}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-white">
                          {round.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-white/45">
                          {round.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/10 pt-5 text-xs text-white/40">
                  Four stages. One ultimate challenge.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event highlights */}
        <div className="intro-stats mt-20 grid grid-cols-2 gap-3 border-y border-white/10 py-8 sm:grid-cols-4 sm:gap-6">
          <div className="intro-stat text-center sm:text-left">
            <p className="text-3xl font-black text-yellow-300">4</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-white/45">
              Competition Stages
            </p>
          </div>

          <div className="intro-stat text-center sm:text-left">
            <p className="text-3xl font-black text-yellow-300">50</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-white/45">
              Teams Qualify
            </p>
          </div>

          <div className="intro-stat text-center sm:text-left">
            <p className="text-3xl font-black text-yellow-300">3</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-white/45">
              Finalist Teams
            </p>
          </div>

          <div className="intro-stat text-center sm:text-left">
            <p className="text-3xl font-black text-yellow-300">2</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-white/45">
              Event Days
            </p>
          </div>
        </div>

        {/* Why participate */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="intro-animate text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
              Why Participate?
            </p>

            <h3 className="intro-animate mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              More Than a Competition.
              <br />
              <span className="text-white/45">It's a Chance to Grow.</span>
            </h3>

            <p className="intro-animate mt-5 text-sm leading-7 text-white/50 sm:text-base">
              Put your skills into action, collaborate with your team, and
              experience the journey from problem-solving to presenting an idea.
            </p>
          </div>

          <div className="intro-highlights mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((highlight) => {
              const Icon = highlight.icon;

              return (
                <article
                  key={highlight.number}
                  className="intro-highlight group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300/25 hover:bg-white/[0.05]">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-300/15 bg-yellow-300/10">
                      <Icon
                        className="h-5 w-5 text-yellow-300"
                        aria-hidden="true"
                      />
                    </div>

                    <span className="text-xs font-bold text-white/20">
                      {highlight.number}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white">
                    {highlight.title}
                  </h4>

                  <p className="mt-3 text-sm leading-6 text-white/45">
                    {highlight.description}
                  </p>

                  <div
                    className="absolute bottom-0 left-0 h-px w-0 bg-yellow-300 transition-all duration-500 group-hover:w-full"
                    aria-hidden="true"
                  />
                </article>
              );
            })}
          </div>
        </div>

        {/* Closing statement */}
        <div className="intro-rounds mt-20 rounded-3xl border border-yellow-300/15 bg-gradient-to-r from-[#26154F] to-[#1A1237] p-7 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-yellow-300">
                <Rocket className="h-4 w-4" aria-hidden="true" />

                <span className="text-xs font-bold uppercase tracking-[0.15em]">
                  Ready to Begin?
                </span>
              </div>

              <h3 className="text-2xl font-black sm:text-3xl">
                Bring your ideas.
                <br />
                <span className="text-yellow-300">Make your mark.</span>
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/50">
                Step into the challenge and discover what you can create with
                your team.
              </p>
            </div>

            <Link
              href="#register"
              className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-yellow-300 px-6 py-3.5 text-sm font-bold text-[#17102F] transition-all duration-300 hover:bg-yellow-200 hover:shadow-[0_0_30px_rgba(250,204,21,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#1A1237]">
              Register Now
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
