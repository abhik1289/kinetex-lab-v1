"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Copy,
  Crown,
  Link2,
  Loader2,
  LogOut,
  LockKeyhole,
  MapPin,
  Share2,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

const stages = ["Tech Quiz", "Hack It", "Pitch It", "Codepati Crown"];
const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Other"];
const dietaryOptions = [
  { value: "VEG", label: "Vegetarian" },
  { value: "NON_VEG", label: "Non-vegetarian" },
] as const;

type ProfileForm = {
  name: string;
  rollNo: string;
  year: string;
  mobile: string;
  dietaryPreference: string;
  teamName: string;
};

type RegistrationStatus = {
  registered: boolean;
  email: string;
  name: string;
  rollNo?: string;
  year?: string;
  mobile?: string;
  dietaryPreference?: string;
  isLeader?: boolean;
  team?: {
    name: string;
    inviteToken: string | null;
    memberCount: number;
    members: {
      name: string | null;
      email: string | null;
      isLeader: boolean;
      dietaryPreference: string | null;
    }[];
  };
};

type InvitePreview = {
  name: string;
  leaderEmail: string;
  memberCount: number;
  capacity: number;
};

type ApiError = Error & { status?: number };

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const payload = (await response.json()) as T & { error?: string };

  if (!response.ok) {
    const error = new Error(
      payload.error ?? "Something went wrong.",
    ) as ApiError;
    error.status = response.status;
    throw error;
  }

  return payload;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
        {label}
      </span>
      <input
        required
        type={type}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-yellow-300/50 focus:ring-2 focus:ring-yellow-300/20 disabled:cursor-not-allowed disabled:text-white/45"
      />
    </label>
  );
}

function GoogleButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-yellow-300 px-5 py-4 text-sm font-black text-[#17102F] transition-all duration-300 hover:bg-yellow-200 hover:shadow-[0_0_35px_rgba(250,204,21,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#17102F] disabled:cursor-wait disabled:opacity-70">
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26Z"
          />
          <path
            fill="#34A853"
            d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.5Z"
          />
          <path
            fill="#FBBC05"
            d="M6.53 13.59A5.86 5.86 0 0 1 6.23 12c0-.55.1-1.09.3-1.59V7.88H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.12l3.24-2.53Z"
          />
          <path
            fill="#EA4335"
            d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.71 5.38l3.24 2.53c.77-2.31 2.93-4.03 5.47-4.03Z"
          />
        </svg>
      )}
      {loading ? "Opening Google..." : "Continue with Google"}
      {!loading && (
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </button>
  );
}

function ErrorNotice({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="mt-5 rounded-xl border border-red-300/20 bg-red-400/[0.08] px-4 py-3 text-sm leading-6 text-red-100">
      {message}
    </div>
  );
}

export default function RegistrationFlow() {
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("invite") ?? "";
  const { data: session, status: sessionStatus } = useSession();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    rollNo: "",
    year: "",
    mobile: "",
    dietaryPreference: "",
    teamName: "",
  });

  const statusQuery = useQuery({
    queryKey: ["registration-status"],
    queryFn: () => requestJson<RegistrationStatus>("/api/teams/me"),
    enabled: sessionStatus === "authenticated",
    retry: 1,
  });

  const inviteQuery = useQuery({
    queryKey: ["team-invite", inviteToken],
    queryFn: () =>
      requestJson<InvitePreview>(
        `/api/teams/join?token=${encodeURIComponent(inviteToken)}`,
      ),
    enabled: Boolean(inviteToken),
    retry: false,
  });

  const isJoinFlow = Boolean(inviteToken);
  const deferredTeamName = useDeferredValue(form.teamName.trim());
  const teamCheckQuery = useQuery({
    queryKey: ["team-name-check", deferredTeamName.toUpperCase()],
    queryFn: () =>
      requestJson<{
        available: boolean;
        exists: boolean;
        normalizedName?: string;
        reason?: string;
      }>(`/api/teams/check?name=${encodeURIComponent(deferredTeamName)}`),
    enabled:
      !isJoinFlow &&
      deferredTeamName.length >= 3 &&
      sessionStatus === "authenticated" &&
      !statusQuery.data?.registered,
    staleTime: 15_000,
  });

  const effectiveForm = {
    ...form,
    name: form.name || statusQuery.data?.name || "",
    rollNo: form.rollNo || statusQuery.data?.rollNo || "",
    year: form.year || statusQuery.data?.year || "",
    mobile: form.mobile || statusQuery.data?.mobile || "",
    dietaryPreference:
      form.dietaryPreference || statusQuery.data?.dietaryPreference || "",
  };

  const updateField = (field: keyof ProfileForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const registrationMutation = useMutation({
    mutationFn: () =>
      requestJson<{ teamName: string; inviteToken?: string }>(
        isJoinFlow ? "/api/teams/join" : "/api/teams",
        {
          method: "POST",
          body: JSON.stringify(
            isJoinFlow
              ? { ...effectiveForm, token: inviteToken }
              : effectiveForm,
          ),
        },
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["registration-status"] }),
  });

  const inviteUrl = useMemo(() => {
    const token = statusQuery.data?.team?.inviteToken;
    return token
      ? `${window.location.origin}/event-kbc/registration?invite=${token}`
      : "";
  }, [statusQuery.data?.team?.inviteToken]);

  const copyInvite = async () => {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const shareInvite = async () => {
    if (!inviteUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join my Codepati team",
          text: "Join my team for the Codepati Arena.",
          url: inviteUrl,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    await copyInvite();
  };

  const signInToRegister = () => {
    const callbackUrl = `${window.location.pathname}${window.location.search}`;
    void signIn("google", { callbackUrl });
  };

  const formError = registrationMutation.error?.message;
  const isBusy = registrationMutation.isPending;
  const isLoading =
    sessionStatus === "loading" ||
    (sessionStatus === "authenticated" && statusQuery.isLoading);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#100B25] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(250,204,21,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.3)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute -left-48 top-0 h-[34rem] w-[34rem] rounded-full bg-yellow-300/[0.07] blur-[130px]" />
        <div className="absolute -right-48 bottom-[-8rem] h-[38rem] w-[38rem] rounded-full bg-violet-600/[0.18] blur-[150px]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col">
        <header className="flex items-center justify-between ">
          <Link
            href="/event-kbc"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to the arena
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 text-xs font-black tracking-[0.18em] text-white sm:text-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-yellow-300/20 bg-yellow-300/10">
                <Trophy className="h-4 w-4 text-yellow-300" />
              </span>
              CODEPATI<span className="text-yellow-300">.</span>
            </div>
            {sessionStatus === "authenticated" && (
              <button
                type="button"
                onClick={() => void signOut({ redirectTo: "/event-kbc" })}
                aria-label="Sign out"
                title="Sign out"
                className="group inline-flex h-10 w-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-white/65 transition-colors hover:border-yellow-300/30 hover:text-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 sm:w-auto sm:px-3">
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span className="hidden text-xs font-bold sm:inline">
                  Sign out
                </span>
              </button>
            )}
          </div>
        </header>

        <div className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:py-16">
          <section className="max-w-xl" aria-labelledby="registration-heading">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-300/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-300">
              <Sparkles className="h-3.5 w-3.5" /> Registration desk
            </div>
            <h1
              id="registration-heading original-surfer-regular"
              className="mt-7 text-5xl font-black leading-[0.94] tracking-[-0.07em] sm:text-7xl lg:text-[5.4rem]">
              Enter the
              <span className="block text-yellow-300">Codepati Arena.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-8 text-white/60 sm:text-lg">
              Complete your profile once, then move from the Tech Quiz to the
              Codepati Crown with your team.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <CalendarDays className="h-5 w-5 text-yellow-300" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                    Event dates
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    2nd & 3rd October 2026
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <MapPin className="h-5 w-5 text-yellow-300" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    KIIT, Bhubaneswar
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-white/10 pt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-300">
                Your route to the crown
              </p>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stages.map((stage, index) => (
                  <div key={stage} className="flex items-start gap-2">
                    <span className="text-xs font-black text-yellow-300/70">
                      0{index + 1}
                    </span>
                    <span className="text-xs leading-5 text-white/45">
                      {stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            className="relative mx-auto w-full max-w-2xl"
            aria-labelledby="registration-card-heading">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-yellow-300/[0.05] blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#26154F]/95 to-[#17102F]/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-9">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/70 to-transparent" />

              {isLoading && (
                <div className="flex min-h-72 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-yellow-300" />
                </div>
              )}

              {!isLoading && sessionStatus === "unauthenticated" && (
                <div className="py-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-300/20 bg-yellow-300/10">
                    <LockKeyhole className="h-5 w-5 text-yellow-300" />
                  </div>
                  <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
                    {isJoinFlow ? "Team invitation" : "Claim your spot"}
                  </p>
                  <h2
                    id="registration-card-heading"
                    className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                    {isJoinFlow && inviteQuery.data
                      ? `Join ${inviteQuery.data.name}.`
                      : "Ready to test your knowledge?"}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/50">
                    Sign in with your KIIT Google account to continue. Your
                    Google email is used as your event identity.
                  </p>
                  {inviteQuery.isError && (
                    <ErrorNotice message={inviteQuery.error.message} />
                  )}
                  <div className="mt-8">
                    <GoogleButton onClick={signInToRegister} loading={false} />
                  </div>
                  <div className="mt-7 flex items-center justify-center gap-2 text-xs text-white/40">
                    <ShieldCheck className="h-4 w-4 text-yellow-300/80" /> KIIT
                    account only · No password required
                  </div>
                </div>
              )}

              {!isLoading &&
                sessionStatus === "authenticated" &&
                statusQuery.data?.registered &&
                statusQuery.data.team && (
                  <div className="py-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-300/20 bg-yellow-300/10">
                        <CheckCircle2 className="h-6 w-6 text-yellow-300" />
                      </div>
                      <span className="rounded-full border border-yellow-300/20 bg-yellow-300/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-yellow-300">
                        Registered
                      </span>
                    </div>
                    <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-yellow-300/15 bg-linear-to-r from-[#26154F]/70 to-[#17102F]/80 p-4 sm:flex-row sm:items-center sm:p-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-yellow-300/20 bg-yellow-300/10 text-yellow-300">
                        <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-yellow-300">
                          Event updates
                        </p>
                        <h3 className="mt-1 text-sm font-bold text-white">
                          Join the Codepati WhatsApp group
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-white/45">
                          Get event announcements and important updates in one
                          place.
                        </p>
                      </div>
                      <a
                        href="https://chat.whatsapp.com/FNtQ3CEf7Ec3csLUYBjixg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-yellow-300 px-5 py-3 text-xs font-black text-[#17102F] transition-all hover:bg-yellow-200 hover:shadow-[0_0_25px_rgba(250,204,21,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#17102F]">
                        Join WhatsApp
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                    <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
                      {statusQuery.data.isLeader
                        ? "Team leader dashboard"
                        : "Team member profile"}
                    </p>
                    <h2
                      id="registration-card-heading"
                      className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                      {statusQuery.data.team.name}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/50">
                      {statusQuery.data.isLeader
                        ? "Share the invite link with up to two teammates."
                        : "You are successfully registered with this team."}
                    </p>
                    <div className="mt-7 space-y-3">
                      {statusQuery.data.team.members.map((member) => (
                        <div
                          key={member.email}
                          className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                            member.isLeader
                              ? "border-yellow-300/35 bg-yellow-300/8 shadow-[inset_3px_0_0_rgba(250,204,21,0.8)]"
                              : "border-white/10 bg-white/4"
                          }`}>
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                              member.isLeader
                                ? "bg-yellow-300/20 text-yellow-200"
                                : "bg-yellow-300/10 text-yellow-300"
                            }`}>
                            {member.isLeader ? (
                              <Crown className="h-4 w-4" />
                            ) : (
                              <Users className="h-4 w-4" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                              {member.name || member.email}
                            </p>
                            <p
                              className={`text-[10px] uppercase tracking-[0.12em] ${
                                member.isLeader
                                  ? "font-bold text-yellow-200"
                                  : "text-white/35"
                              }`}>
                              {member.isLeader ? "Team leader" : "Team member"}
                              {member.dietaryPreference &&
                                ` · ${member.dietaryPreference === "VEG" ? "Vegetarian" : "Non-vegetarian"}`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {statusQuery.data.isLeader && inviteUrl && (
                      <div className="mt-7">
                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                          Team invite link
                        </label>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <input
                            readOnly
                            value={inviteUrl}
                            aria-label="Team invite link"
                            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-3 text-xs text-white/60 outline-none focus:border-yellow-300/40"
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={shareInvite}
                              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-yellow-300/30 px-4 text-xs font-black text-yellow-300 transition hover:bg-yellow-300 hover:text-[#17102F] sm:flex-none">
                              <Share2 className="h-4 w-4" />
                              Share
                            </button>
                            <button
                              type="button"
                              onClick={copyInvite}
                              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-300 px-4 text-xs font-black text-[#17102F] transition hover:bg-yellow-200 sm:flex-none">
                              {copied ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                              {copied ? "Copied" : "Copy"}
                            </button>
                          </div>
                        </div>
                        <a
                          href={inviteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-yellow-200 transition hover:text-yellow-100">
                          Open invite link
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                        <p className="mt-3 flex items-center gap-2 text-xs text-white/35">
                          <Link2 className="h-3.5 w-3.5 text-yellow-300" />{" "}
                          Maximum team size: 3 members
                        </p>
                      </div>
                    )}
                  </div>
                )}

              {!isLoading &&
                sessionStatus === "authenticated" &&
                !statusQuery.data?.registered && (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      registrationMutation.mutate();
                    }}
                    className="py-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-300/20 bg-yellow-300/10">
                        {isJoinFlow ? (
                          <Users className="h-5 w-5 text-yellow-300" />
                        ) : (
                          <LockKeyhole className="h-5 w-5 text-yellow-300" />
                        )}
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                        Step 2 of 2
                      </span>
                    </div>
                    <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
                      {isJoinFlow ? "Join your team" : "Build your profile"}
                    </p>
                    <h2
                      id="registration-card-heading"
                      className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                      {isJoinFlow && inviteQuery.data
                        ? `Join ${inviteQuery.data.name}.`
                        : "Tell us who you are."}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/50">
                      {isJoinFlow
                        ? "Add your details to join the invitation. Team names are managed by the team leader."
                        : "Your details help us organize the competition and keep your team connected."}
                    </p>
                    {isJoinFlow && inviteQuery.isLoading && (
                      <p className="mt-4 text-xs text-yellow-200">
                        Checking invitation...
                      </p>
                    )}
                    {isJoinFlow && inviteQuery.isError && (
                      <ErrorNotice message={inviteQuery.error.message} />
                    )}
                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Full name"
                        value={effectiveForm.name}
                        onChange={(value) => updateField("name", value)}
                        placeholder="Your full name"
                      />
                      <Field
                        label="Google email"
                        value={session.user?.email ?? ""}
                        disabled
                      />
                      <Field
                        label="Roll number"
                        value={effectiveForm.rollNo}
                        onChange={(value) => updateField("rollNo", value)}
                        placeholder="e.g. 2305..."
                      />
                      <label className="block">
                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                          Academic year
                        </span>
                        <select
                          required
                          value={effectiveForm.year}
                          onChange={(event) =>
                            updateField("year", event.target.value)
                          }
                          className="h-12 w-full rounded-xl border border-white/10 bg-[#21143F] px-4 text-sm text-white outline-none transition focus:border-yellow-300/50 focus:ring-2 focus:ring-yellow-300/20">
                          <option value="" disabled>
                            Select year
                          </option>
                          {yearOptions.map((year) => (
                            <option key={year}>{year}</option>
                          ))}
                        </select>
                      </label>
                      <Field
                        label="Mobile number"
                        value={effectiveForm.mobile}
                        onChange={(value) =>
                          updateField(
                            "mobile",
                            value.replace(/\D/g, "").slice(0, 10),
                          )
                        }
                        placeholder="10-digit mobile"
                        type="tel"
                      />
                      <fieldset className="sm:col-span-2">
                        <legend className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                          Food preference
                        </legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {dietaryOptions.map((option) => (
                            <label
                              key={option.value}
                              className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 text-sm transition ${
                                effectiveForm.dietaryPreference === option.value
                                  ? "border-yellow-300/60 bg-yellow-300/8 text-white"
                                  : "border-white/10 bg-white/4.5 text-white/65 hover:border-white/25"
                              }`}>
                              <input
                                required
                                type="radio"
                                name="dietaryPreference"
                                value={option.value}
                                checked={
                                  effectiveForm.dietaryPreference ===
                                  option.value
                                }
                                onChange={(event) =>
                                  updateField(
                                    "dietaryPreference",
                                    event.target.value,
                                  )
                                }
                                className="accent-yellow-300"
                              />
                              {option.label}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      {!isJoinFlow && (
                        <div className="sm:col-span-2">
                          <Field
                            label="Unique team name"
                            value={form.teamName}
                            onChange={(value) => updateField("teamName", value)}
                            placeholder="e.g. Quantum Builders"
                          />
                          {form.teamName.trim().length >= 3 && (
                            <p
                              className={`mt-2 text-xs ${teamCheckQuery.isLoading ? "text-white/40" : teamCheckQuery.data?.available ? "text-yellow-200" : "text-red-200"}`}>
                              {teamCheckQuery.isLoading
                                ? "Checking availability..."
                                : teamCheckQuery.data?.available
                                  ? `${teamCheckQuery.data.normalizedName ?? form.teamName.trim()} is available.`
                                  : (teamCheckQuery.data?.reason ??
                                    "That team name is already taken.")}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    {formError && <ErrorNotice message={formError} />}
                    <button
                      type="submit"
                      disabled={
                        isBusy ||
                        Boolean(
                          isJoinFlow &&
                          (inviteQuery.isLoading || inviteQuery.isError),
                        ) ||
                        Boolean(
                          !isJoinFlow &&
                          (!teamCheckQuery.data?.available ||
                            teamCheckQuery.isFetching),
                        )
                      }
                      className="mt-7 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-yellow-300 px-5 py-4 text-sm font-black text-[#17102F] transition hover:bg-yellow-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#17102F] disabled:cursor-not-allowed disabled:opacity-50">
                      {isBusy ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" /> Saving
                          your spot...
                        </>
                      ) : (
                        <>
                          {isJoinFlow ? "Join team" : "Create team & continue"}
                          <ArrowUpRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-white/35">
                      <ShieldCheck className="h-4 w-4 text-yellow-300/80" />{" "}
                      Your details are protected and used for event
                      registration.
                    </div>
                  </form>
                )}

              {!isLoading &&
                sessionStatus === "authenticated" &&
                statusQuery.isError && (
                  <ErrorNotice message={statusQuery.error.message} />
                )}
            </div>
          </section>
        </div>

        <footer className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>Kinetex Lab · KIIT Chapter</span>
          <span>Think. Build. Pitch. Win.</span>
        </footer>
      </div>
    </main>
  );
}
