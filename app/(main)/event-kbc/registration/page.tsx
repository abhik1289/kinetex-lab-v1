"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Sparkles,
  Trophy,
} from "lucide-react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOpen: boolean;
};

const getNextSundayMidnight = () => {
  const now = new Date();
  const target = new Date(now);

  const currentDay = now.getDay();
  const daysUntilSunday = (7 - currentDay) % 7;

  target.setDate(now.getDate() + daysUntilSunday);
  target.setHours(0, 0, 0, 0);

  // If it is already Sunday midnight or later,
  // target the following Sunday.
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 7);
  }

  return target.getTime();
};

const getTimeLeft = (targetTime: number): TimeLeft => {
  const difference = Math.max(0, targetTime - Date.now());

  const totalSeconds = Math.floor(difference / 1000);

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isOpen: difference <= 0,
  };
};

const formatNumber = (value: number) => {
  return String(value).padStart(2, "0");
};

const timeUnits = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

function TimeCard({
  value,
  label,
  highlight = false,
}: {
  value: number;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl border p-4 text-center backdrop-blur-xl transition-all duration-300 sm:p-5",
        highlight
          ? "border-yellow-300/30 bg-yellow-300/[0.09] shadow-[0_0_35px_rgba(250,204,21,0.08)]"
          : "border-white/10 bg-white/[0.045] hover:border-yellow-300/20",
      ].join(" ")}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div
        className={[
          "text-3xl font-black tracking-[-0.06em] tabular-nums sm:text-4xl md:text-5xl",
          highlight ? "text-yellow-300" : "text-white",
        ].join(" ")}>
        {formatNumber(value)}
      </div>

      <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 sm:text-[10px]">
        {label}
      </div>
    </div>
  );
}

export default function CodepatiCountdown() {
  const targetTime = useMemo(() => getNextSundayMidnight(), []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(targetTime),
  );

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(getTimeLeft(targetTime));
    };

    updateTimer();

    const interval = window.setInterval(updateTimer, 1000);

    return () => window.clearInterval(interval);
  }, [targetTime]);

  return (
    <section
      id="countdown"
      className="relative isolate overflow-hidden bg-[#100B25] px-6 py-24 text-white sm:px-10 lg:px-16">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300/[0.06] blur-[130px]" />

        <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(250,204,21,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.4)_1px,transparent_1px)] [background-size:70px_70px]" />

        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-violet-600/20 blur-[120px]" />

        <div className="absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-yellow-300/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-300/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-300">
            <Sparkles className="h-3.5 w-3.5" />
            The countdown begins
          </div>

          <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.075em] sm:text-5xl md:text-6xl original-surfer-regular">
            <span className="block text-white">Kon Banega</span>
            <span className="mt-2 block text-yellow-300">Codepati</span>
          </h2>

          <p className="mx-auto mt-7 max-w-lg text-[10px] font-bold uppercase tracking-[0.32em] text-white/55 sm:text-xs">
            Think · Build · Pitch · Win
          </p>
        </div>

        {/* Countdown Panel */}
        <div className="relative mt-12 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8 md:p-10">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent" />

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-300/20 bg-yellow-300/[0.08]">
                <Trophy className="h-5 w-5 text-yellow-300" />
              </span>

              <div>
                <p className="text-xs font-bold text-white">Codepati Arena</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Kinetex Lab · KIIT Chapter
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
              <Clock3 className="h-3.5 w-3.5 text-yellow-300" />
              {timeLeft.isOpen ? "Live" : "Opening Sunday"}
            </div>
          </div>

          {timeLeft.isOpen ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-yellow-300" />

              <h3 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                The Arena Is Open<span className="text-yellow-300">.</span>
              </h3>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/50">
                The countdown has ended. Your Codepati journey starts now.
              </p>

              <Link
                href="#register"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-yellow-300 px-6 py-3.5 text-sm font-black text-[#100B25] transition-colors hover:bg-yellow-200">
                Register Now
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 timer_container">
                {timeUnits.map((unit) => (
                  <TimeCard
                    key={unit.key}
                    label={unit.label}
                    value={timeLeft[unit.key]}
                    highlight={unit.key === "seconds"}
                  />
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                <CalendarDays className="h-3.5 w-3.5 text-yellow-300" />
                <span>Sunday · 12:00 AM</span>
              </div>
            </>
          )}

          {/* Bottom Accent */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-white/10" />
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-300 shadow-[0_0_15px_#facc15]" />
            <span className="h-px w-12 bg-white/10" />
          </div>
        </div>

        {/* Event Details */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center text-xs text-white/40">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-yellow-300/70" />
            2nd & 3rd October 2026
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

          <span className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-300/70" />
            Quiz · Hack · Pitch · Crown
          </span>
        </div>
      </div>
    </section>
  );
}
