import CertificateVerification from "@/components/event-kbc/certificate-verification";

export default async function CertificateVerificationPage({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const { certificateId } = await params;
  return <CertificateVerification certificateId={certificateId} />;
}
