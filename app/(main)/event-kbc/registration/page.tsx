"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Code2,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";

function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-violet-600/20 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <Code2 className="h-5 w-5 text-cyan-400" />
          </div>

          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-white">
              KINETEX
            </p>
            <p className="text-[10px] tracking-[0.3em] text-white/40">
              LAB · KIIT
            </p>
          </div>
        </Link>

        <Link
          href="/"
          className="text-sm text-white/60 transition hover:text-white">
          Back to Home
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] max-w-5xl items-center justify-center px-6 py-16 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex w-full flex-col items-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Registration Portal
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
            The Game Is
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              About to Begin.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-7 max-w-xl text-base leading-8 text-white/55 sm:text-lg">
            Think you have what it takes to become the next Codepati? Prepare
            yourself for a journey of quizzes, coding challenges, and
            innovation.
          </p>

          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative mt-12 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 shadow-2xl shadow-violet-950/20 backdrop-blur-xl sm:p-10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
              <Sparkles className="h-7 w-7 text-violet-300" />
            </div>

            <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
              Registration Opens Soon
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/50 sm:text-base">
              We are getting everything ready for you. Stay tuned for the
              official registration announcement.
            </p>

            {/* Status */}
            <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-white/5 bg-black/20 px-4 py-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium text-white/80">
                The arena is being prepared
              </span>
            </div>

            {/* Event Details */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/5 bg-white/[0.025] p-4">
                <Trophy className="mx-auto h-5 w-5 text-amber-300" />
                <p className="mt-2 text-xs text-white/40">Event</p>
                <p className="mt-1 text-sm font-semibold">Codepati</p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.025] p-4">
                <Users className="mx-auto h-5 w-5 text-cyan-300" />
                <p className="mt-2 text-xs text-white/40">Community</p>
                <p className="mt-1 text-sm font-semibold">Kinetex Lab</p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.025] p-4">
                <CalendarDays className="mx-auto h-5 w-5 text-violet-300" />
                <p className="mt-2 text-xs text-white/40">Status</p>
                <p className="mt-1 text-sm font-semibold">Coming Soon</p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition hover:bg-cyan-300">
              Explore the Event
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#event-details"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-7 py-3.5 text-sm font-medium text-white/70 transition hover:border-white/30 hover:text-white">
              Learn More
            </a>
          </div>

          {/* Bottom Note */}
          <p className="mt-12 text-xs tracking-wide text-white/25">
            Built with passion by Kinetex Lab · KIIT
          </p>
        </motion.div>
      </section>

      {/* Event Details */}
      <section
        id="event-details"
        className="relative z-10 mx-auto max-w-5xl px-6 pb-24 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Trophy,
              title: "Quiz",
              description: "Test your knowledge.",
            },
            {
              icon: Code2,
              title: "Hack",
              description: "Build something innovative.",
            },
            {
              icon: Sparkles,
              title: "Pitch & Crown",
              description: "Present your ideas and shine.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 text-center">
                <Icon className="mx-auto h-6 w-6 text-cyan-300" />
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/45">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Page;
