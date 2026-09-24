"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronDown, CircleHelp, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type FAQItem = {
  question: string;
  answer: string;
  category: "Eligibility" | "Registration" | "Rounds" | "Logistics";
};

const faqs: FAQItem[] = [
  {
    category: "Eligibility",
    question: "Who can participate in Kaun Banega Codepati?",
    answer:
      "The event is organized by Kinetex Lab, KIIT Chapter. Please refer to the official registration announcement for the confirmed eligibility requirements and participation guidelines.",
  },
  {
    category: "Registration",
    question: "How can I register for the event?",
    answer:
      "Registration details, the registration link, and participation instructions will be shared through the official Kinetex Lab communication channels. Follow the event announcements for the latest information.",
  },
  {
    category: "Registration",
    question: "Is registration required to participate?",
    answer:
      "Participants should complete the official registration process before taking part in the competition. Check the official event announcement for registration deadlines and any applicable requirements.",
  },
  {
    category: "Rounds",
    question: "What are the different rounds of the competition?",
    answer:
      "The competition consists of four stages: Tech Quiz, Hack It, Pitch It, and the Codepati Crown final. Each stage evaluates a different combination of technical knowledge, problem-solving, development, and presentation skills.",
  },
  {
    category: "Rounds",
    question: "What is the Tech Quiz round about?",
    answer:
      "The Tech Quiz covers CS fundamentals, data structures and algorithms, programming, core computer science, and technology-related topics. The top 50 teams qualify for the next stage.",
  },
  {
    category: "Rounds",
    question: "What happens during the Hack It round?",
    answer:
      "Shortlisted teams receive a problem statement and a limited amount of time to develop a solution or prototype. This round focuses on problem-solving, implementation, and technical execution.",
  },
  {
    category: "Rounds",
    question: "What is the Pitch It round?",
    answer:
      "In the Pitch It round, teams present their solution in a Shark Tank-style format. Evaluation includes innovation, approach, feasibility, prototype or implementation, and presentation quality.",
  },
  {
    category: "Rounds",
    question: "How are teams selected for the final round?",
    answer:
      "The top-performing teams progress through the competition, with the top three teams advancing to the final Codepati Crown round.",
  },
  {
    category: "Logistics",
    question: "When will the event take place?",
    answer:
      "Kaun Banega Codepati is scheduled for 2nd and 3rd October 2026. Participants should follow official announcements for the detailed schedule and round-wise timings.",
  },
  {
    category: "Logistics",
    question: "Where is the event organized?",
    answer:
      "The event is organized by Kinetex Lab, KIIT Chapter, at Kalinga Institute of Industrial Technology, KIIT Road, Patia, Bhubaneswar, Odisha.",
  },
];

const categories = [
  "All",
  "Eligibility",
  "Registration",
  "Rounds",
  "Logistics",
] as const;

export default function EventFaq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".faq-animate", {
          clearProps: "all",
        });

        return;
      }

      gsap.from(".faq-heading", {
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".faq-category", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-category-wrapper",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".faq-item", {
        opacity: 0,
        y: 25,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-list",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".faq-contact-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-contact-card",
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
      id="faqs"
      className="relative overflow-hidden bg-[#100B25] px-5 py-24 text-white sm:px-8 lg:px-12"
      aria-labelledby="faq-heading">
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-yellow-300/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="faq-heading faq-animate mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-300/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
            <CircleHelp className="h-4 w-4" aria-hidden="true" />

            <span>Need to Know</span>
          </div>

          <h2
            id="faq-heading"
            className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Questions?
            <br />
            <span className="text-yellow-300">We've Got Answers.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
            Everything you need to know about eligibility, registration,
            competition rounds, and event logistics.
          </p>
        </div>

        {/* Category filters */}
        <div className="faq-category-wrapper mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(null);
                }}
                className={`faq-category rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 ${
                  isActive
                    ? "border-yellow-300 bg-yellow-300 text-[#17102F]"
                    : "border-white/10 bg-white/[0.03] text-white/60 hover:border-yellow-300/40 hover:text-yellow-200"
                }`}
                aria-pressed={isActive}>
                {category}
              </button>
            );
          })}
        </div>

        {/* FAQ list */}
        <div className="faq-list mx-auto mt-10 max-w-4xl space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={`${activeCategory}-${faq.question}`}
                className="faq-item overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition-colors duration-300 hover:border-white/20">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7 sm:py-6"
                  aria-expanded={isOpen}>
                  <span className="text-sm font-semibold leading-6 text-white sm:text-base">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 border-yellow-300/40 bg-yellow-300 text-[#17102F]"
                        : "bg-white/[0.04] text-white/50"
                    }`}>
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}>
                  <div className="overflow-hidden">
                    <div className="border-t border-white/10 px-5 pb-6 pt-5 sm:px-7">
                      <p className="text-sm leading-7 text-white/55">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact card */}
        <div className="faq-contact-card mx-auto mt-14 max-w-4xl rounded-3xl border border-yellow-300/15 bg-gradient-to-r from-[#26154F] to-[#1A1237] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-yellow-300">
                <Sparkles className="h-4 w-4" aria-hidden="true" />

                <span className="text-xs font-bold uppercase tracking-[0.15em]">
                  Still Curious?
                </span>
              </div>

              <h3 className="text-xl font-bold sm:text-2xl">
                Have more questions?
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Reach out to the Kinetex Lab team for event-related queries.
              </p>
            </div>

            <Link
              href="mailto:kinetexlab.cse@kiit.ac.in"
              className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-yellow-300/30 px-5 py-3 text-sm font-semibold text-yellow-300 transition-all duration-300 hover:bg-yellow-300 hover:text-[#17102F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#1A1237]">
              Contact Us
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
