import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import  Prisma  from "./prisma"
import GitHub from "next-auth/providers/github"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(Prisma),
  trustHost: true,
  providers: [GitHub],
  secret: process.env.NEXTAUTH_SECRET
})