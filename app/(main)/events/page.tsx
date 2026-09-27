"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Trophy,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function EventsPage() {
  const [loading, setLoading] = useState(false);

  const handleNotify = () => {
    console.log("Get notified clicked");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Scrolling Text */}
        <div className="mb-4 overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-scroll text-gray-500 text-sm sm:text-lg">
            <span className="inline-block mx-4 sm:mx-8">
              Kinetex • Kinetex • Kinetex • Kinetex • Kinetex • Kinetex •
              Kinetex • Kinetex • Kinetex • Kinetex
            </span>
            <span className="inline-block mx-4 sm:mx-8">
              Kinetex • Kinetex • Kinetex • Kinetex • Kinetex • Kinetex •
              Kinetex • Kinetex • Kinetex • Kinetex
            </span>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Main Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
            EVENT CHAPTER
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            Explore the events, initiatives, and opportunities bringing the
            Kinetex Lab community together.
          </p>

          <button
            onClick={handleNotify}
            className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg border border-gray-600 hover:border-gray-500 transition-all duration-300">
            Get Notified
          </button>
        </div>

        <section
          aria-labelledby="codepati-event-title"
          className="relative mb-16 overflow-hidden rounded-lg border border-yellow-300/15 bg-[#17102F] p-4 text-white shadow-2xl shadow-black/20 sm:p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(250,204,21,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.3)_1px,transparent_1px)] bg-size-[56px_56px]"
          />

          <div className="relative">
            <div className="mb-5 grid grid-cols-2 gap-3 border-b border-white/10 pb-4 sm:mb-7 sm:grid-cols-4 sm:gap-4 sm:pb-5">
              <div className="col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-yellow-300/50 text-[10px] font-bold text-yellow-300">
                    360°
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65 sm:text-xs">
                    Arena schedule
                  </span>
                </div>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-yellow-300/70 sm:text-xs">
                  Event dates
                </p>
                <p className="text-xs font-bold text-white sm:text-sm">
                  02 — 03 OCT 2026
                </p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-yellow-300/70 sm:text-xs">
                  Location
                </p>
                <p className="text-xs font-bold text-white sm:text-sm">
                  KIIT, BHUBANESWAR
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1 sm:text-right">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-yellow-300/70 sm:text-xs">
                  Format
                </p>
                <p className="text-xs font-bold text-white sm:text-sm">
                  4 STAGES
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center lg:gap-10">
              <div className="min-w-0 flex-1">
                <h2
                  id="codepati-event-title"
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 text-2xl font-black uppercase leading-none tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                  <span>Kaun Banega Codepati?</span>
                  <span
                    className="inline-flex gap-1 text-yellow-300"
                    aria-hidden="true">
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                </h2>

                <div className="mt-4 flex flex-col gap-2 text-[10px] italic leading-5 text-white/55 sm:flex-row sm:gap-6 sm:text-xs">
                  <p>Think beyond the answer. Build what matters.</p>
                  <p className="font-semibold not-italic uppercase tracking-[0.08em] text-yellow-200/75">
                    Quiz / Hack / Pitch / Claim the Crown
                  </p>
                </div>

                <p className="mt-5 text-3xl font-black leading-tight text-yellow-300 sm:text-4xl md:text-5xl">
                  2nd &amp; 3rd October
                  <span className="ml-2 text-lg text-white/65 sm:text-xl">
                    2026
                  </span>
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <span className="text-xs font-black uppercase tracking-[0.12em] text-white">
                    Event rounds
                  </span>
                  <span className="flex gap-1" aria-hidden="true">
                    <span className="h-4 w-1 -skew-x-12 bg-yellow-300" />
                    <span className="h-4 w-1 -skew-x-12 bg-yellow-300" />
                    <span className="h-4 w-1 -skew-x-12 bg-yellow-300" />
                  </span>
                </div>
                <p className="mt-2 max-w-xl text-xs leading-6 text-white/60 sm:text-sm">
                  Tech Quiz <span className="text-yellow-300">·</span> Hack It{" "}
                  <span className="text-yellow-300">·</span> Pitch It{" "}
                  <span className="text-yellow-300">·</span> Codepati Crown
                </p>

                <Link
                  href="/event-kbc"
                  className="group mt-6 inline-flex min-h-11 items-center gap-3 rounded-full bg-yellow-300 px-5 py-3 text-xs font-black text-[#17102F] transition-all hover:bg-yellow-200 hover:shadow-[0_0_28px_rgba(250,204,21,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#17102F]">
                  Explore the event
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <div className="hidden shrink-0 items-center justify-center lg:flex">
                <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-yellow-300/20">
                  <div className="absolute inset-4 rounded-full border border-white/10" />
                  <div className="absolute inset-9 rounded-full border border-yellow-300/15 bg-[#100B25]/70" />
                  <div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border border-yellow-300/25 bg-[#26154F] text-center shadow-[0_0_36px_rgba(250,204,21,0.12)]">
                    <Trophy
                      className="h-7 w-7 text-yellow-300"
                      aria-hidden="true"
                    />
                    <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.14em] text-white/50">
                      The Crown
                    </span>
                  </div>
                  <CalendarDays
                    className="absolute right-2 top-7 h-7 w-7 rounded-lg border border-white/10 bg-[#17102F] p-1.5 text-yellow-300"
                    aria-hidden="true"
                  />
                  <MapPin
                    className="absolute bottom-5 left-3 h-7 w-7 rounded-lg border border-white/10 bg-[#17102F] p-1.5 text-yellow-300"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recruitment Notice Card */}
        <div className="bg-[#1a4d3a] text-amber-100 p-4 sm:p-6 rounded-lg mb-16 relative overflow-hidden">
          {/* Top Navigation Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-amber-100/20">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 border border-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-[10px] sm:text-xs font-mono">360°</span>
                </div>
                <span className="font-mono text-[10px] sm:text-xs uppercase">
                  Schedule
                </span>
              </div>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-orange-400 mb-1 uppercase">
                Open
              </div>
              <div className="font-bold text-xs sm:text-sm">12.10.25</div>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-orange-400 mb-1 uppercase">
                Deadline
              </div>
              <div className="font-bold text-xs sm:text-sm">25.10.25</div>
            </div>
            <div className="col-span-2 sm:col-span-1 sm:text-right">
              <div className="text-[10px] sm:text-xs text-orange-400 mb-1 uppercase">
                Next
              </div>
              <div className="inline-flex gap-1">
                <div className="w-1 h-3 sm:h-4 bg-orange-400 transform -skew-x-12"></div>
                <div className="w-1 h-3 sm:h-4 bg-orange-400 transform -skew-x-12"></div>
                <div className="w-1 h-3 sm:h-4 bg-orange-400 transform -skew-x-12"></div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-6 lg:gap-8">
            {/* Left Side */}
            <div className="flex-1 w-full">
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
                <span>RECRUITMENT DRIVE</span>
                <span className="flex gap-1 sm:gap-2">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </span>
              </h2>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-4">
                <p className="text-[10px] sm:text-xs italic text-amber-200">
                  Join the movement of innovators and creators
                  <br />
                  Shaping experiences in a connected world
                </p>
                <p className="text-[10px] sm:text-xs italic text-amber-200">
                  SHOW YOUR SKILLS | JOIN THE COMMUNITY
                  <br />
                  BE THE CHANGE | MAKE AN IMPACT
                </p>
              </div>

              {/* Date */}
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-orange-400 mb-3">
                1st, 2nd November
              </div>

              {/* Lineup/Roles */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-sm sm:text-base lg:text-lg">
                  OPEN ROLES
                </span>
                <div className="flex gap-1">
                  <div className="w-1 h-4 sm:h-5 bg-amber-100 transform -skew-x-12"></div>
                  <div className="w-1 h-4 sm:h-5 bg-amber-100 transform -skew-x-12"></div>
                  <div className="w-1 h-4 sm:h-5 bg-amber-100 transform -skew-x-12"></div>
                </div>
              </div>

              <p className="text-[10px] sm:text-xs mb-4 text-amber-200">
                Tech • Design • Content • Events
                <br />
                Marketing • Operations • Innovation
              </p>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] sm:text-xs font-bold">
                  LOCATIONS
                </span>
                <ArrowRight className="w-3 h-3" />
              </div>

              {/* Bottom Locations - Always shown here */}
              <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-5 mb-4">
                <div className="text-[10px] sm:text-xs font-mono bg-amber-100 text-emerald-900 px-2 sm:px-3 py-1 rounded">
                  A301, Campus-25
                </div>
                <div className="text-[10px] sm:text-xs font-mono bg-amber-100 text-emerald-900 px-2 sm:px-3 py-1 rounded">
                  A302, Campus-25
                </div>
                <div className="text-[10px] sm:text-xs font-mono bg-amber-100 text-emerald-900 px-2 sm:px-3 py-1 rounded">
                  A303, Campus-25
                </div>
              </div>
            </div>

            {/* Right Side - Desktop Only */}
            <div className="hidden lg:flex flex-col items-end gap-4">
              {/* Apply Button */}
              <div className="relative mb-4 mr-3">
                <img
                  src="/images/images.png"
                  alt="Apply Now"
                  className="w-32 h-12 object-cover shadow-lg bg-gray-900"
                />
              </div>

              {/* Logo Image */}
              <div className="w-40 h-40 bg-gray-900 rounded overflow-hidden relative">
                <img
                  src="/images/logo1.png"
                  alt="Recruitment"
                  className="w-fit h-fit object-cover"
                />
              </div>

              {/* Bottom right text */}
              <div className="text-xs text-right text-amber-200">
                <p>We are shaping</p>
                <p>the future together</p>
              </div>
            </div>
          </div>

          {/* Rotated Side Text - Desktop Only */}
          <div className="hidden lg:block absolute right-2 top-1/2 transform rotate-90 origin-right text-xs font-mono whitespace-nowrap text-amber-200 opacity-60">
            YOUR JOURNEY STARTS HERE
          </div>
        </div>
      </div>
    </div>
  );
}
