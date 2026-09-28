"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function AdminSessionGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/sign-in");
    } else if (status === "authenticated" && !session.user.isAdmin) {
      router.replace("/");
    }
  }, [router, session, status]);

  if (status !== "authenticated" || !session.user.isAdmin) {
    return (
      <main
        aria-label="Checking administrator access"
        className="flex min-h-[50vh] flex-1 items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
          Verifying administrator access...
        </div>
      </main>
    );
  }

  return children;
}
