import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { OAuthUserConfig } from "next-auth/providers";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Uncomment if you want to customize JWT handling
  // jwt: {
  //   encode: async ({ secret, token, maxAge }) => {
  //     // Your custom encode logic
  //   },
  //   decode: async ({ secret, token, maxAge }) => {
  //     // Your custom decode logic
  //   },
  // },
  theme: {
    colorScheme: "light",
    logo: "/images/logo.png",
  },
  callbacks: {
    async session({ session }) {
      // Enrich the session here if needed
      return session;
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        // TODO: Add your sign-in logic
        return true;
      } catch (error: any) {
        console.log(error);
        return false;
      }
    },
  },
};
