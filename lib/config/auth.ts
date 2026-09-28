import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { authConfig } from "@/lib/config/auth.config";
import { authPrisma } from "@/lib/config/prisma";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(authPrisma),
  callbacks: {
    ...authConfig.callbacks,
    async session({ session }) {
      const email = session.user?.email?.trim().toLowerCase();
      const user = email
        ? await authPrisma.user.findUnique({
            where: { email },
            select: { isAdmin: true },
          })
        : null;

      if (session.user) session.user.isAdmin = user?.isAdmin === true;
      return session;
    },
  },
});
