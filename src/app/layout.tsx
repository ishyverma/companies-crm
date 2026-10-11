import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import "../styles/tokens.css";
import { Providers } from "@/components/providers";

const font = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Companies · Records",
  description: "CRM records dashboard built with Next.js, shadcn/ui, motion and TanStack Query.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
