import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldAlert, Trophy } from "lucide-react";

type ErrorContent = {
  eyebrow: string;
  title: string;
  description: string;
};

const errorContent: Record<string, ErrorContent> = {
  AccessDenied: {
    eyebrow: "ACCESS NOT GRANTED",
    title: "Sign-in was not approved.",
    description:
      "Google did not grant access, or this account is not allowed to continue. Try again with an eligible account.",
  },
  OAuthAccountNotLinked: {
    eyebrow: "ACCOUNT NEEDS ATTENTION",
    title: "This email is linked another way.",
    description:
      "Use the sign-in method originally connected to this email, or contact the Kinetex Lab team for help.",
  },
  OAuthCallbackError: {
    eyebrow: "GOOGLE SIGN-IN INTERRUPTED",
    title: "We couldn't verify your sign-in.",
    description:
      "The Google sign-in response could not be completed. Try again; if this keeps happening, share the reference below with the support team.",
  },
  OAuthSignInError: {
    eyebrow: "GOOGLE SIGN-IN UNAVAILABLE",
    title: "We couldn't start sign-in.",
    description:
      "The Google sign-in service could not be reached. Please try again in a moment.",
  },
  AdapterError: {
    eyebrow: "ACCOUNT SERVICE UNAVAILABLE",
    title: "Your account couldn't be prepared.",
    description:
      "The account service did not complete this request. Wait a moment and try again; if it persists, contact the support team.",
  },
  CallbackRouteError: {
    eyebrow: "SIGN-IN COULDN'T FINISH",
    title: "We couldn't complete your sign-in.",
    description:
      "The final sign-in step was interrupted. Please try again, then share the reference below with support if the problem continues.",
  },
  Configuration: {
    eyebrow: "SIGN-IN TEMPORARILY UNAVAILABLE",
    title: "Authentication needs attention.",
    description:
      "The sign-in service is temporarily unavailable. Please try again later or contact the Kinetex Lab team.",
  },
};

const fallbackContent: ErrorContent = {
  eyebrow: "SIGN-IN INTERRUPTED",
  title: "We couldn't complete your sign-in.",
  description:
    "Your account was not changed. Return to sign-in and try again; if the problem continues, contact the Kinetex Lab team.",
};

type AuthErrorPageProps = {
  searchParams: Promise<{ error?: string | string[] }>;
};

export default async function AuthErrorPage({
  searchParams,
}: AuthErrorPageProps) {
  const { error } = await searchParams;
  const errorCode = Array.isArray(error) ? error[0] : error;
  const content = errorCode
    ? (errorContent[errorCode] ?? fallbackContent)
    : fallbackContent;
  const supportReference =
    errorCode && errorContent[errorCode] ? errorCode : "AUTH_ERROR";

  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#100B25] px-5 py-10 text-white sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(250,204,21,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.3)_1px,transparent_1px)] bg-size-[72px_72px]" />
        <div className="absolute -left-40 top-0 h-120 w-120 rounded-full bg-yellow-300/7 blur-[130px]" />
        <div className="absolute -right-40 bottom-0 h-128 w-lg rounded-full bg-violet-600/16 blur-[140px]" />
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/event-kbc"
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300">
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          />
          Back to the arena
        </Link>

        <section
          aria-labelledby="auth-error-title"
          className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#26154F]/90 to-[#17102F]/95 shadow-2xl shadow-black/30 sm:mt-14">
          <div className="border-b border-white/10 px-6 py-5 sm:px-9">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-300/20 bg-yellow-300/10 text-yellow-300">
                <Trophy className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-white">
                  Codepati Arena
                </p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
                  Kinetex Lab account access
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-9 sm:py-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-300/20 bg-yellow-300/8 text-yellow-300">
              <ShieldAlert className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
              {content.eyebrow}
            </p>
            <h1
              id="auth-error-title"
              className="mt-3 max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              {content.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              {content.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-in"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-yellow-300 px-6 py-3.5 text-sm font-bold text-[#17102F] transition-all duration-300 hover:bg-yellow-200 hover:shadow-[0_0_30px_rgba(250,204,21,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#26154F]">
                Try signing in again
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/event-kbc"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white/70 transition-colors hover:border-yellow-300/35 hover:text-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300">
                Return to Codepati
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
              <p className="text-xs leading-5 text-white/40">
                Still blocked? Share this reference with the support team.
              </p>
              <code className="rounded-lg border border-white/10 bg-black/10 px-3 py-2 text-[10px] font-semibold text-white/55">
                {supportReference}
              </code>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
