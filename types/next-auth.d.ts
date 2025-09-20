import { defaultSession } from 'next-auth';
declare module 'next-auth' {
    interface Session {
    user: User & defaultSession['user']
  }
}

interface User {
    id: string;
    name: string;
    email: string;
    emailVerified?: Date | string | null;
    image?: string;
    stripeCustomerId?: string;
    times: string[];
    adress?: string;
    phone?: string;
    status?: boolean;
    creactedAt: string;
    updateAt: string;
}