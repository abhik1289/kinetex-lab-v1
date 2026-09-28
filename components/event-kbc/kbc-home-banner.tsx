import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Trophy } from "lucide-react";

const eventStages = [
  { number: "01", label: "Tech Quiz", position: "left-0 top-[18%]" },
  { number: "02", label: "Hack It", position: "right-0 top-[8%]" },
  { number: "03", label: "Pitch It", position: "bottom-[7%] left-[4%]" },
  { number: "04", label: "The Crown", position: "bottom-[16%] right-0" },
];

export default function KbcHomeBanner() {
  return (
    <section
      aria-labelledby="kbc-banner-title"
      className="relative isolate overflow-hidden border-y border-yellow-300/10 bg-[#0B081A] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(250,204,21,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.3)_1px,transparent_1px)] bg-size-[72px_72px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[48%] bg-[linear-gradient(90deg,transparent,rgba(38,21,79,0.42),transparent)]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-yellow-300/20 bg-yellow-300/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-300 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-300" />
            Featured event · 2026
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-white/45">
            Kinetex Lab presents
          </p>
          <h2
            id="kbc-banner-title"
            className="mt-4 max-w-2xl text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            Kaun Banega
            <br />
            <span className="text-yellow-300">Codepati?</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
            One arena. Four stages. Bring your technical edge, build a real
            solution, and make your case for the Codepati Crown.
          </p>

          <div className="mt-7 flex flex-col gap-x-6 gap-y-3 sm:flex-row sm:flex-wrap">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-white/70">
              <CalendarDays
                className="h-4 w-4 text-yellow-300"
                aria-hidden="true"
              />
              02/10/2026 &amp; 03/10/2026
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-white/70">
              <MapPin className="h-4 w-4 text-yellow-300" aria-hidden="true" />
              02/10/2026: K3 Ladies club (Campus -20), Central library
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2.5 text-xs font-semibold text-white/70">
            <MapPin className="h-4 w-4 text-yellow-300" aria-hidden="true" />
            03/10/2026: Campus 17 Auditorium
          </div>

          <Link
            href="/event-kbc"
            className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-yellow-300 px-6 py-3.5 text-sm font-bold text-[#17102F] transition-all duration-300 hover:bg-yellow-200 hover:shadow-[0_0_30px_rgba(250,204,21,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0B081A]">
            Explore the arena
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="relative mx-auto flex w-full max-w-[500px] items-center justify-center">
          <div
            aria-hidden="true"
            className="relative aspect-square w-full max-w-[430px]">
            <div className="absolute inset-[9%] rounded-full border border-yellow-300/20" />
            <div className="absolute inset-[20%] rounded-full border border-white/10 bg-[#17102F]/70" />
            <div className="absolute inset-[31%] flex flex-col items-center justify-center rounded-full border border-yellow-300/25 bg-[#26154F]/90 text-center shadow-[0_0_55px_rgba(250,204,21,0.08)]">
              <Trophy className="mb-3 h-8 w-8 text-yellow-300 sm:h-9 sm:w-9" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45">
                The ultimate
              </span>
              <span className="mt-1 text-lg font-black text-yellow-300 sm:text-xl">
                Codepati
              </span>
              <span className="text-xs font-semibold text-white/70">Crown</span>
            </div>

            {eventStages.map((stage, index) => (
              <div
                key={stage.number}
                className={`absolute ${stage.position} flex min-h-14 min-w-28 items-center gap-2.5 rounded-xl border px-3 py-2 shadow-xl backdrop-blur-xl sm:min-w-32 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 ${
                  index === 3
                    ? "border-yellow-300/25 bg-[#26154F]/95"
                    : "border-white/10 bg-[#1d163b]/95"
                }`}>
                <span
                  className={`text-[10px] font-black ${
                    index === 3 ? "text-yellow-300" : "text-white/35"
                  }`}>
                  {stage.number}
                </span>
                <span className="text-[11px] font-bold text-white sm:text-xs">
                  {stage.label}
                </span>
              </div>
            ))}

            <div className="absolute left-[17%] top-[5%] h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_18px_#facc15]" />
            <div className="absolute bottom-[20%] right-[19%] h-1.5 w-1.5 rounded-full bg-violet-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
