import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wagmi Clinic — AI Wallet Diagnosis",
  description:
    "AI-powered diagnosis for Degen traders. We fix broken portfolios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* 1. Solid Base Layer */}
          <div className="fixed inset-0 z-[-2] bg-white dark:bg-[#050505]" />

          {/* 2. The Crosshair Pattern (Fixed to window) */}
          <div className="fixed inset-0 z-[-1] bg-surgical-pattern opacity-100 pointer-events-none" />

          {/* 3. The Scanline Beam */}
          <div className="fixed inset-0 z-0 animate-scanline pointer-events-none" />

          {/* 4. The Main Content (Relative z-10) */}
          <main className="relative z-10 min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
