import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

import { authEnv } from "@/lib/config/env"

export const authConfig = {
  secret: authEnv.secret,
  session: {
    strategy: "jwt",
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
    authorized: ({ auth }) => Boolean(auth?.user),
  },
} satisfies NextAuthConfig