"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { ArrowLeft, Award, Download, ShieldCheck } from "lucide-react";
import { toPng } from "html-to-image";

type Certificate = {
  name: string;
  rollNo: string;
  certificateId: string;
  verificationPath: string;
};

type CertificateResponse = {
  available?: boolean;
  message?: string;
  error?: string;
  name?: string;
  rollNo?: string;
  certificateId?: string;
  verificationPath?: string;
};

type DownloadFormat = "pdf" | "png";

function saveBlob(blob: Blob, filename: string) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

export default function MyCertificate() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [message, setMessage] = useState("");
  const [requiresSignIn, setRequiresSignIn] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>("png");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const certificateRef = useRef<HTMLElement>(null);

  async function checkEligibility(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setRequiresSignIn(false);
    setCertificate(null);
    setIsChecking(true);

    try {
      const response = await fetch("/api/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rollNo }),
        cache: "no-store",
      });
      const result = (await response.json()) as CertificateResponse;

      if (response.status === 401) {
        setRequiresSignIn(true);
        setMessage(result.error ?? "Sign in to verify your certificate.");
        return;
      }
      if (!response.ok) {
        setMessage(
          result.error ?? "Certificate eligibility could not be checked.",
        );
        return;
      }
      if (!result.available) {
        setMessage(
          result.message ??
            "Certificate not available. You were not registered/marked as a participant for Kaun Banega Codepati 2026.",
        );
        return;
      }
      if (
        !result.name ||
        !result.rollNo ||
        !result.certificateId ||
        !result.verificationPath
      ) {
        throw new Error("The certificate response was incomplete.");
      }

      setCertificate({
        name: result.name,
        rollNo: result.rollNo,
        certificateId: result.certificateId,
        verificationPath: result.verificationPath,
      });
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Certificate eligibility could not be checked.",
      );
    } finally {
      setIsChecking(false);
    }
  }

  async function downloadCertificate() {
    const certificateElement = certificateRef.current;
    if (!certificateElement || !certificate) return;

    setIsDownloading(true);
    setDownloadError("");

    try {
      await document.fonts.ready;
      const imageData = await toPng(certificateElement, {
        backgroundColor: "#fffef9",
        pixelRatio: 3,
        cacheBust: true,
      });
      const filename = `KBC-2026-${certificate.rollNo}`;

      if (downloadFormat === "png") {
        const imageBlob = await (await fetch(imageData)).blob();
        saveBlob(imageBlob, `${filename}.png`);
        return;
      }

      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
      });
      pdf.addImage(imageData, "PNG", 0, 0, 297, 210);
      saveBlob(pdf.output("blob"), `${filename}.pdf`);
    } catch (error) {
      setDownloadError(
        error instanceof Error
          ? error.message
          : "Could not download the certificate. Please try again.",
      );
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <main className="kbc-certificate-page min-h-screen bg-[#100B25] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/event-kbc"
            className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to KBC
          </Link>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
            <Award className="size-4" aria-hidden="true" />
            My certificate
          </span>
        </header>

        <section className="certificate-controls mx-auto mb-8 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">
              Kaun Banega Codepati 2026
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Check your certificate
            </h1>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Enter the name and roll number on your KBC registration. Your
              signed-in account and the event eligibility record are verified
              securely.
            </p>
          </div>

          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={checkEligibility}>
            <label className="grid gap-2 text-sm font-medium">
              Name
              <input
                autoComplete="name"
                maxLength={100}
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-11 rounded-lg border border-white/15 bg-black/20 px-3 text-white outline-none placeholder:text-white/35 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/25"
                placeholder="Enter your registered name"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Roll number
              <input
                autoComplete="off"
                maxLength={32}
                required
                value={rollNo}
                onChange={(event) => setRollNo(event.target.value)}
                className="h-11 rounded-lg border border-white/15 bg-black/20 px-3 text-white outline-none placeholder:text-white/35 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/25"
                placeholder="Enter your roll number"
              />
            </label>
            <button
              type="submit"
              disabled={isChecking}
              className="min-h-11 rounded-lg bg-amber-300 px-5 text-sm font-bold text-[#211700] transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-wait disabled:opacity-60 sm:col-span-2 sm:justify-self-start">
              {isChecking
                ? "Checking eligibility..."
                : "Verify & view certificate"}
            </button>
          </form>

          {message && (
            <div
              role="alert"
              className="mt-4 rounded-lg border border-amber-200/20 bg-amber-200/[0.07] p-3 text-sm leading-6 text-amber-100">
              {message}
              {requiresSignIn && (
                <button
                  type="button"
                  onClick={() =>
                    void signIn("google", {
                      callbackUrl: "/event-kbc/my-certificate",
                    })
                  }
                  className="ml-2 font-semibold underline underline-offset-4 hover:text-white">
                  Sign in with KIIT
                </button>
              )}
            </div>
          )}
        </section>

        {certificate && (
          <section
            className="certificate-result"
            aria-label="Your KBC certificate">
            <div className="certificate-controls mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <p className="inline-flex items-center gap-2 text-sm text-emerald-200">
                <ShieldCheck className="size-4" aria-hidden="true" />
                Your certificate is verified and ready.
              </p>
              {/* <div className="flex flex-wrap items-center gap-3">
                <fieldset className="certificate-format-picker">
                  <legend className="sr-only">
                    Certificate download format
                  </legend>
                  {(["png"] as const).map((format) => (
                    <label
                      key={format}
                      className={`certificate-format-option ${downloadFormat === format ? "is-selected" : ""}`}>
                      <input
                        type="radio"
                        name="certificate-format"
                        value={format}
                        checked={downloadFormat === format}
                        onChange={() => setDownloadFormat(format)}
                      />
                      {format === "pdf" ? "PDF" : "Image"}
                    </label>
                  ))}
                </fieldset>
                <button
                  type="button"
                  onClick={() => void downloadCertificate()}
                  disabled={isDownloading}
                  className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg border border-amber-200/30 bg-amber-200 px-4 text-sm font-bold text-[#211700] transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-wait disabled:opacity-60">
                  <Download className="size-4" aria-hidden="true" />
                  {isDownloading
                    ? "Preparing download..."
                    : `Download ${downloadFormat === "pdf" ? "PDF" : "Image"}`}
                </button>
              </div> */}
            </div>
            {downloadError && (
              <p
                role="alert"
                className="certificate-controls mb-3 text-sm text-red-200">
                {downloadError}
              </p>
            )}

            <div className="certificate-scroll overflow-x-auto pb-2">
              <article
                ref={certificateRef}
                className="kbc-certificate mx-auto"
                aria-label="Certificate of Excellence">
                <Image
                  src="/certificates/certificate-border.png"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1120px) 100vw, 1120px"
                  className="certificate-border-image"
                  aria-hidden="true"
                />
                <Image
                  src="/certificates/kbc_atom_decoration.svg"
                  alt=""
                  width={320}
                  height={420}
                  className="certificate-decoration certificate-atom"
                  aria-hidden="true"
                />
                <Image
                  src="/certificates/kbc_orbital_globe.svg"
                  alt=""
                  width={500}
                  height={520}
                  className="certificate-decoration certificate-globe"
                  aria-hidden="true"
                />
                <Image
                  src="/certificates/gold_wave.png"
                  alt=""
                  width={420}
                  height={220}
                  className="certificate-decoration certificate-wave"
                  aria-hidden="true"
                />
                <Image
                  src="/certificates/circuit-lines.png"
                  alt=""
                  width={500}
                  height={360}
                  className="certificate-decoration certificate-circuit"
                  aria-hidden="true"
                />

                <div className="certificate-content">
                  <div
                    className="certificate-logos"
                    aria-label="Event organizers">
                    <div
                      className="certificate-ksac"
                      aria-label="KSAC logo placeholder">
                      <span>KSAC</span>
                    </div>
                    <span
                      className="certificate-kiit-crop"
                      role="img"
                      aria-label="KIIT logo"
                    />
                    <Image
                      src="/images/logo1.png"
                      width={48}
                      height={66}
                      alt="Kinetex Lab"
                      className="certificate-kinetex-logo"
                    />
                  </div>

                  <h2 className="certificate-title">
                    Certificate of Excellence
                  </h2>
                  <div className="certificate-recipient">
                    <p className="certificate-recipient-name">
                      {certificate.name}
                    </p>
                    {/* <p className="certificate-recipient-roll">
                      Roll No. {certificate.rollNo}
                    </p> */}
                    <div className="certificate-divider" />
                  </div>

                  <p className="certificate-copy">
                    This is to certify that the above mentioned, has served as a
                    valued member of the <strong>Organizing Committee</strong>{" "}
                    for <strong>KAUN BANEGA CODEPATI 2026</strong>, a
                    quiz-cum-vibeathon challenge presented by Kinetex Lab, and
                    is hereby recognized for their dedication, leadership,
                    coordination, and valuable contribution towards the
                    successful execution of the event.
                  </p>

                  <div className="certificate-signatures">
                    <div className="certificate-signature">
                      <div className="certificate-signature-rule" />
                      <strong>Dr. Ajit Pasayat</strong>
                      <span>Associate Dean, KSAC</span>
                    </div>
                    <div className="certificate-signature">
                      <div className="certificate-signature-rule" />
                      <strong>Ms. Gipsita Nayak</strong>
                      <span>Dy. Director, KSAC</span>
                    </div>
                    <div className="certificate-signature">
                      <span className="certificate-handwritten">
                        Anjan Bandyopadhyay
                      </span>
                      <div className="certificate-signature-rule" />
                      <strong>Dr. Anjan Bandyopadhyay</strong>
                      <span>FIC, Kinetex Lab</span>
                    </div>
                  </div>

                  {/* <p className="certificate-verification">
                    Verification ID:{" "}
                    <strong>{certificate.certificateId}</strong>
                    <span aria-hidden="true"> · </span>
                    <Link href={certificate.verificationPath}>
                      Verify certificate
                    </Link>
                  </p> */}
                </div>
              </article>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
