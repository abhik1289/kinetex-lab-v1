"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowUpRight, Loader2, Users } from "lucide-react";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { extractRollNo, isKIITEmail } from "@/lib/utils";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [inviteLink, setInviteLink] = useState("");

  useEffect(() => {
    getSession().then((session) => {
      const sessionEmail = session?.user?.email?.toLowerCase() ?? "";
      setEmail(sessionEmail);
      setName(session?.user?.name ?? "");
      setIsCheckingSession(false);
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setInviteLink("");

    if (!isKIITEmail(email)) {
      setMessage("Sign in with your @kiit.ac.in Google account first.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leaderName: name, mobile, teamName }),
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error ?? "Unable to create your team.");
        return;
      }

      setInviteLink(
        `${window.location.origin}/join?token=${result.inviteToken}`,
      );
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isCheckingSession) {
    return <LoadingState />;
  }

  if (!email) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#100B25] px-5 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
            KBC Registration
          </p>
          <h1 className="mt-4 text-3xl font-black">Sign in to register</h1>
          <p className="mt-4 text-sm leading-6 text-white/50">
            Use your KIIT Google account to create a team.
          </p>
          <Button
            className="mt-7 h-12 w-full rounded-full bg-yellow-300 text-[#17102F] hover:bg-yellow-200"
            onClick={() => signIn("google", { redirectTo: "/register" })}>
            Continue with Google <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#100B25] px-5 py-12 text-white sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-yellow-300">
            Team Registration
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
            Build your team.
            <br />
            <span className="text-yellow-300">Enter the challenge.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/50">
            You will become the team leader. After registration, share your
            invite link with up to two teammates.
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
              <h2 className="text-xl font-black">Create your team</h2>
              <p className="text-sm text-white/45">Leader details</p>
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
          <div className="mt-5">
            <Field
              label="Team name"
              value={teamName}
              onChange={setTeamName}
              required
            />
          </div>

          {message && (
            <p className="mt-5 rounded-xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm text-red-200">
              {message}
            </p>
          )}
          {inviteLink && (
            <div className="mt-5 rounded-xl border border-yellow-300/20 bg-yellow-300/10 p-4">
              <p className="text-sm font-semibold text-yellow-200">
                Team created. Share this invite link:
              </p>
              <input
                className="mt-3 w-full bg-transparent text-xs text-white/75 outline-none"
                readOnly
                value={inviteLink}
                onFocus={(event) => event.currentTarget.select()}
              />
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading || Boolean(inviteLink)}
            className="mt-7 h-12 w-full rounded-full bg-yellow-300 text-[#17102F] hover:bg-yellow-200">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Create Team"
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

function LoadingState() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#100B25] text-yellow-300">
      <Loader2 className="h-7 w-7 animate-spin" />
    </main>
  );
}
