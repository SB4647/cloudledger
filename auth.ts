import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/db/prisma";

const githubId = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;
const authSecret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;

if (!githubId || !githubSecret) {
  throw new Error("Missing GITHUB_ID or GITHUB_SECRET env vars.");
}

if (!authSecret) {
  throw new Error("Missing NEXTAUTH_SECRET env var.");
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: githubId,
      clientSecret: githubSecret,
    }),
  ],
  secret: authSecret,
  session: { strategy: "database" },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.stripeCustomerId = user.stripeCustomerId ?? null;
      }
      return session;
    },
  },
};
