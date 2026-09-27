"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  FileText,
  Lightbulb,
  Pause,
  Play,
} from "lucide-react";
import { SiNotion } from "react-icons/si";

const autoAdvanceDelay = 6000;

const workspacePages = [
  {
    label: "The brief",
    icon: FileText,
    round: "Round 01 / Tech Quiz",
    title: "The challenge brief",
    description:
      "Get aligned on the question, then make every idea earn its place.",
    blocks: [
      {
        label: "01 / Objective",
        title: "Find the signal",
        note: "What matters most?",
      },
      {
        label: "02 / Explore",
        title: "Ask better questions",
        note: "Challenge assumptions",
      },
      {
        label: "03 / Align",
        title: "Choose a direction",
        note: "One team, one focus",
      },
    ],
    takeaway: "START WITH CURIOSITY / AGREE ON THE PROBLEM / THEN MOVE",
  },
  {
    label: "Build log",
    icon: Check,
    round: "Round 02 / Hack It",
    title: "The Build Room",
    description:
      "Keep decisions, experiments, and next steps together as the idea takes shape.",
    blocks: [
      {
        label: "DECISION 01",
        title: "Map the user flow",
        note: "Make the first step clear",
      },
      {
        label: "IN PROGRESS",
        title: "Test the core idea",
        note: "Build only what proves it",
      },
      {
        label: "NEXT UP",
        title: "Review the edges",
        note: "Capture what needs work",
      },
    ],
    takeaway:
      "MAKE THE THINKING VISIBLE / KEEP THE TEAM IN SYNC / KEEP BUILDING",
  },
  {
    label: "Pitch notes",
    icon: Lightbulb,
    round: "Round 03 / Pitch It",
    title: "Make the idea land",
    description:
      "Shape a clear story around the problem, your solution, and why it matters.",
    blocks: [
      {
        label: "01 / OPEN",
        title: "Name the problem",
        note: "Start with a human need",
      },
      {
        label: "02 / SHOW",
        title: "Walk through the idea",
        note: "Let the prototype speak",
      },
      {
        label: "03 / CLOSE",
        title: "Make the case",
        note: "End with the impact",
      },
    ],
    takeaway: "LEAD WITH THE WHY / SHOW THE HOW / LEAVE A CLEAR TAKEAWAY",
  },
];

export default function KbcSponsor() {
  const [activePageIndex, setActivePageIndex] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const activePage = workspacePages[activePageIndex];

  useEffect(() => {
    if (
      !isAutoPlaying ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActivePageIndex(
        (currentIndex) => (currentIndex + 1) % workspacePages.length,
      );
    }, autoAdvanceDelay);

    return () => window.clearTimeout(timeoutId);
  }, [activePageIndex, isAutoPlaying]);

  return (
    <section
      id="sponsor"
      aria-labelledby="sponsor-heading"
      className="relative isolate overflow-hidden bg-[#0B081A] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 -z-10 h-136 w-136 -translate-y-1/2 rounded-full bg-violet-500/12 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-yellow-300/6 blur-[120px]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/4 py-2 pl-2 pr-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#100B25]">
              <SiNotion className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">
              Official Event Sponsor
            </span>
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-yellow-300">
            Notion × Codepati Arena
          </p>
          <h2
            id="sponsor-heading"
            className="mt-4 max-w-xl text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
            Big ideas deserve
            <br />
            <span className="text-yellow-300">a place to take shape.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/60">
            Notion backs the curious minds behind Codepati Arena. From the first
            question to the final pitch, great work starts when teams can bring
            their thinking together.
          </p>
          <a
            href="https://www.notion.so/"
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0B081A]">
            Meet Notion
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-2xl">
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-[2rem] bg-yellow-300/6 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#17102F] shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#100B25]">
                  <SiNotion className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">CODEPATI ARENA</p>
                  <p className="mt-0.5 text-[10px] text-white/40">
                    Team workspace
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-white/10 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">
                  Preview {String(activePageIndex + 1).padStart(2, "0")} / 03
                </span>
                <button
                  type="button"
                  aria-label={
                    isAutoPlaying
                      ? "Pause automatic preview"
                      : "Resume automatic preview"
                  }
                  aria-pressed={isAutoPlaying}
                  title={
                    isAutoPlaying
                      ? "Pause automatic preview"
                      : "Resume automatic preview"
                  }
                  onClick={() => setIsAutoPlaying((isPlaying) => !isPlaying)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/50 transition-colors hover:border-yellow-300/30 hover:text-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300">
                  {isAutoPlaying ? (
                    <Pause className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Play className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="grid min-h-82.5 sm:grid-cols-[145px_1fr]">
              <nav
                aria-label="Workspace preview pages"
                className="border-b border-white/10 bg-black/10 p-3 sm:border-b-0 sm:border-r sm:p-4">
                <p className="hidden px-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/30 sm:block">
                  Your pages
                </p>
                <ul className="flex gap-1 overflow-x-auto sm:mt-4 sm:block sm:space-y-1">
                  {workspacePages.map(({ label, icon: Icon }, index) => (
                    <li key={label} className="shrink-0">
                      <button
                        type="button"
                        aria-pressed={activePageIndex === index}
                        onClick={() => setActivePageIndex(index)}
                        className={`flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 sm:w-full sm:px-2 sm:text-[11px] ${
                          activePageIndex === index
                            ? "bg-white/10 text-white"
                            : "text-white/45 hover:bg-white/5 hover:text-white/80"
                        }`}>
                        <Icon
                          className="h-3.5 w-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-5 sm:p-7">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                  <span>{activePage.round.split(" / ")[0]}</span>
                  <span className="text-yellow-300/70">/</span>
                  <span className="text-yellow-300">
                    {activePage.round.split(" / ")[1]}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-black tracking-tight sm:text-3xl">
                  {activePage.title}
                  <span className="text-yellow-300">.</span>
                </h3>
                <p className="mt-2 max-w-sm text-xs leading-6 text-white/45">
                  {activePage.description}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {activePage.blocks.map((item) => (
                    <div
                      key={item.label}
                      className="min-h-28 rounded-xl border border-white/10 bg-white/[0.035] p-3 sm:min-h-32">
                      <span className="text-[10px] font-bold text-yellow-300">
                        {item.label}
                      </span>
                      <p className="mt-3 text-sm font-bold leading-5 text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[10px] leading-4 text-white/40">
                        {item.note}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-[10px] font-semibold text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-300" />
                  {activePage.takeaway}
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
            A shared space for the work behind the big idea
          </p>
        </div>
      </div>
    </section>
  );
}
