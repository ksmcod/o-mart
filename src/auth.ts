import "crypto";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { db } from "@/lib/db";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  events: {
    async linkAccount({ user }) {
      const randomUsername = `user-${crypto.randomUUID().slice(0, 10)}`;
      await db.user.update({
        where: { id: user.id },
        data: { username: randomUsername },
      });
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  session: { strategy: "jwt" },
  cookies: { sessionToken: { name: "user_token" } },
  adapter: PrismaAdapter(db),
});
