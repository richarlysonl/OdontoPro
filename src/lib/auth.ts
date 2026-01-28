import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import  Prisma  from "./prisma"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(Prisma),
  providers: [GitHub, Google],
  secret: process.env.NEXTAUTH_SECRET
})
