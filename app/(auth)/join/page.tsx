"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { ArrowUpRight, Loader2, Users } from "lucide-react";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { extractRollNo, isKIITEmail } from "@/lib/utils";

export default function JoinPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#100B25] text-yellow-300">
          <Loader2 className="h-7 w-7 animate-spin" />
        </main>
      }>
      <JoinPageContent />
    </Suspense>
  );
}

function JoinPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [teamName, setTeamName] = useState("");
  const [memberCount, setMemberCount] = useState(0);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    Promise.all([
      getSession(),
      fetch(`/api/teams/join?token=${encodeURIComponent(token)}`).then(
        (response) => response.json(),
      ),
    ]).then(([session, team]) => {
      setEmail(session?.user?.email?.toLowerCase() ?? "");
      setName(session?.user?.name ?? "");
      setTeamName(team.name ?? "");
      setMemberCount(team.memberCount ?? 0);
      setMessage(team.error ?? "");
      setIsChecking(false);
    });
  }, [token]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/teams/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, name, mobile }),
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.error ?? "Unable to join this team.");
        return;
      }
      setJoined(true);
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isChecking)
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#100B25] text-yellow-300">
        <Loader2 className="h-7 w-7 animate-spin" />
      </main>
    );

  if (!email) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#100B25] px-5 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
            Team Invite
          </p>
          <h1 className="mt-4 text-3xl font-black">Join the challenge</h1>
          <p className="mt-4 text-sm leading-6 text-white/50">
            Sign in with your KIIT Google account to accept this invite.
          </p>
          <Button
            className="mt-7 h-12 w-full rounded-full bg-yellow-300 text-[#17102F] hover:bg-yellow-200"
            onClick={() =>
              signIn("google", {
                redirectTo: `/join?token=${encodeURIComponent(token)}`,
              })
            }>
            Continue with Google <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#100B25] px-5 py-12 text-white sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-yellow-300">
            Team Invite
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
            Join{" "}
            <span className="text-yellow-300">{teamName || "your team"}.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/50">
            Complete the same member details as the team leader. Your team name
            is already connected to this invite.
          </p>
          <Link
            href="/event-kbc"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-yellow-300">
            Back to the event <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-9">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-300/20 bg-yellow-300/10 text-yellow-300">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-black">Member details</h2>
              <p className="text-sm text-white/45">
                {memberCount} of 3 places filled
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" value={name} onChange={setName} required />
            <Field label="Roll number" value={extractRollNo(email)} readOnly />
            <Field label="KIIT email" value={email} readOnly />
            <Field
              label="Mobile number"
              value={mobile}
              onChange={setMobile}
              type="tel"
              pattern="[0-9]{10}"
              required
            />
          </div>
          {message && (
            <p className="mt-5 rounded-xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm text-red-200">
              {message}
            </p>
          )}
          {joined && (
            <p className="mt-5 rounded-xl border border-yellow-300/20 bg-yellow-300/10 px-4 py-3 text-sm text-yellow-200">
              You joined {teamName}. Welcome to the team.
            </p>
          )}
          <Button
            type="submit"
            disabled={
              isLoading || joined || memberCount >= 3 || !isKIITEmail(email)
            }
            className="mt-7 h-12 w-full rounded-full bg-yellow-300 text-[#17102F] hover:bg-yellow-200">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Join Team"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  pattern,
  readOnly,
  required,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  type?: string;
  pattern?: string;
  readOnly?: boolean;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold text-white/75">
      <span>{label}</span>
      <input
        className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-yellow-300/50 read-only:text-white/45"
        type={type}
        pattern={pattern}
        value={value}
        readOnly={readOnly}
        required={required}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </label>
  );
}
