import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import { authEnv } from "@/lib/config/env";
import { isKIITEmail } from "@/lib/utils";

const sensitiveAuthValuePattern =
  /((?:client[_ -]?secret|access[_ -]?token|refresh[_ -]?token|id[_ -]?token|authorization|cookie|state|code)\s*[=:]\s*)(?:"[^"]*"|'[^']*'|[^\s&,;]+)/gi;

function redactAuthLogText(value: string) {
  return value
    .replace(sensitiveAuthValuePattern, "$1[REDACTED]")
    .replace(/(https?:\/\/[^\s?]+)\?[^\s]+/gi, "$1?[REDACTED]")
    .replace(
      /((?:mongodb(?:\+srv)?|postgres(?:ql)?):\/\/)[^@\s/]+@/gi,
      "$1[REDACTED]@",
    )
    .slice(0, 500);
}

function logAuthError(error: Error) {
  const authError = error as Error & { type?: string; cause?: unknown };
  const cause =
    authError.cause && typeof authError.cause === "object"
      ? (authError.cause as Record<string, unknown>)
      : undefined;
  const causeError = cause?.err instanceof Error ? cause.err : undefined;
  const causeCode = (causeError as (Error & { code?: unknown }) | undefined)
    ?.code;

  console.error(
    "[auth][error]",
    JSON.stringify({
      type: authError.type ?? error.name,
      message: redactAuthLogText(error.message),
      provider:
        typeof cause?.provider === "string" ? cause.provider : undefined,
      method: typeof cause?.method === "string" ? cause.method : undefined,
      cause: causeError
        ? {
            name: causeError.name,
            code: typeof causeCode === "string" ? causeCode : undefined,
            message: redactAuthLogText(causeError.message),
          }
        : undefined,
    }),
  );
}

export const authConfig = {
  secret: authEnv.secret,
  logger: {
    error: logAuthError,
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: "kinetex.authjs.session-token.v2",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    Google({
      clientId: authEnv.googleClientId,
      clientSecret: authEnv.googleClientSecret,
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/auth-error",
  },
  callbacks: {
    signIn: ({ user }) => Boolean(user.email),
    authorized: ({ auth }) => Boolean(auth?.user),
  },
} satisfies NextAuthConfig;
