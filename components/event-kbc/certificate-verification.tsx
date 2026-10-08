"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, BadgeCheck, CircleX, LoaderCircle } from "lucide-react";

type VerificationResult = {
  valid: boolean;
  name?: string;
  rollNo?: string;
  certificateId?: string;
  event?: string;
};

export default function CertificateVerification({
  certificateId,
}: {
  certificateId: string;
}) {
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function verify() {
      try {
        const response = await fetch(
          `/api/certificate/verify/${encodeURIComponent(certificateId)}`,
          { cache: "no-store", signal: controller.signal },
        );
        if (!response.ok) {
          const payload = (await response.json()) as { error?: string };
          throw new Error(payload.error ?? "Certificate verification failed.");
        }
        setResult((await response.json()) as VerificationResult);
      } catch (verificationError) {
        if (controller.signal.aborted) return;
        setError(
          verificationError instanceof Error
            ? verificationError.message
            : "Certificate verification failed.",
        );
      }
    }

    void verify();
    return () => controller.abort();
  }, [certificateId]);

  return (
    <main className="min-h-screen bg-[#100B25] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/event-kbc"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-amber-200">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to KBC
        </Link>
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">
            KBC 2026 · Certificate verification
          </p>
          {error ? (
            <div role="alert" className="mt-7 flex gap-4">
              <CircleX className="mt-1 size-7 shrink-0 text-red-300" />
              <div>
                <h1 className="text-2xl font-semibold">Unable to verify</h1>
                <p className="mt-2 text-sm leading-6 text-white/65">{error}</p>
              </div>
            </div>
          ) : !result ? (
            <div
              role="status"
              className="mt-7 flex items-center gap-3 text-white/70">
              <LoaderCircle className="size-5 animate-spin text-amber-200" />
              Verifying certificate...
            </div>
          ) : result.valid ? (
            <div className="mt-7">
              <div className="flex items-start gap-4">
                <BadgeCheck className="mt-1 size-8 shrink-0 text-emerald-300" />
                <div>
                  <h1 className="text-2xl font-semibold text-emerald-100">
                    Valid certificate
                  </h1>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    This certificate was issued for participation in{" "}
                    {result.event}.
                  </p>
                </div>
              </div>
              <dl className="mt-7 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-white/45">
                    Certificate holder
                  </dt>
                  <dd className="mt-1 font-medium">{result.name}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-white/45">
                    Roll number
                  </dt>
                  <dd className="mt-1 font-medium">{result.rollNo}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-wide text-white/45">
                    Verification ID
                  </dt>
                  <dd className="mt-1 break-all font-mono text-sm">
                    {result.certificateId}
                  </dd>
                </div>
              </dl>
            </div>
          ) : (
            <div role="status" className="mt-7 flex gap-4">
              <CircleX className="mt-1 size-7 shrink-0 text-red-300" />
              <div>
                <h1 className="text-2xl font-semibold">Certificate not valid</h1>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  No active KBC 2026 certificate matches this verification ID.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
