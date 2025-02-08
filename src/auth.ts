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
  pages: {
    signIn: "/login",
    error: "/error",
  },
  session: { strategy: "jwt" },
  cookies: { sessionToken: { name: "user_token" } },
  adapter: PrismaAdapter(db),
});
