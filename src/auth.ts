import "crypto";
import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

// Extending session interface to include username field
declare module "next-auth" {
  interface Session {
    user: {
      username?: string | null;
    } & DefaultSession["user"];
  }
}

// Extending the jwt such that a new field 'username' is added to it
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    username: string | null;
  }
}

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
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.username = existingUser.username;

      return token;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.username && session.user) {
        session.user.username = token.username;
      }

      return session;
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
