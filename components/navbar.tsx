"use client";

import { useTheme } from "next-themes";
import { Activity, Moon, Sun } from "lucide-react";

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/60 border-b border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1 select-none">
          <span className="text-xl font-extrabold tracking-tighter text-black dark:text-white">
            WAGMI CLINI
          </span>
          <Activity
            className="w-5 h-5 text-[#F0B90B] -ml-0.5"
            strokeWidth={3}
          />
        </a>

        {/* Nav Links (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a
            href="#services"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Services
          </a>
          <a
            href="#about"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Right side: Theme Toggle + CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="w-4 h-4 hidden dark:block text-[#F0B90B]" />
            <Moon className="w-4 h-4 block dark:hidden text-slate-600" />
          </button>

          <a
            href="#scan"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all
              bg-black text-white hover:bg-black/80
              dark:bg-[#F0B90B] dark:text-black dark:hover:bg-[#F0B90B]/90"
          >
            Emergency Scan
          </a>
        </div>
      </div>
    </nav>
  );
}
