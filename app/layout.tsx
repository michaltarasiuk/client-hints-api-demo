import type { Metadata } from "next";

import { Geist } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Client Hints API Demo",
  description:
    "Demo showing how User-Agent Client Hints reduce HTML payload when mobile and desktop UIs differ.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
