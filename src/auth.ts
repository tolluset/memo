import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { accounts, sessions, users, verificationTokens } from "./db/schema";
import { redirect } from "next/navigation";
import { PAGE } from "./constants/url";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: { strategy: "jwt" },
  providers: [Google],
  callbacks: {
    session: async ({ session, token }) => {
      if (token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
});

export const session = async () => {
  const _session = await auth();

  if (!_session?.user?.id) {
    redirect(PAGE.signIn);
  }

  return _session.user as { id: string };
};
