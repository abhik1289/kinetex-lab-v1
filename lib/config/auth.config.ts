import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import { authEnv } from "@/lib/config/env";
import { isKIITEmail } from "@/lib/utils";

export const authConfig = {
  secret: authEnv.secret,
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
  },
  callbacks: {
    signIn: ({ user }) => Boolean(user.email && isKIITEmail(user.email)),
    authorized: ({ auth }) => Boolean(auth?.user),
  },
} satisfies NextAuthConfig;
