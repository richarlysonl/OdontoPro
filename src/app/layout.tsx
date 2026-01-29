import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  SessionAuthProvider  from "@/components/session-auth";
import { Toaster} from 'sonner';
import { QueryClientContent } from "@/providers/queryClient";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OdontoPRO",
  description: "encontre os melhores profissionais",
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  openGraph: {
    title: "OdontoPRO",
    description: "encontre os melhores profissionais",
    images: [`${process.env.NEXT_PUBLIC_URL}/public/doctor-hero.png`],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionAuthProvider>
          <QueryClientContent>
          <Toaster duration={2500}
          />
        {children}
        </QueryClientContent>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
