# TODO: Fix NextAuth Errors

- [x] Fix Prisma import in src/lib/prisma.ts to use '@prisma/client'
- [x] Update src/lib/auth.ts: remove "use server", update providers to GitHub({ clientId: ..., clientSecret: ... }), add secret: process.env.NEXTAUTH_SECRET
- [x] Update src/lib/getSession.ts to import and export getSession from 'next-auth/react'
- [x] Update src/components/session-auth.tsx to include baseURL: process.env.NEXTAUTH_URL in SessionProvider
- [ ] Ensure environment variables are set: NEXTAUTH_SECRET, NEXTAUTH_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
- [ ] Test the application
